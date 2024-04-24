

export function BasicButton({ className, children, ...props }) {
  return <button className={`text-lg p-2 rounded-xl ${className}`} {...props}>{children}</button>
}

export function PrimaryButton({ className, children, ...props }) {
<<<<<<< HEAD
  return <BasicButton className={`text-white bg-accent hover:bg-accent-dark focus:ring-4 focus:bg-accent-light font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ${className}`} {...props}>{children}</BasicButton>
=======
  return <BasicButton className={` ${className} text-white bg-accent hover:bg-accent-dark focus:ring-4 focus:bg-accent-light font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none`} {...props}>{children}</BasicButton>
>>>>>>> program_management_redo
}

export function SecondaryButton({ className, children, ...props }) {
  return <BasicButton className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-secondary-light rounded-lg border border-primary-dark hover:bg-primary-dark hover:text-secondary-dark focus:z-10 focus:ring-4 focus:ring-gray-100  ${className}`} {...props}>{children}</BasicButton>
}

export function IconButton({ className, children, ...props }) {
  return <button className={`text-white bg-accent hover:bg-accent-dark focus:ring-4 focus:bg-accent-light font-medium rounded-lg text-sm focus:outline-none ${className}`} {...props}>{children}</button>
}


export function HamburgerSettingsButton({ className, children, ...props }) {
  return (
    <button className={`relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 ${className}`} aria-expanded="false" aria-haspopup="menu" id=":r5:" type="button">
      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
        </svg>
      </span>
      {children}
    </button>
  );
}


export function HamburgerButton({ className, ...props }) {
  return (
    <button className="inline-flex items-center py-2 mx-2 text-sm font-medium text-center text-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-50" type="button" {...props}>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    </button>
  );
}
