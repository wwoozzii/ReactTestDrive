import { useEffect, useRef } from "react";

export function useClisckOutSide<T extends HTMLElement>(
  handler: () => void,
  isOpen: boolean,
) {
  const isRef = useRef<T>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        isOpen &&
        isRef.current &&
        !isRef.current.contains(event.target as Node)
      ) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [handler, isOpen]);

  return isRef;
}
