import React from "react";

function useClickOutside<T extends HTMLElement>(action: Function, ignoreElement?: HTMLElement | null) {
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      if (!ref.current?.contains(target)) {
        if (ignoreElement && ignoreElement.contains(target)) {
          return;
        }
        action();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [action, ignoreElement]);

  return ref;
}

export default useClickOutside;
