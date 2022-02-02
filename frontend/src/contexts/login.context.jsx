import React, { createContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Routes, { getLoggedInOnlyPaths, getLoggedOutOnlyPaths } from "../routes/routes";
import useUser from "../hooks/useUser";

export const LoginContext = createContext([]);

export function pathIncludes(pathList, targetPath) {
  let result = false;
  pathList.every((path) => {
    // console.log(`this: ${path}, target: ${targetPath}`)
    if (path.endsWith(":id")) {
      const currPath = path.slice(0, -4);
      let currTargetPath = targetPath.split("/");
      currTargetPath.pop();
      currTargetPath = currTargetPath.join("/");
      if (currTargetPath === currPath) {
        result = true;
        return false;
      }
    } else if (targetPath === path) {
      result = true;
      return false;
    }
    return true;
  });
  return result;
}

export const LoginContextProvider = ({ children }) => {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const loggedInOnlyPaths = getLoggedInOnlyPaths();
  const loggedOutOnlyPaths = getLoggedOutOnlyPaths();
  const [redirectToPath, setRedirectToPath] = useState(Routes.VAN_CHOICE.path);
  const [redirectFromPath, setRedirectFromPath] = useState(Routes.VAN_CHOICE.path);
  const { isAuthenticated } = useUser();
  const location = useLocation();

  const toggleLoginIsOpen = useCallback((event) => {
    if (event) {
      event.preventDefault();
    }
    if (!isAuthenticated || (isAuthenticated && loginIsOpen)) {
      setLoginIsOpen(!loginIsOpen);
    }
  }, [isAuthenticated, loginIsOpen]);

  // Update appropriate paths as user navigates around
  // These paths can then be used to redirect the user to the page they were after
  // once they're logged in.
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if ("pathname" in location) {
        const currPath = location.pathname;
        // console.log(`THIS path: ${currPath}`);
        const pathIsLoggedInOnly = pathIncludes(loggedInOnlyPaths, currPath);
        const pathIsLoggedOutOnly = pathIncludes(loggedOutOnlyPaths, currPath);
        // console.log(pathIsLoggedInOnly);

        if (!pathIsLoggedOutOnly && !pathIsLoggedInOnly) {
          // User requested path that everyone has access to
          // console.log(`from path1: ${currPath}`);
          setRedirectFromPath(currPath);
          if (!loginIsOpen) {
            // console.log(`to path1: ${currPath}`);
            setRedirectToPath(currPath);
          }
        } else if (!isAuthenticated && pathIsLoggedInOnly) {
          // User not logged in and the requested path is one they need to be logged in for
          // console.log(`to path2: ${currPath}`);
          setRedirectToPath(currPath);
        } else if (isAuthenticated && pathIsLoggedOutOnly) {
          // User is logged in and the requested path is one they need to be logged out for
          // console.log(`from path2: ${currPath}`);
          setRedirectFromPath(currPath);
        }
      }
    }

    // Cleanup required to prevent memory leak
    return function cleanup() {
      mounted = false;
    };
  }, [location, isAuthenticated, loggedInOnlyPaths, loggedOutOnlyPaths, loginIsOpen]);

  // Open login if try to access a path the user needs to be logged in for
  useEffect(() => {
    if ("pathname" in location) {
      const currPath = location.pathname;

      // if (loggedInOnlyPaths.includes(currPath)) {
      if (pathIncludes(loggedInOnlyPaths, currPath)) {
        toggleLoginIsOpen();
      }
    }
  }, [location, loggedInOnlyPaths, toggleLoginIsOpen]);

  // Close the login window if the user is logged in
  useEffect(() => {
    if (isAuthenticated) {
      setLoginIsOpen(false);
    }
  }, [loginIsOpen, setLoginIsOpen, isAuthenticated]);


  const value = {
    loginIsOpen,
    setLoginIsOpen,
    redirectToPath,
    redirectFromPath,
    toggleLoginIsOpen,
  };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};
