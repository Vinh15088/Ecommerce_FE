
const Pagination= ({pageInfo, onPageChange}) => (
    <div className="flex justify-center space-x-2 mt-4">
    <button 
        disabled={pageInfo.page <= 1} 
        onClick={() => onPageChange(pageInfo.page - 1)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
    >
        Trước
    </button>
    <span className="px-4 py-2 text-gray-700">
        Trang {pageInfo.page} / {pageInfo.totalPages}
    </span>
    <button 
        disabled={pageInfo.page >= pageInfo.totalPages} 
        onClick={() => onPageChange(pageInfo.page + 1)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
    >
        Sau
    </button>
</div>
)

export {Pagination};