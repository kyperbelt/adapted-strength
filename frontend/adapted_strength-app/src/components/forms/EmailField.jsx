
export default function EmailField({ pattern, name, autoComplete }) {
    return (<input type="email" name={name} autoComplete={autoComplete} placeholder="Email Address" className="w-4/5 border-b-4 p-0" pattern={pattern} />);
}