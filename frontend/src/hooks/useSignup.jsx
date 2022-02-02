import { useState } from "react";
import API from "../API";
import useUser from "./useUser";
import { postLogin } from "./useLogin";
import useOrders from "./useOrders";
import useSnackbar from "./useSnackbar";


/**
 * Send username and password to the server and create a new user
 * @param username User's email
 * @param password The password
 * @returns response data if successful
 */
async function postSignup(firstName, lastName, username, password) {
  const toSend = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
  };
  try {
    const result = await API.post("/api/auth/signup", toSend);
    const data = result.data;
    return data;
  } catch (error) {
    console.error(error.response.status);
    return error.response;
  }
}

async function getUserAvailability(username) {
  try {
    const result = await API.get(`/api/auth/userCheck/${username}`);
    if (result.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}


// Ensures the password is valid according to one alphabet character, one 
// numerical digit and at least 8 characters.
export const isValidPassword = (password) => {

  // Ensures at least one alphabet character
  const regexChar = / *[a-zA-Z]/;            
  // Ensures at least one numerical digit
  const regexNum = /\d/;                    
  // Ensures at least length of 8
  const lengthCheck = (password.length) >= 8; 
  const result = regexChar.test(password) && regexNum.test(password) && lengthCheck;
  return result;
}

/**
 * Hook for signup related methods
 */
export default function useSignup() {
  const [userDetails, setUserDetails] = useState(
    { 
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      passwordConfirm: "", 
    }
  );
  const [userIsAvailable, setUserIsAvailable] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const { handleAuthenticate } = useUser();
  const { initSocket } = useOrders();
  const { handleSnackbarMessage } = useSnackbar();
  

  const handleSignupSubmit = async (event, argDetails) => {
    if (event) {
      event.preventDefault()
    }

    const detailsToSubmit = argDetails ? argDetails : userDetails;
    
    if (!isValidPassword(detailsToSubmit.password)) {
      handleSnackbarMessage(
        "Passwords must be 8 characters long and include one letter and one number!",
        false
      );
      return false;
    }

    if (detailsToSubmit.password !== detailsToSubmit.passwordConfirm)
    {
      handleSnackbarMessage("Passwords do not match", false);
      return false;
    }

    setLoading(true)
    try {
      await postSignup(
        detailsToSubmit.firstName,
        detailsToSubmit.lastName,
        detailsToSubmit.username,
        detailsToSubmit.password
      );
      const result = await postLogin(detailsToSubmit.username, detailsToSubmit.password);
      handleAuthenticate(result);
      initSocket(result.username, result.token, true)
      setPage(1)
      setUserDetails( { 
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        passwordConfirm: "", 
      });
    } catch (err) {
      handleSnackbarMessage(err, false);
    } finally {
      setLoading(false)
    }
  };

  const handleEmailCheck = async (event) => {
    setLoading(true)
    event.preventDefault();
    try {
      const userAvailable = await getUserAvailability(userDetails.username);
      if (userAvailable) {
        setUserIsAvailable(true);
        // Don't go to next page if user hasn't put in their details yet.
        if (userDetails.firstName !== "")
        {
          setPage(2);
        }
        return true;
      }
      handleSnackbarMessage("Email is already registered", false);
      return false;
    } catch (err) {
      handleSnackbarMessage(err, false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const onFirstNameChange = (event) => {
    setUserDetails({ ...userDetails, firstName: event.target.value });
  };

  const onLastNameChange = (event) => {
    setUserDetails({ ...userDetails, lastName: event.target.value });
  };

  const onUsernameChange = (event) => {
    setUserDetails({ ...userDetails, username: event.target.value });
  };

  const onPasswordChange = (event) => {
    setUserDetails({ ...userDetails, password: event.target.value });
  }

  const onPasswordConfirmChange = (event) => {
    setUserDetails({ ...userDetails, passwordConfirm: event.target.value });
  };

  const handleBack = (event) => {
    event.preventDefault();
    if (page > 1) {
      setPage(page-1)
    }
  } 

  return {
    userIsAvailable,
    userDetails,
    page,
    loading,
    handleBack,
    onFirstNameChange,
    onLastNameChange,
    onUsernameChange,
    onPasswordChange,
    onPasswordConfirmChange,
    handleEmailCheck,
    handleSignupSubmit,
    setUserDetails,
  };
}
