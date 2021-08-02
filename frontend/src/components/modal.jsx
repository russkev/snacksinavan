import React, { useEffect } from "react";

export default function Modal({ toggleOpen, isOpen, children }) {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const modalElement = document.getElementById("modal-window");
      if (modalElement) {
        if (isOpen) {
          modalElement.className = "show-modal-window";
          setTimeout(() => {
            modalElement.className = modalElement.className.replace("show", "visible");
          }, 1000);
        } else {
          modalElement.className = "hide-modal-window";
        }
      }
    }

    return function cleanup() {
      mounted = false;
    };
  }, [isOpen]);

  if (isOpen) {
    return (
      <div className="fill-loading" onClick={toggleOpen}>
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div id="modal-window">{children}</div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
