export default function LabeledInputField({ type, placeholder, className, id, name, error, required, pattern, defaultValue, ...props }) {
    return (
        <div className={`relative ${className}`}>
            <input title={error} type={type} id={id} name={name ?? id} className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-primary rounded-lg border-2 border-primary-dark appearance-none focus:outline-none focus:ring-0 focus:border-secondary-light peer`} placeholder=" "
                pattern={pattern} required={required} defaultValue={defaultValue} {...props} />
            <label htmlFor={id} className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-secondary-dark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{placeholder}</label>
        </div>
    );


}
