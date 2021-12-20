import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import './chatApp.css';



const SendMessageBox = (props) => {

    return (
        <React.Fragment>
        <Form style={{ marginTop: "2%" }}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Card>
                    <Card.Header>Type a Message</Card.Header>
                </Card>
                <Form.Control as="textarea" rows={4} />
                <Button style={{ marginTop: "1%",marginBottom:"1%" }} variant="primary" onClick={props.Message}>
                    Send Message
                </Button>
            </Form.Group>
        </Form>
    </React.Fragment>
    );
}

export default SendMessageBox;