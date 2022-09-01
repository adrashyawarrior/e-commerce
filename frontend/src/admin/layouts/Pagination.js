import { Link } from "react-router-dom";

const Pagination = ({
    perPage,
    total,
    currentPage,
    onPaginationChange
}) => {
    perPage = parseInt(perPage);
    total = parseInt(total);
    currentPage = parseInt(currentPage);
    const from = (currentPage - 1) * perPage + 1;
    const to = perPage * currentPage;
    const prev = (from > 1) ? currentPage - 1 : currentPage;
    const totalPages = Math.ceil(total / perPage);
    const next = (currentPage < totalPages) ? currentPage + 1 : currentPage;

    const pages = [];
    for (let index = 1; index <= totalPages; index++) {
        pages.push(index);
    }

    function handlePageChange(data) {
        onPaginationChange(data);
    }

    return (
        <div>
            <nav aria-label="Page navigation example">
                <span className="text-sm text-gray-700 dark:text-gray-400 block pb-4 pl-2">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{from}</span> to <span className="font-semibold text-gray-900 dark:text-white"> {to} </span> of <span className="font-semibold text-gray-900 dark:text-white"> {total} </span> Entries
                </span>
                <ul className="inline-flex -space-x-px">
                    <li>
                        <Link to={`#`} onClick={() => { handlePageChange({ currentPage: prev, perPage: perPage }) }} className={"py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}>Previous</Link>
                    </li>
                    {pages.map(function (value, item) {
                        return (<li key={'page-' + value}>
                            <Link to={`#`} onClick={() => { handlePageChange({ currentPage: value, perPage: perPage }) }} className={"py-2 px-3 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white " + (parseInt(currentPage) === value ? 'text-blue-500' : 'text-gray-500')}>{value}</Link>
                        </li>)
                    })}
                    <li>
                        <Link to={`#`} onClick={() => { handlePageChange({ currentPage: next, perPage: perPage }) }} className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;