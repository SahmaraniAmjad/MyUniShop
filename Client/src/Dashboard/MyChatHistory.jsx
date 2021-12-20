import React, { useEffect, useState } from "react";
import { Container, Col, Row, Table, Button } from "react-bootstrap";
import "./myChatHistory.css";
import { connect } from "react-redux";
import { getInboxMessages } from "./InboxActions";
import { push } from "connected-react-router";
var _ = require("lodash");


const ChatHistory = ({ briefData, getInboxMessages, email, gotoChat }) => {
  useEffect(() => {
    getInboxMessages(email);
  }, [getInboxMessages]);

  const redirectToChat = (id) => {
    if (id) {
      gotoChat(id);
    }
  };

  // if (_.isEmpty(briefData)) {
  //   return;
  // }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md={12}>
            <Table id="tableChat" striped bordered hover>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>From</th>
                  <th>Product Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              {briefData.map((items) => {
                return (
                  <tbody>
                    <tr>
                      <td>{items.id}</td>
                      <td>{items.seller_email === email ? items.user_email : items.seller_email}</td>
                      <td>{items.product_name}</td>
                      <td>
                    <Button className="chatButton" variant="primary" onClick={() => redirectToChat(items.id)}>
                          Reply to Sender
                    </Button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
              }
            </Table>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  email: state.users.email,
  briefData: state.inbox.briefData
});

const mapDispatchToProp = {
  getInboxMessages: getInboxMessages,
  gotoChat: (id) => push(`/dashboard/chat/${id}`)
};

export default connect(mapStateToProps, mapDispatchToProp)(ChatHistory);