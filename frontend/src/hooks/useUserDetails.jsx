import { useState, useEffect } from "react";
import API from "../API";
import useUser from "./useUser";
import { isValidPassword } from "./useSignup";

async function getInfo(username) {
  try {
    const response = await API.get("/api/auth/info/" + username);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function postUpdateDetails(username, firstName, lastName, password) {
  const toSend = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
  };
  try {
    const result = await API.post("/api/auth/info/update", toSend);
    const data = result.data;
    return data;
  } catch (error) {
    console.error(error.response.status);
    return error.response;
  }
}

export default function useUserDetails() {
  const { username } = useUser();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [fetchNew, setFetchNew] = useState(false);
  const [message, setMessage] = useState(error);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newUserDetails, setNewUserDetails] = useState({
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    let mounted = true;
    if (mounted && username && newUserDetails) {
      getInfo(username)
      .then(userInfo => {
        setInfo(userInfo);
        setNewUserDetails((prevState) => ({...prevState, lastName: userInfo.lastName, firstName: userInfo.firstName}));
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
    }
    return function cleanup() {
      mounted = false;
    };
    //Including newUserDetails in dependency array will cause infinite loop
    //eslint-disable-next-line
  }, [username, fetchNew]);

  const handleUpdateInfoSubmit = async (event) => {
    if (newUserDetails.password || newUserDetails.passwordConfirm) {
      if (newUserDetails.password !== newUserDetails.passwordConfirm) {
        event.preventDefault();
        setError("Passwords do not match");
        setMessage("Passwords do not match");
        setIsSuccess(false);
        return false;
      }
      if (!isValidPassword(newUserDetails.password)) {
        event.preventDefault();
        setError("Passwords must be 8 characters long and include one letter and one number!");
        setMessage("Passwords must be 8 characters long and include one letter and one number!");
        setIsSuccess(false);
        return false;
      }
      setLoading(true);
      event.preventDefault();
      try {
        await postUpdateDetails(
          username,
          newUserDetails.firstName,
          newUserDetails.lastName,
          newUserDetails.password
        );
        setLoading(false);
        setMessage("Successfully updated information!");
        setIsSuccess(true);
        setNewUserDetails({ ...newUserDetails, passwordConfirm: "", password: "" });
        setFetchNew(!fetchNew);
        return true;
      } catch (err) {
        setError(err);
      }
    } else {
      if (
        newUserDetails.firstName === info.firstName &&
        newUserDetails.lastName === info.lastName
      ) {
        event.preventDefault();
        setError("Information unchanged");
        setMessage("Information unchanged");
        setIsSuccess(false);
        return false;
      }
      setLoading(true);
      event.preventDefault();
      try {
        await postUpdateDetails(username, newUserDetails.firstName, newUserDetails.lastName, "");
        setMessage("Successfully updated information!");
        setIsSuccess(true);
        setFetchNew(!fetchNew);
        setLoading(false);
        return true;
      } catch (err) {
        setError(err);
      }
    }
  };

  const onFirstNameChange = (event) => {
    setNewUserDetails({ ...newUserDetails, firstName: event.target.value });
  };

  const onLastNameChange = (event) => {
    setNewUserDetails({ ...newUserDetails, lastName: event.target.value });
  };

  const onPasswordChange = (event) => {
    setNewUserDetails({ ...newUserDetails, password: event.target.value });
  };

  const onPasswordConfirmChange = (event) => {
    setNewUserDetails({ ...newUserDetails, passwordConfirm: event.target.value });
  };

  return {
    loading,
    info,
    error,
    newUserDetails,
    onFirstNameChange,
    onLastNameChange,
    onPasswordChange,
    onPasswordConfirmChange,
    handleUpdateInfoSubmit,
    message,
    isSuccess,
  };
}
