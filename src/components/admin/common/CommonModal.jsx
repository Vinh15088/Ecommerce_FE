
const FooterModal = ({name, onClose, loading, handleUpdate, ...props}) => (
    <div className="flex justify-between p-8 bg-gray-100 space-x-4">
        <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 w-full bg-white text-red-500 rounded-md hover:bg-red-300 focus:outline-none"
        >
            Hủy
        </button>
        <button
            type="submit"
            className="px-4 py-2 w-full bg-green-400 text-white rounded-md hover:bg-green-600 focus:outline-none"
            disabled={loading}     
            onClick={handleUpdate}               >
            {loading ? 'Đang cập nhật...' : `Tạo ${name} mới`}
        </button>
    </div>
);

const DeleteModalForm = ({onClose, name, error, handleDelete, loading}) => (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
    >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm"                
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-xl font-semibold mb-4">Bạn có chắc chắn?</h2>
            <p className="text-gray-600 mb-6">
                Bạn thực sự muốn xóa người dùng <strong>{name}</strong>?
            </p>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="flex justify-between">
                <button 
                    onClick={onClose}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 p-2 rounded w-full mr-2">
                        Hủy
                </button>

                <button 
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-400 hover:bg-red-600 text-white p-2 rounded w-full ml-2">
                        {loading ? 'Đang xóa...' : 'Xóa ngay'}
                </button>
            </div>
        </div>
    </div> 
);

export {FooterModal, DeleteModalForm};