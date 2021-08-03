// Heavily inspired by https://upmostly.com/tutorials/modal-components-react-custom-hooks
import { useState } from "react";

export function toggleMobileNav(setIsShowing) {
  const modalElement = document.getElementById("mobile-nav");
  if (modalElement) {
    if (modalElement.classList.contains("expanded")) {
      modalElement.classList.remove("expanded");
      setIsShowing(false)
    } else {
      modalElement.classList.add("expanded");
      setIsShowing(true)
    }
  }
}


function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }



  // Return the isShowing state and function to toggle if it is showing
  return {
    isShowing,
    setIsShowing,
    toggle,
  };
}

export default useModal;
