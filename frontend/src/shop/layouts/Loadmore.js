import { Link } from "react-router-dom";

const Loadmore = ({
    perPage,
    total,
    currentPage,
    onPaginationChange,
    name
}) => {
    perPage = parseInt(perPage);
    total = parseInt(total);
    currentPage = parseInt(currentPage);
    const to = (perPage * currentPage) < total ? perPage * currentPage : total;
    const totalPages = Math.ceil(total / perPage);
    const next = (currentPage < totalPages) ? currentPage + 1 : currentPage;
    const pages = [];
    for (let index = 1; index <= totalPages; index++) {
        pages.push(index);
    }

    function handlePageChange(data) {
        if (to < total) {
            onPaginationChange(data);
        }
    }

    return (
        <div>
            {to < total ?
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px">
                        <li>
                            <Link to={`#`} onClick={() => { handlePageChange({ currentPage: next, perPage: perPage }) }} className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"> -- View More { name } -- </Link>
                        </li>
                    </ul>
                </nav>
                : <></>}
        </div>
    );
}

export default Loadmore;