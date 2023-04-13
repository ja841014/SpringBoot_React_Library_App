import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import MessageModel from '../../../models/MessageModel';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { Pagination } from '../../Utils/Pagination';
import api from '../../../api';

export const Messages = () => {

    const { authState } = useOktaAuth();
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Messages
    const [messages, setMessages] = useState<MessageModel[]>([]);

    // Pagination
    const [messagesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        if(authState && authState.isAuthenticated) {

            let requestOptions = oktaHeaderSetup();

            const params = {page: currentPage - 1, size: messagesPerPage};

            api.getAllQuestionByUserEmail({headers: requestOptions, params: params})
            .then((res) => {
                const responseData = res.data.content;

                setTotalPages(res.data.totalPages)

                const allMessages = Object.keys(responseData).map((key: any) =>(
                    {
                        title: responseData[key].title,
                        question: responseData[key].question,
                        id: responseData[key].id,
                        userEmail: responseData[key].userEmail,
                        adminEmail: responseData[key].adminEmail,
                        response: responseData[key].response,
                    }
                ))

                setMessages(allMessages);

                setIsLoadingMessages(false);

                window.scrollTo(0, 0);
            })
            .catch((err) => {
                console.error("getAllQuestionByUserEmail Error" + err.messages)
                setIsLoadingMessages(false)
                setHttpError(err.messages)
            })            
        }

    }, [authState, currentPage]);

    if (isLoadingMessages) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    function oktaHeaderSetup() {
        const requestOptions = {
            headers : {
                "Authorization": `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": 'application/json'
            }
        };
        return requestOptions;
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className='mt-2'>
            {messages.length > 0 ? 
                <>
                    <h5>Current Q/A: </h5>
                    {
                    messages.map(  message => (
                        <div key={message.id}>
                            <div className='card mt-2 shadow p-3 bg-body rounded'>
                                <h5>Case #{message.id}: {message.title}</h5>
                                <h6>{message.userEmail}</h6>
                                <p>{message.question}</p>
                                <hr/>
                                <div>
                                    <h5>Response: </h5>
                                    {message.response && message.adminEmail ? 
                                        <>
                                            <h6>{message.adminEmail} (admin)</h6>
                                            <p>{message.response}</p>
                                        </>
                                        :
                                        <p><i>Pending response from administration. Please be patient.</i></p>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </>
                :
                <h5>All questions you submit will be shown here</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}