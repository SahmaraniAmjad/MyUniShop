import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedin: false,
  email: "",
};

const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    signinUserSuccess: (state, action) => {
      
      if (action && action.payload) {
        state.loggedin = true;
        state.email = action.payload;
      }
    },
    signinUserFailed: (state, action) => {
      if (action && action.payload) {
        state.loggedin = false;
      }
    },
    signupUserSuccess: (state, action) => {
      if (action && action.payload) {
        state.loggedin = false;
      }
    },
    signupUserFailed: (state, action) => {
      if (action && action.payload) {
        state.loggedin = false;
      }
    },
    signoutUser: (state, action) => {
      if (action && action.payload) {
        state.loggedin = false;
      }
    },
  },
});

const { actions, reducer } = UserSlice;

export const {
  signinUserSuccess,
  signinUserFailed,
  signupUserSuccess,
  signupUserFailed,
  signoutUser,
} = actions;

export default reducer;
