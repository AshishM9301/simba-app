import { returnErrors } from "./_errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check token & Load User
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  const newHeader = {
    "Content-Type": "application/json",
    x_auth_token: `${getState().auth.token}`,
  };

  var myHeaders = new Headers();

  myHeaders.append("x_auth_token", `${getState().auth.token}`);

  console.log(myHeaders);

  fetch("http://localhost:5000/api/users/auth", {
    method: "GET",
    headers: newHeader,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.isAuth) {
        dispatch({
          type: USER_LOADED,
          payload: data,
        });
      } else {
        console.log(data);
        dispatch(returnErrors(data.errorMessage, "AUTH_ERROR"));
        dispatch({ type: AUTH_ERROR });
      }
    });
};

// Register Agent / Staff
export const register =
  ({
    firstName,
    lastName,
    email,
    phoneNumber,
    companyName,
    city,
    state,
    country,
    zipCode,
    websiteLink,
    socialLink,
    role,
  }) =>
  (dispatch) => {
    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      phoneNumber,
      companyName,
      city,
      state,
      country,
      zipCode,
      websiteLink,
      socialLink,
      role,
    });

    return fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: data,
          });
        } else {
          dispatch(
            returnErrors(data.errorMessage, data.status, "REGISTER_FAIL")
          );
          dispatch({
            type: REGISTER_FAIL,
          });
        }
      });
  };

// Login User
export const login =
  ({ email, password }) =>
  (dispatch) => {
    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({ email, password });

    return fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
          });
        } else {
          dispatch(returnErrors(data.errorMessage, data.status, "LOGIN_FAIL"));
          dispatch({
            type: LOGIN_FAIL,
          });
        }
      });
  };

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup Config/header and Token
export const tokenConfig = (getState) => {
  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If Token, add to headers
  if (token) {
    config.headers["x_auth_token"] = token;
  }

  return config;
};
