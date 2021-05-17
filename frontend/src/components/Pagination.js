import React from 'react';

function MyPagination(props) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalReferrals / props.referralsPerPage); i++) {
        pageNumbers.push(i)
    }

    const pageNumbersList = pageNumbers.map(number => {

        let style
        if (props.currentPage === number) {
            style = { backgroundColor: '#78CFCE' };
        }

        if (number < props.maxPageNumberLimit + 1 && number > props.minPageNumberLimit) {
            return (
                <li key={number} className='page-item' >
                    <button onClick={() => props.paginate(number)} className='page-link' style={style}>
                        {number}
                    </button>
                </li>
            )
        } else {
            return null;
        }
    })

    let pageDecrementBtn = null;
    if (props.minPageNumberLimit >= 1) {
        pageDecrementBtn = <li><button onClick={() => props.handlePrevBtn()} disabled={props.currentPage === pageNumbers[0] ? true : false} className='page-link'> &hellip; </button></li>
    }

    let pageIncrementBtn = null;
    if (pageNumbers.length > props.maxPageNumberLimit) {
        pageIncrementBtn = <li><button onClick={() => props.handleNextBtn()} disabled={props.currentPage === pageNumbers[pageNumbers.length - 1] ? true : false} className='page-link'> &hellip; </button></li>
    }

    return (
        <nav>
            <ul className="pagination pagination-shadow">
                <li>
                    <button onClick={() => props.handlePrevBtn()}
                        disabled={props.currentPage === pageNumbers[0] ? true : false}
                        className='page-link'
                    >Prev</button>
                </li>
                {pageDecrementBtn}
                {pageNumbersList}
                {pageIncrementBtn}
                <li>
                    <button onClick={() => props.handleNextBtn()}
                        disabled={props.currentPage === pageNumbers[pageNumbers.length - 1] ? true : false}
                        className='page-link'
                    >Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default MyPagination