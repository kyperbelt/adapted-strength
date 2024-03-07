
/**
 * Example usage:
*  <BasicModalDialogue title="Basic Modal" onCloseDialog={() => setOpenDialog(false)}>
  *  <p>Some content</p>
  *  <PrimaryButton onClick={() => setOpenDialog(false)}>Close</PrimaryButton>
*  </BasicModalDialogue>
*/
export function BasicModalDialogue({ title, className, children, onCloseDialog, ...props }) {
  return (
    <dialog open className={`fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50 ${className}`} {...props}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-xl p-4 max-w-md w-full">
          <div className="flex flex-row">
            <h1 className="text-2xl font-bold">{title}</h1>
            <button className="ml-auto" onClick={onCloseDialog}>X</button>
          </div>
          {children}
        </div>
      </div>
    </dialog>);
}

