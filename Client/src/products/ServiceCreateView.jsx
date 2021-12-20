import { push } from 'connected-react-router';
import React from 'react';
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { SuccessAlert } from '../components/Alerts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateServiceSchema } from './Validations';

const ServiceCreateForm = () => {

  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(CreateServiceSchema)
  });

  const onSubmit = () => {
    SuccessAlert('Post submitted for review');
    setTimeout(() => {
      dispatch(push('/'));
    }, 3000);
  }

  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>Create your service ad</h3>
        </Card.Header>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Card.Body>
            <Card.Title>
              <h4>Service</h4>
            </Card.Title>
            <Form.Group controlId="Form.name">
              {
                console.log('Errors: %o', errors)
              }
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Service name"
                name='name'
                ref={register}
              />
            </Form.Group>
            {
              errors && errors.name && (
                <Alert variant='danger'>
                  {errors.name?.message}
                </Alert>
              )
            }
            <Form.Group controlId="Form.description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add some details about your service"
                name='description'
                ref={register}
              />
            </Form.Group>
            {
              errors && errors.description && (
                <Alert variant='danger'>
                  {errors.description?.message}
                </Alert>
              )
            }
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="Form.category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select">
                    <option>Tutoring</option>
                    <option>Artwork</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="Form.price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Price in Euro(s)"
                    name='price'
                    ref={register}
                  />
                </Form.Group>
                {
                  errors && errors.price && (
                    <Alert variant='danger'>
                      {errors.price?.message}
                    </Alert>
                  )
                }
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="Form.persons">
                  <Form.Label>Max persons</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Mention how many person you can service, keep it blank if unlimited"
                    name='persons'
                    ref={register}
                  />
                </Form.Group>
                {
                  errors && errors.persons && (
                    <Alert variant='danger'>
                      {errors.persons?.message}
                    </Alert>
                  )
                }
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="Form.startingDate">
                  <Form.Label>Starting Date</Form.Label>
                  <Form.Control
                    placeholder="Service starting date"
                    name='startingDate'
                    type='date'
                    ref={register}
                  />
                </Form.Group>
                {
                  errors && errors.startingDate && (
                    <Alert variant='danger'>
                      {errors.startingDate?.message}
                    </Alert>
                  )
                }
              </Col>
            </Form.Row>
          </Card.Body>
          <Card.Body>
            <Card.Title>
              <h4>Location</h4>
            </Card.Title>
            <Form.Group controlId="Form.locationName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="e.g: Home, Campus etc." />
            </Form.Group>
            <Form.Row>
              <Col xs={12} md={4}>
                <Form.Group controlId="Form.street">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="street title..."
                    name="location.street"
                    ref={register}
                  />
                </Form.Group>
                {
                  errors && errors.location && errors.location.street && (
                    <Alert variant='danger'>
                      {errors.location?.street?.message}
                    </Alert>
                  )
                }
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="Form.post">
                  <Form.Label>Post Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Postal/Zip Code"
                    name="location.postCode"
                    ref={register}
                  />
                </Form.Group>
                {
                  errors && errors.location && errors.location.postCode && (
                    <Alert variant='danger'>
                      {errors.location?.postCode?.message}
                    </Alert>
                  )
                }
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="Form.state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="location.state"
                    ref={register}
                  />
                </Form.Group>
                {
                  errors && errors.location && errors.location.state && (
                    <Alert variant='danger'>
                      {errors.location?.state?.message}
                    </Alert>
                  )
                }
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={12} md={4}>
                <Form.Group controlId="Form.city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="city..."
                    name="location.city"
                    ref={register}
                  />
                </Form.Group>
                {
                  errors && errors.location && errors.location.city && (
                    <Alert variant='danger'>
                      {errors.location?.city?.message}
                    </Alert>
                  )
                }
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="Form.country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select">
                    <option>Germany</option>
                    <option>USA</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="Form.phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="location.phone"
                    ref={register}
                  />
                </Form.Group>
                {
                  errors && errors.location && errors.location.phone && (
                    <Alert variant='danger'>
                      {errors.location?.phone?.message}
                    </Alert>
                  )
                }
              </Col>
            </Form.Row>
          </Card.Body>
          <Card.Footer>
            <ButtonGroup className='w-100'>
              <Button variant='outline-secondary' className='w-50'>
                Cancel
              </Button>
              <Button variant='outline-primary' className='w-50' type='submit'>
                Create
              </Button>
            </ButtonGroup>
          </Card.Footer>
        </Form>
      </Card>
    </Container>
  )
};

export default ServiceCreateForm;