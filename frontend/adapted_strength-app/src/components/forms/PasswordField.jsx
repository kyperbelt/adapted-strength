
export default function PasswordField({ placeholder,
    title, id = "", pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,255}$" }) {
    return (<input type="text"
        className="w-4/5 border-b-4 p-0"
        placeholder={placeholder} id={id} name="password" pattern={pattern}
        title={title} required />);
}