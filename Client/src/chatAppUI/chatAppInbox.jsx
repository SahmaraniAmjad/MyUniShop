import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import "./chatApp.css";
import MessageHistoryCollection from "./messageHistoryCollection";
import SendMessageBox from "./sendMessageBox";
import { connect } from "react-redux";
import io from "socket.io-client";
import { getDetailInboxMessages, getCurrentBriefDataByID } from "../Dashboard/InboxActions";
import { API } from "../configs";
import { useParams } from "react-router";
var _ = require("lodash");

let socket;
const CONNECTION_PORT = `http://localhost:8080`;
const ChatApp = ({ briefData, email, messages, getCurrentBriefDataByID, getDetailInboxMessages }) => {
  var [HistoryPayload, setHistoryPayload] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    getCurrentBriefDataByID(id)
  }, []);

  useEffect(() => {
    getDetailInboxMessages(id)
  }, [briefData]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
    socket.on("Welcome", (data) => {
      socket.emit("join room", {
        seller_email: briefData.user_email,
        productName: briefData.product_name,
        buyer: briefData.seller_email,
        productID: briefData.product_id,
      });
    });

    socket.on("Load History", (data) => {
      setHistoryPayload({ data: data.data });
    });
  }, [briefData]);

  const sendMessage = () => {
    const inputElementMsgBox = document.getElementById(
      "exampleForm.ControlTextarea1"
    );
    if(_.isEmpty(inputElementMsgBox.value)){
      return;
    }
    socket.emit("chat message", {
      string: inputElementMsgBox.value,
      buyer: briefData.user_email === email ? briefData.user_email : briefData.seller_email,
      seller_email:  briefData.user_email === email ? briefData.seller_email : briefData.user_email,
      productID: briefData.product_id,
      productName: briefData.product_name,
    });
    inputElementMsgBox.value = "";
  };

  return (
    <React.Fragment>
      <Container className="holder">
        <Row className="rows">
          <Col
            className="Columns"
            style={{ border: "1px solid grey", padding: "0" }}
            lg={12}>
            <Row className="InfoHeader">
              <Col style={{ textAlign: "center" }} lg={{ span: 4, offset: 0 }}>
                <Card.Header>Product: {briefData.product_name}</Card.Header>
              </Col>
              <Col style={{ textAlign: "center" }} lg={{ span: 4, offset: 0 }}>
                <Card.Header>Talking to: {briefData.user_email === email ? briefData.seller_email: briefData.user_email}</Card.Header>
              </Col>
            </Row>

            <div className="MessageHistory">
              <MessageHistoryCollection
                messageText={HistoryPayload} UserLogInEmail={email}
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

const mapStateToProps = (state) => ({
  email: state.users.email,
  briefData: state.inbox.currentbriefData,
  messages: state.inbox.messages
});

const mapDispatchToProp = {
  getCurrentBriefDataByID: getCurrentBriefDataByID,
  getDetailInboxMessages: getDetailInboxMessages
};

export default connect(mapStateToProps, mapDispatchToProp)(ChatApp);