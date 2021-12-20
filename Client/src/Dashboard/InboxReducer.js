import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    briefData: [],
    messages: [],
    currentbriefData: []
};

const InboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    setCurrentMessages: (state, action) => {
        if (action.payload) {
            state.briefData = action.payload;
          }
    },
    setCurrentbriefData: (state, action) => {
      if (action.payload) {
          state.currentbriefData = action.payload;
        }
  },
    setMessagesCollection: (state, action) => {
      if (action.payload) {
          state.messages = action.payload;
        }
  },
  },
});
const { actions, reducer } = InboxSlice;
export const {
    setCurrentMessages,
    setCurrentbriefData,
    setMessagesCollection
} = actions;

export default reducer;