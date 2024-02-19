
export function CardBack({ children, className, ...props }) {
  return (
    <div className={`mb-4 grid grid-cols-1 gap-6 xl:grid-cols-4 2xl:grid-cols-6 ${className}`} {...props}>
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md xl:col-span-3">
        {children}
      </div>
    </div>
  );
}
