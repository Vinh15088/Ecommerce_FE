
function SelectAddress({selected, handleChange, cities, label}) {
    return (
        <>
            <select
                className="border p-2 m-2 rounded col-span-2"
                value={selected}
                onChange={handleChange}
            >
                <option value="" className="text-gray-500 text-sm">{label}</option>
                {cities.map(object => (
                    <option key={object.id} value={object.id}>{object.full_name}</option>
                ))}
            </select>
        </>
    )
}

export default SelectAddress;
