
export default function BreadCrumb({...props}) {
    return (
        <div className="flex flex-row justify-center items-center mt-6 mb-6">
        {props.breadCrumbs.map((crumb, index) => {
            return (
                <div key={index} className="flex flex-row items-center">
                  <span className="text-slate-400 text-sm">{crumb}</span>
                  {index < props.breadCrumbs.length - 1 && <span className="text-slate-400 text-sm mx-2">/</span>}

                </div>
                );
            }
        )}
        </div>
  );
}
