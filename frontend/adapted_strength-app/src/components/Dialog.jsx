
/**
 * Example usage:
*  <BasicModalDialogue title="Basic Modal" onCloseDialog={() => setOpenDialog(false)}>
  *  <p>Some content</p>
  *  <PrimaryButton onClick={() => setOpenDialog(false)}>Close</PrimaryButton>
*  </BasicModalDialogue>
*/
export function BasicModalDialogue({ title, className, children, onCloseDialog, ...props }) {
  return (
    <dialog open className={`fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 min-h-dvh min-w-full ${className}`} {...props}>
      <div className="flex items-center justify-center min-h-dvh min-w-full flex-col">
        <div className="bg-white rounded-lg shadow-xl p-5 max-w-md w-full max-h-dvh overflow-y-auto">
          <div className="flex flex-row border-primary-light border-b-2 mb-2">
            <h1 className="text-2xl font-bold text-secondary-light">{title}</h1>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " onClick={onCloseDialog} >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </dialog>);
}

