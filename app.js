(function () {
  const isEditable = (element) => {
    if (!element) return false;
    const tag = element.tagName ? element.tagName.toLowerCase() : "";
    return tag === "input" || tag === "textarea" || element.isContentEditable;
  };

  const setKeyboardState = () => {
    const viewport = window.visualViewport;
    const active = document.activeElement;
    let inset = 0;

    if (viewport) {
      inset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
    }

    const keyboardOpen = inset > 80 || isEditable(active);
    document.documentElement.style.setProperty("--keyboard-inset", `${Math.round(inset)}px`);
    document.body.classList.toggle("keyboard-open", keyboardOpen);
  };

  const scrollFocusedControl = (target) => {
    if (!isEditable(target)) return;
    window.setTimeout(() => {
      target.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth"
      });
    }, 140);
  };

  document.addEventListener("focusin", (event) => {
    setKeyboardState();
    scrollFocusedControl(event.target);
  });

  document.addEventListener("focusout", () => {
    window.setTimeout(setKeyboardState, 180);
  });

  window.addEventListener("resize", setKeyboardState, { passive: true });
  window.addEventListener("orientationchange", setKeyboardState, { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", setKeyboardState, { passive: true });
    window.visualViewport.addEventListener("scroll", setKeyboardState, { passive: true });
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (isEditable(target)) scrollFocusedControl(target);
  });

  setKeyboardState();
})();
