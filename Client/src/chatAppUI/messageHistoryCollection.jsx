import React from "react";
import { Image, Toast } from 'react-bootstrap';
import images from './images/user-woman.png';
var _ = require("lodash");
var moment = require("moment");


let style;
const MessageHistoryCollection = (props) => {

  if (_.isNull(props.messageText)) {
    return (<React.Fragment></React.Fragment>);
  }

  return (
    <React.Fragment>
      {props.messageText.data.map(item => {
        return (
          <div className={props.UserLogInEmail == item.sender_email ? "col-lg-6 offset-lg-7" : "col-lg-6 offset-lg-1"}>
            <Toast className="toast-Left">
              <Toast.Header>
                <Image style={{ height: "40px" }} thumbnail src={images} roundedCircle />
                <strong className="mr-auto">{item.sender_email}</strong>
                <small>{moment(item.sent_date).fromNow()}</small>
              </Toast.Header>
              <Toast.Body>{item.text}</Toast.Body>
            </Toast>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default MessageHistoryCollection;