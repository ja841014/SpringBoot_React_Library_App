import { StarsReview } from "./StarsReview";

export const Review = (props: any) => {
    const date = new Date(props.review.date);

    // Converts a date and time to a string by using the current or specified locale.
    const longMonth = date.toLocaleString('en-us', {month: 'long'});

    const dateDay = date.getDate();
    const dateYear = date.getFullYear();

    const dateRender = longMonth + ' ' + dateDay + ', ' + dateYear;

    return (
        <div>
            <div className='col-sm-8 col-md-8'>
                <h5>{props.review.userEmail}</h5>
                <div className='row'>
                    <div className='col'>
                        {dateRender}
                    </div>
                    <div className='col'>
                        <StarsReview rating={props.review.rating} size={16} />
                    </div>
                </div>
                <div className='mt-2'>
                    <p>
                        {props.review.reviewDescription}
                    </p>
                </div>
            </div>
            <hr/>
        </div>
    );

}