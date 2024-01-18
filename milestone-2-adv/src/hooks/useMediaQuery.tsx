import { useEffect, useState } from "react";

function useMediaQuery(query: number): boolean {
  const [size, setSize] = useState<number>(window.innerWidth);
  const [isRequiredWidth, setIsRequiredWidth] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", () => setSize(window.innerWidth));
  }, []);

  useEffect(() => {
    if (size <= query) {
      setIsRequiredWidth(true);
    } else {
      setIsRequiredWidth(false);
    }
  }, [size]);

  return isRequiredWidth;
}

export default useMediaQuery;
