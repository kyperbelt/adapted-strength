/**
 * @param {boolean} state
 * @param {ReactNode} children
*  @returns {ReactNode}
* @description  A component that renders its children only if the state is true.
*/
export default function StateGuard({ state, children }) {
        return (<>{state() && children}</>);
}
