
export default function SubmitButton({ onClick, text = "Reset" }) {
    return (<button type="submit" className="border-slate-50 border-8 bg-black text-slate-200 rounded-full px-3 py-1 " onClick={onClick} >{text}</button>);
}