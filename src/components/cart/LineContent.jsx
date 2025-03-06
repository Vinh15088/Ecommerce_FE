
function LineContent({label, value}) {
    return (
        <>
        <div className='flex justify-between'>
                <span className="font-semibold text-gray-500 mr-4">{label}</span>
                <span className="text-gray-500">{value}</span>
            </div>
        </>
    )
}

export default LineContent;
