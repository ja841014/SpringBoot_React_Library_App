import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import api from '../../../api';
import AdminMessageRequest from '../../../models/AdminMessageRequest';
// import AdminMessageRequest from '../../../models/AdminMessageRequest';
import MessageModel from '../../../models/MessageModel';
import { Pagination } from '../../Utils/Pagination';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { AdminMessage } from './AdminMessage';
// import { AdminMessage } from './AdminMessage';

export const AdminMessages = () => {
    const {authState} = useOktaAuth();

    // Normal Loading Pieces
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);
    
    // Messages endpoint State
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [messagesPerPage] = useState(5);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Recall useEffect
    const [btnSubmit, setBtnSubmit] = useState(false);

    useEffect(() => {
        if(authState &&authState.isAuthenticated) {

            const requestOptions = oktaHeaderSetup();
            const params = {page: currentPage - 1, size: messagesPerPage};

            api.getAllQuestionByClosed({headers: requestOptions, params: params})
            .then((res) => {

                const responseData = res.data.content;

                console.log(responseData)

                let openedMessage = Object.keys(responseData).map((key) => (
                    {
                        title: responseData[key].title,
                        question: responseData[key].question,
                        id: responseData[key].id,
                        userEmail: responseData[key].userEmail,
                    }
                ))

                setTotalPages(res.data.totalPages)
                setMessages(openedMessage);
                setIsLoadingMessages(false);
                window.scrollTo(0, 0);

            })
            .catch((error) => {
                console.error("getAllQuestionByClosed error")
                setIsLoadingMessages(false);
                setHttpError(error.message)
            })
        }
    }, [currentPage, authState, btnSubmit])


    function submitResponseToQuestion(id: number, response: string) {

        if(authState && authState.isAuthenticated && id !== null && response !== '') {

            const requestOptions = oktaHeaderSetup();

            const adminMessageRequest: AdminMessageRequest  = new AdminMessageRequest(id, response);

            api.submitQuestionResponse({data: adminMessageRequest, headers: requestOptions})
            .then((res) => {

                setBtnSubmit(!btnSubmit);
            })
            .catch((err) => {
                console.error("submitQuestionResponse error")
                setHttpError(err.message)
            })

        }
        

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



    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className='mt-3'>
            {messages.length > 0 ? 
                <>
                    <h5>Pending Q/A: </h5>
                    {messages.map(message => (
                        <AdminMessage message={message} key={message.id} submitResponseToQuestion={submitResponseToQuestion}/>
                    ))}
                </>
                :
                <h5>No pending Q/A</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}