import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function RouteGuard({ state, children, routeTo = "/" }) {
        const nav = useNavigate();
        useEffect(() => {
                if (!state) {
                        nav(routeTo);
                }
        }, [routeTo, state, nav]);
        return (<>{state && children}</>);
}



