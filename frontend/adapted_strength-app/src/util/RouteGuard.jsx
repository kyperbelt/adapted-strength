import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RouteGuard({ state, children, routeTo = "/" }) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkState = async () => {
      const result = await state();
      if (!result) {
        nav(routeTo);
      }
      setLoading(false);
    };
    checkState();
  }, [routeTo, state, nav]);

  if (loading) {
    return null; // or return a loading spinner
  }

  return <>{state() && children}</>;
}
