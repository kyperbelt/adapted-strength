export default function InputField({ type, placeholder, id, name, required }) {
    return (
        <input type placeholder id name required className="w-full rounded-md py-2.5 px-4 border text-sm outline-gray-500" />
    );
}