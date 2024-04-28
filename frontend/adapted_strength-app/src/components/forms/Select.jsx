
export function BasicSelect({value, onChange, children, className, ...props }) {
    return (
        <select {...props} onChange={onChange} defaultValue={value} className={`bg-primary border border-primary-dark text-gray-900 text-sm rounded-lg focus:ring-accent focus:border-accent block p-2.5 ${className}`}>
            {children}
        </select>
    );
}
