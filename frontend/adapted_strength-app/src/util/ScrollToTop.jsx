import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(`PATHNAME = ${pathname}`);
    if (pathname.includes("#")){
      console.log("Skipping scroll to top - hash link detected");
      // if we are linking to a section then we dont want to 
      // alter the behavior.
      return;
    }
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

