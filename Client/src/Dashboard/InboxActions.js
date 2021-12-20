import {
  setCurrentMessages,
  setMessagesCollection,
  setCurrentbriefData
 } from "./InboxReducer";
import axios from "axios";
import { API } from "../configs";

export const getInboxMessages = (email) => async (dispatch) => {
  const apiUrl = `${API}/inbox/${email}`;
  axios.get(apiUrl).then((briefData) => {
    const response = briefData.data;
    console.log(response);
    dispatch(setCurrentMessages(response));
  });
};

export const getBriefDataByID = (id) => async (dispatch) => {
  const apiUrl = `${API}/inbox/id/${id}`;
  axios.get(apiUrl).then((briefData) => {
    const response = briefData.data;
    dispatch(setCurrentMessages(response));
  });
};

export const getCurrentBriefDataByID = (id) => async (dispatch) => {
  const apiUrl = `${API}/inbox/id/${id}`;
  axios.get(apiUrl).then((briefData) => {
    const response = briefData.data;
    dispatch(setCurrentbriefData(response));
  });
};

export const getDetailInboxMessages = (id) => async (dispatch) => {
  const apiUrl = `${API}/inbox/detail/${id}`;
  axios.get(apiUrl).then((messages) => {
    const response = messages.data;
    console.log(response);
    dispatch(setMessagesCollection(response));
  });
};