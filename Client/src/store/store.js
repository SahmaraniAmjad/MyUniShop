import { createBrowserHistory } from "history";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import productReducer from "../products/ProductReducer";
import inboxReducer from "../Dashboard/InboxReducer"
import userReducer from "../Authentication/UserReducer";

export const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    router: connectRouter(history),
    products: productReducer,
    users: userReducer,
    inbox: inboxReducer
  },
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
});

export default store;
