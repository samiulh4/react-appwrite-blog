import { useId, forwardRef } from 'react';

const Input = forwardRef(
    (
        {
            label,
            type = "text",
            className = "",
            ...props
        },
        ref
    ) => {
        const id = useId();
        return (
            <div className="w-full">
                {label && <label className="block font-medium text-gray-700" htmlFor={id}>{label}</label>}
                <input
                    type={type}
                    ref={ref}
                    className={`w-full px-3 py-2 rounded-lg border border-gray-300 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 ${className}`}
                    id={id}
                    {...props}
                />
            </div>
        )
    }
);

export default Input;