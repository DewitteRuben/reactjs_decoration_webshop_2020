const onlyFocusOnTab = () => {
  const keyboardFocus = (e: { keyCode: number }) => {
    if (e.keyCode === 9) {
      document.documentElement.classList.add("keyboard-focus");
    }

    document.removeEventListener("keydown", keyboardFocus, false);
  };
  document.addEventListener("keydown", keyboardFocus, false);
};

export { onlyFocusOnTab };
