import { useNavigate } from "react-router-dom";

function Submit({totalPrice, toRoute, titleSubmit, disabled}) {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex items-center flex-col justify-between mt-8 p-4 rounded-lg border border-gray-300 shadow-lg mb-4">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <span className="text-gray-700 font-bold text-lg">Tổng tiền: </span>
                    </div>
                    <div>
                        <span className="text-blue-500 font-bold text-lg">{totalPrice}đ</span>
                    </div>
                </div>
                <div className={`w-full text-center ${disabled ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg mt-4`}>
                    <button onClick={() => {if (!disabled) navigate(toRoute) }} className=" py-2 w-full " disabled={disabled}>{titleSubmit}</button>
                </div>
            </div>
        </>
    )
}
 
export default Submit;