// Heavily inspired by https://upmostly.com/tutorials/modal-components-react-custom-hooks
import { useState } from "react";

export function toggleMobileNav(setIsShowing) {
  const modalElement = document.getElementById("mobile-nav");
  if (modalElement) {
    if (modalElement.classList.contains("expanded")) {
      modalElement.classList.remove("expanded");
      setIsShowing(false);
    } else {
      modalElement.classList.add("expanded");
      setIsShowing(true);
    }
  }
}

export function disableContainerOverflow() {
  const containers = document.getElementsByClassName("container");
  const body = document.getElementById("body");
  Array.prototype.forEach.call(containers, function (container) {
    container.classList.add("no-overflow");
  });
  if(body) {
    body.classList.add("no-overflow");
  }
}

export function enableContainerOverflow() {
  const containers = document.getElementsByClassName("container");
  const body = document.getElementById("body");
  Array.prototype.forEach.call(containers, function (container) {
    container.classList.remove("no-overflow");
  });
  if(body) {
    body.classList.remove("no-overflow");
  }
}

function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    const newIsShowing = !isShowing;
    if (newIsShowing) {
      disableContainerOverflow()
    } else {
      enableContainerOverflow()
    }
    setIsShowing(newIsShowing);
  }

  // Return the isShowing state and function to toggle if it is showing
  return {
    isShowing,
    setIsShowing,
    toggle,
  };
}

export default useModal;
