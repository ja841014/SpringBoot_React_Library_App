
export const Pagination = (props: any) => {

    const pageNumbers = []
    for(var i = 1; i <= props.totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="...">
            <ul className='pagination'>
                <li className='page-item' onClick={() => props.paginate(1)}>
                    <button className='page-link'>
                        First Page
                    </button>
                </li>

                

                {pageNumbers.map(number => (
                    <li key={number} onClick={() => props.paginate(number)} 
                        className={'page-item ' + (props.currentPage === number ? 'active' : '')}>
                            <button className='page-link'>
                                {number}
                            </button>
                    </li>
                ))}
                <li className='page-item' onClick={() => props.paginate(props.totalPages)}>
                    <button className='page-link'>
                        Last Page
                    </button>
                </li>
            </ul>
        </nav>
    );
}