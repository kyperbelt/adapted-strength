
export function BasicTextArea({className, id, label, value, placeholder, rows, ...props}) {
    return (
        <div id={`container_${id}`} className={`py-5 ${className}`} {...props}>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
            <textarea id={id} rows={rows ?? 4} defaultValue={value} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder={placeholder} />
        </div>
    );
}
