const TextInput = ({col, label, name, value, onChange, placeholder, type = "text", ...props }) => (
    <div className={`${col} m-2`}>
        <label className={`block text-sm font-medium text-gray-700 ${label === "Name" ? "mb-3" : ""}`}>
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
            placeholder={placeholder}
            {...props}
        />
    </div>
);

const TextareaInput = ({ label, name, value, onChange, placeholder,  row, type = "text", ...props }) => (
    <div className="col-span-2 m-2">
        <label className={`block text-sm font-medium text-gray-700 ${label === "Name" ? "mb-3" : ""}`}>
            {label}
        </label>
        <textarea
            type={type}
            rows={row}
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md focus:bg-slate-200 focus:outline-none"
            placeholder={placeholder}
            {...props}
        />
    </div>
);

export {TextInput, TextareaInput};

