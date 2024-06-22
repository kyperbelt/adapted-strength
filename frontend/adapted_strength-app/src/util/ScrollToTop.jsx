import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(`PATHNAME = ${pathname}`);
    if (pathname.includes("#")){
      console.log("WOAH WOAH");
      // if we are linking to a section then we dont want to 
      // alter the behavior.
      return;
    }
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

