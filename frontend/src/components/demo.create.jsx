import React from "react";
import generateUniqueId from "generate-unique-id";
import useSignup from "../hooks/useSignup";

export default function DemoCreate() {
  const { setUserDetails, handleSignupSubmit } = useSignup();

  function handleDemoCreate() {
    const start = generateUniqueId({
      length: 1,
      useLetters: true,
      useNumbers: false,
    });
    const middle = generateUniqueId({
      length: 6,
      useLetters: true,
      useNumber: true,
    })
    const end = generateUniqueId({
      length: 2,
      useLetters: false,
      useNumbers: true,
    })
    const user = start.toUpperCase() + middle + end;

    setUserDetails({
      firstName: user,
      lastName: "",
      username: `${user}@mail.com`,
      password: user,
      passwordConfirm: user,
    })

    handleSignupSubmit()
    // const userDetails = {
    //   firstName: randomString
    // }
  }

  return (
    <button className="text-button" onClick={handleDemoCreate}>
      create a demo account
    </button>
  );
}
