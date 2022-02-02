import { useState, useEffect } from "react";
import API from "../API";
import useUser from "./useUser";
import { isValidPassword } from "./useSignup";
import { useHistory } from "react-router-dom";
import useSnackbar from "./useSnackbar";

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
  const [fetchNew, setFetchNew] = useState(false);
  const [newUserDetails, setNewUserDetails] = useState({
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });
  const history = useHistory();
  const { handleSnackbarMessage } = useSnackbar();

  const infoSection = {
    PERSONAL_DETAILS: 0,
    SECURITY: 1,
  };

  const [currentSection, setCurrentSection] = useState(infoSection.PERSONAL_DETAILS);
  const [isMobile, setIsMobile] = useState(false);

  const handleSectionChange = (event, section) => {
    if (event) {
      event.preventDefault();
    }
    setCurrentSection(section);
  };

  function handleResize() {
    const myInfoNavElement = document.getElementById("my-info-nav");
    if (myInfoNavElement) {
      setIsMobile(getComputedStyle(myInfoNavElement).display === "none");
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [loading, history.location.pathname]);

  useEffect(() => {
    let mounted = true;
    if (mounted && username && newUserDetails) {
      getInfo(username)
        .then((userInfo) => {
          setInfo(userInfo);
          setNewUserDetails((prevState) => ({
            ...prevState,
            lastName: userInfo.lastName,
            firstName: userInfo.firstName,
          }));
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          handleSnackbarMessage(e, false);
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
        handleSnackbarMessage("Passwords do not match", false);
        return false;
      }
      if (!isValidPassword(newUserDetails.password)) {
        event.preventDefault();
        handleSnackbarMessage(
          "Passwords must be 8 characters long and include one letter and one number!",
          false
        );
        return false;
      }
      setLoading(true);
      event.preventDefault();
      try {
        const result = await postUpdateDetails(
          username,
          newUserDetails.firstName,
          newUserDetails.lastName,
          newUserDetails.password
        );
        setLoading(false);
        handleSnackbarMessage(result.msg, true)
        setNewUserDetails({ ...newUserDetails, passwordConfirm: "", password: "" });
        setFetchNew(!fetchNew);
        return true;
      } catch (err) {
        handleSnackbarMessage(err, false)
        setLoading(false);
      }
    } else {
      if (
        newUserDetails.firstName === info.firstName &&
        newUserDetails.lastName === info.lastName
      ) {
        event.preventDefault();
        handleSnackbarMessage("Information unchanged", false);
        setLoading(false);
        return false;
      } else {
        setLoading(true);
        event.preventDefault();
        try {
          const result = await postUpdateDetails(
            username,
            newUserDetails.firstName,
            newUserDetails.lastName,
            ""
          );
          handleSnackbarMessage(result.msg, true);
          setFetchNew(!fetchNew);
          setLoading(false);
          return true;
        } catch (err) {
          handleSnackbarMessage(err, false)
          setLoading(false);
        }
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

  const onSelectPersonalDetails = (event) => {
    handleSectionChange(event, infoSection.PERSONAL_DETAILS);
  };

  const onSelectSecurity = (event) => {
    handleSectionChange(event, infoSection.SECURITY);
  };

  return {
    loading,
    info,
    newUserDetails,
    onFirstNameChange,
    onLastNameChange,
    onPasswordChange,
    onPasswordConfirmChange,
    handleUpdateInfoSubmit,
    infoSection,
    currentSection,
    handleSectionChange,
    onSelectPersonalDetails,
    onSelectSecurity,
    isMobile,
    handleResize,
  };
}
