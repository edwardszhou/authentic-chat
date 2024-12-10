import { useEffect, useState } from "react";

export default function useMediaQuery(query: string): boolean {
  // if DOM window is not undefined, return media query
  const getMatches = (query: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    function handleChange() {
      setMatches(getMatches(query));
    }

    const matchMedia = window.matchMedia(query);
    // redo query on initial client load and query change
    handleChange();

    matchMedia.addEventListener("change", handleChange);
    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);
  return matches;
}
