
import { useEffect, useState, RefObject } from "react";

type Size = {
  width: number;
  height: number;
};

// Use a generic type T that extends HTMLElement to ensure the ref can be any kind of DOM element
export const useContainerSize = <T extends HTMLElement>(ref: RefObject<T>): Size => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) {
        return;
      }

      if (!entries.length) {
        return;
      }

      const entry = entries[0];

      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [ref]);

  return size;
};
