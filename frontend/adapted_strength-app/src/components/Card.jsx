
export function CardBack({classNameCard, children, className, ...props }) {
  return (
    <div className={`mb-4`} {...props}>
      <div className={`${className} relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md transition-height duration-400 ease-in-out`}>
        {children}
      </div>
    </div>
  );
}

export function CardBack1({ children, className, outerClassName, ...props }) {
  return (
    <div className={`${outerClassName}`} {...props}>
      <div className={`${className} bg-clip-border rounded-xl bg-white text-gray-700 shadow-md transition-height duration-400 ease-in-out`}>
        {children}
      </div>
    </div>
  );
}

export function CardTitle({children}){
  return (
    <div></div>
  );
}
