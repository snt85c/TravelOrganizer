import { useRef, useEffect } from "react";

export function HandleClickOutsideComponent(
    setShowOther: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const ref = useRef<HTMLDivElement>(null);
  
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowOther(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    });
  
    return { ref };
  }
  