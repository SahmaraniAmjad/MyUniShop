import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import "./chatApp.css";
import MessageHistoryCollection from "./messageHistoryCollection";
import SendMessageBox from "./sendMessageBox";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductAction } from "../products/ProductsActions";
import io from "socket.io-client";
import jwt from "jwt-decode";
import { getToken } from "../utils";
import { API } from "../configs";
var _ = require("lodash");

let socket;
const CONNECTION_PORT = `http://localhost:8080`;
let user = {};
const ChatApp = ({ product, getProduct }) => {
  var [HistoryPayload, setHistoryPayload] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getProduct(id);
    if (!_.isNull(getToken())) {
      user = jwt(getToken());
    }
  }, []);
  console.log("Id" + product.id);
  useEffect(() => {
    socket = io(CONNECTION_PORT);
    socket.on("Welcome", (data) => {
      socket.emit("join room", {
        seller_email: product.email,
        productName: product.name,
        buyer: user.email,
        productID: product.id,
      });
    });

    socket.on("Load History", (data) => {
      setHistoryPayload({ data: data.data, email: data.email });
    });
  }, [product.name]);

  const sendMessage = () => {
    const inputElementMsgBox = document.getElementById(
      "exampleForm.ControlTextarea1"
    );
    if (_.isEmpty(inputElementMsgBox.value)) {
      return;
    }
    socket.emit("chat message", {
      string: inputElementMsgBox.value,
      buyer: user.email,
      seller_email: product.email,
      productID: product.id,
      productName: product.name,
    });
    inputElementMsgBox.value = "";
  };

  return (
    <React.Fragment>
      <Container className="holder">
        <Row className="rows">
          <Col
            className="Columns"
            style={{ padding: "0" }}
            lg={12}>
            <Row className="InfoHeader">
              <Col style={{ textAlign: "center" }} lg={{ span: 4, offset: 0 }}>
                <Card.Header>Product: {product.name}</Card.Header>
              </Col>
              <Col style={{ textAlign: "center" }} lg={{ span: 4, offset: 0 }}>
                <Card.Header>Seller Name: {product.first_name}</Card.Header>
              </Col>
              <Col style={{ textAlign: "center" }} lg={{ span: 4, offset: 0 }}>
                <Card.Header>Seller Email: {product.email}</Card.Header>
              </Col>
            </Row>

            <div className="MessageHistory">
              <MessageHistoryCollection
                messageText={HistoryPayload} UserLogInEmail={user.email}
              />
            </div>

            <Row className="MessageBox">
              <Col lg={12}>
                <SendMessageBox Message={sendMessage} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = ({ products }) => ({
  product: products.currentProduct,
});

const mapDispatchToProp = {
  getProduct: getProductAction,
};

export default connect(mapStateToProps, mapDispatchToProp)(ChatApp);