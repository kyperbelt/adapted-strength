

export function BasicButton({ className, children, ...props }) {
  return <button className={`text-lg p-2 rounded-xl ${className}`} {...props}>{children}</button>
}

export function PrimaryButton({ className, children, ...props }) {
  return <BasicButton className={`bg-primary hover:bg-red-900 text-white focus:bg-red-800 ${className}`} {...props}>{children}</BasicButton>
}

export function HamburgerSettingsButton({ className, children, ...props }) {
  return (
    <button className={`relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 ${className}`} aria-expanded="false" aria-haspopup="menu" id=":r5:" type="button">
      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
        </svg>
      </span>
      {children}
    </button>
  );
}
