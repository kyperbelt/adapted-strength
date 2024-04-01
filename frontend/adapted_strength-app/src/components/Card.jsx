
export function CardBack({ children, className, ...props }) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md transition-height duration-400 ease-in-out">
        {children}
      </div>
    </div>
  );
}
