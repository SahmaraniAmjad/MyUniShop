import {
  signinUserSuccess,
  signinUserFailed,
  signupUserSuccess,
  signupUserFailed,
  signoutUser,
} from "./UserReducer";
import axios from "axios";
import { API } from "../configs";
import { history } from "../store/store";
import { SuccessAlert, FailAlert } from "../components/Alerts";
import jwt from "jwt-decode";
import { trackSignIn, trackSignUp } from "../mixpanel/mixpanel";
import { setToken } from "../utils";

export const signin = (user) => async (dispatch) => {
  const apiUrl = `${API}/signin`;
  try {
    axios
      .post(apiUrl, {
        email: user.email,
        password: user.password,
      })

      .then(
        (data) => {
          const token = data.data.token;
          setToken(token);
          const user = jwt(token);
          dispatch(signinUserSuccess(user.email));

          if (user.isAdmin) {
            history.push("/admin/pending");
          } else {
            history.push("/");
          }

          trackSignIn();
        },

        (error) => {
          FailAlert(error.response.data.message);
          dispatch(signinUserFailed(error.response.data.message));
        }
      );
  } catch (err) {
    FailAlert("An error occured, please try again later.");
  }
};
export const signup = (user) => async (dispatch) => {
  const apiUrl = `${API}/signup`;
  axios
    .post(apiUrl, {
      email: user.email,
      password: user.password,
    })

    .then(
      (data) => {
        dispatch(signupUserSuccess());
        SuccessAlert("User created successfully");
        setTimeout(function () {
          dispatch(signin(user));
        }, 3000);

        trackSignUp();
      },
      (error) => {
        if (error.response.data.errors) {
          FailAlert(
            error.response.data.errors[0].param +
              ":" +
              error.response.data.errors[0].msg
          );
        } else {
          FailAlert(error.response.data.message);
        }
        dispatch(signupUserFailed(error.response.data.message));
      }
    );
};
export const signout = () => async (dispatch) => {
  dispatch(signoutUser());
  localStorage.clear();
  window.location = "/";
};
