import React, { useRef } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { MDBIcon } from "mdbreact";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signup } from "./UserActions";
import "./Authentication.css";

const SignupView = ({ signup }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = (data) => {
    signup(data);
  };
  return (
    <Container fluid>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row className="loginrow">
          <Col className="logincol" sm="5" md="5">
            <p>
              <b>Sign Up</b>
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

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                ref={register({
                  required: true,
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
              )}
            </Form.Group>
            <Form.Group>
              <Button variant="primary" type="submit">
                Sign up
              </Button>
            </Form.Group>
          </Col>

          <Col className="logincol" sm="5" md="5">
            <p>
              <b>Already have an account</b>
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
              <Link to="/signin" className="btn btn-primary" >
                Sign in
              </Link>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
};

const mapDispatchToProp = {
  signup,
};

export default connect(null, mapDispatchToProp)(SignupView);
