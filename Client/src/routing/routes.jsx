import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../store/store";
import Header from "../layout/Header";
import Signup from "../Authentication/Signup";
import SignIn from "../Authentication/SignIn";
import ProductDetails from "../products/productDetail";
import Dashboard from "../Dashboard/Dashboard";
import MyPosts from "../Dashboard/MyPosts";
import ChatAppInbox from "../../src/chatAppUI/chatAppInbox";
import PendingProducts from "../Admin/PendingProducts";
import PendingProduct from "../Admin/PendingProduct";
import Products from "../products/Products";
import ProductCreateView from "../products/productCreateView";
import ChatApp from "../chatAppUI/chatApp";
import { PrivateRoute } from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";


export const Router = () => {
  return (
    <ConnectedRouter history={history}>
      <Header />
      <Switch>
        <PrivateRoute path="/dashboard/chat/:id" component={ChatAppInbox} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <AdminRoute path="/admin/pending/:id" component={PendingProduct} />
        <AdminRoute path="/admin/pending" component={PendingProducts} />
        <PrivateRoute path="/products/:id/chat" component={ChatApp} exact/>
        <Route path="/products/:id" component={ProductDetails} />      
        <PrivateRoute path="/products" component={ProductCreateView} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/mypost" component={MyPosts} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={Products} />
        <Redirect from="*" to="/" />
      </Switch>
    </ConnectedRouter>
  );
};
