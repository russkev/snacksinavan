import React from "react";
import Modal from "./modal";
import Login from "../pages/login";
import useLogin from "../hooks/useLogin";
import "../styling/modal.css";

export default function LoginModal() {
  const { loginIsOpen, toggleLoginIsOpen } = useLogin();
  return (
    <Modal toggleOpen={toggleLoginIsOpen} isOpen={loginIsOpen}>
      <Login />
    </Modal>
  );
}
