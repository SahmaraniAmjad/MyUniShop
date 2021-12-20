import React from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { MDBIcon } from "mdbreact";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signin } from "./UserActions";
import "./Authentication.css";

const SigninView = ({ signin }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    signin(data);
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row className="loginrow">
          <Col className="logincol" sm="5" md="5">
            <p>
              <b>Sign In</b>
            </p>
            <hr></hr>

            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                ref={register({ required: true })}
              />
              {errors.email && <span>Email is required</span>}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                ref={register({ required: true })}
              />
              {errors.password && <span>Password is required</span>}
            </Form.Group>

            <Form.Group>
              <a href="/">Forget Password!</a>
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">
                Sign in
              </Button>
            </Form.Group>
          </Col>

          <Col className="logincol" sm="5" md="5">
            <p>
              <b>Not registerd yet?</b>
            </p>
            <hr></hr>
            <Form.Group>
              <p>
                <MDBIcon far icon="star" /> Add to favorites easily
              </p>
            </Form.Group>
            <Form.Group>
              <p>
                {" "}
                <MDBIcon icon="envelope" /> Read and reply to messages
                everywhere
              </p>
            </Form.Group>

            <Form.Group>
              <p>
                <MDBIcon icon="pen" /> Easily manage and edit your posts
              </p>
            </Form.Group>

            <Form.Group>
              <p>
                <MDBIcon icon="user-alt" /> Everything is between you and your
                colleagues
              </p>
            </Form.Group>
            <Form.Group>
              <Link to="/signup" className="btn btn-primary">
                Sign up
              </Link>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};

const mapDispatchToProp = {
  signin,
};

export default connect(null, mapDispatchToProp)(SigninView);
