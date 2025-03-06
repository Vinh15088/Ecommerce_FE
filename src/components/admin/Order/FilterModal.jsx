import React, { useRef, useEffect } from 'react';

function FilterModal({ options, onSelect, onClose, title, buttonRef, position }) {
    const dropdownRef = useRef(null);

    useEffect(() => {
    }, [position]);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose, buttonRef]);

    return (
        <div
            ref={dropdownRef}
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: position.width,
                zIndex: 10,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                maxHeight: '400px',
                overflow: 'auto'
            }}
        >
            <h3 className="font-semibold mb-2">{title}</h3>
            <ul className="space-y-1">
                {options.map((option, index) => (
                    <li
                        key={index}
                        className="cursor-pointer hover:bg-gray-100 p-1 rounded-md"
                        onClick={() => onSelect(option)}
                    >
                        {option.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FilterModal;