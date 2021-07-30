import React from "react";
import Modal from "./modal";
import Login from "../pages/login";
import useLogin from "../hooks/useLogin";


export default function LoginModal() {
  const { loginIsOpen, toggleLoginIsOpen } = useLogin();

  if (loginIsOpen) {
    return (
      <Modal toggleLogin={toggleLoginIsOpen} isOpen={loginIsOpen}>
        <Login />
      </Modal>
    );
  } else {
    return <></>;
  }
}
