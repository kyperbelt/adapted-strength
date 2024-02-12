export default function LabeledInputField({ type, placeholder, className, id, name, required, pattern, defaultValue}) {
    return (
        <div className={`flex flex-col ${className}`} >
            <input type={type} id={id} name={name} placeholder=" " defaultValue={defaultValue} required={required} pattern={pattern} className="peer w-full rounded-md py-2.5 px-4 border text-sm outline-gray-500" />
            <label htmlFor={id} className="transition-all peer-placeholder-shown:ml-4  peer-focus:ml-2 rounded-2xl pt-1 pl-1  peer-placeholder-shown:mt-2 ml-2 peer-focus:-mt-3 absolute -mt-3 bg-slate-100  text-left peer-placeholder-shown:text-slate-400 peer-focus:text-slate-800 text-slate-800 text-sm">{placeholder}</label>
        </div >
    );
}
