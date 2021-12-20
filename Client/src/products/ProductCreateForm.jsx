import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateProductSchema } from './Validations';
import { getCategories, saveProductAction } from './ProductsActions';

const ProductCreateForm = ({saveProduct, getCategories, categories}) => {
  const [uploads, setUploads] = useState();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(CreateProductSchema),
  });

  const handleUpload = (e) => {
    if (e && e.target && e.target.files) {
      setUploads(Array.from(e.target.files).map((i) => URL.createObjectURL(i)));
    }
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const onSubmit = async (data) => {
    await saveProduct(data);
  }

  return (
    <Container>
      <Card bg="light">
        <Card.Header>
          <h3>Create your product sale post</h3>
        </Card.Header>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Card.Body>
            <Card.Title>
              <h4>Product</h4>
            </Card.Title>
            <Form.Group controlId="Form.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product name"
                name="name"
                ref={register}
              />
            </Form.Group>
            {errors && errors.name && (
              <Alert variant="danger">{errors.name?.message}</Alert>
            )}
            <Form.Group controlId="Form.description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add some details about your product"
                name="description"
                ref={register}
              />
            </Form.Group>
            {errors && errors.description && (
              <Alert variant="danger">{errors.description?.message}</Alert>
            )}
            <Form.Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="Form.category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" name="category" ref={register}>
                    {categories &&
                      categories.map((category, index) => (
                        <option value={category.id} key={index}>
                          {category.name}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="Form.price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Price in Euro(s)"
                    name="price"
                    ref={register}
                  />
                </Form.Group>
                {errors && errors.price && (
                  <Alert variant="danger">{errors.price?.message}</Alert>
                )}
              </Col>
            </Form.Row>
            <Form.Group>
              <Form.File
                id="Form.files"
                label="Upload Image(s)"
                multiple
                onChange={handleUpload}
                accept="image/x-png,image/gif,image/jpeg"
                name="files"
                ref={register}
              />
            </Form.Group>
            {errors && errors.files && (
              <Alert variant="danger">{errors.files?.message}</Alert>
            )}
            {uploads && (
              <Row>
                {uploads.map((img, index) => (
                  <Col xs={6} md={4} key={index}>
                    <Image src={img} rounded thumbnail className="my-1" />
                  </Col>
                ))}
              </Row>
            )}
          </Card.Body>
          <Card.Body>
            <Card.Title>
              <h4>Location</h4>
            </Card.Title>
            <Form.Group controlId="Form.locationName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g: Home, Campus etc."
                name="location.name"
                ref={register}
              />
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
                {errors && errors.location && errors.location.street && (
                  <Alert variant="danger">
                    {errors.location?.street?.message}
                  </Alert>
                )}
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="Form.post">
                  <Form.Label>Post Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Postal/Zip Code"
                    name="location.post_code"
                    ref={register}
                  />
                </Form.Group>
                {errors && errors.location && errors.location.postCode && (
                  <Alert variant="danger">
                    {errors.location?.postCode?.message}
                  </Alert>
                )}
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
                {errors && errors.location && errors.location.state && (
                  <Alert variant="danger">
                    {errors.location?.state?.message}
                  </Alert>
                )}
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
                {errors && errors.location && errors.location.city && (
                  <Alert variant="danger">
                    {errors.location?.city?.message}
                  </Alert>
                )}
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="Form.country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    name="location.country"
                    ref={register}
                  >
                    <option value="Germany">Germany</option>
                    <option value="United States of America">USA</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="Form.phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="location.phone_number"
                    ref={register}
                  />
                </Form.Group>
                {errors && errors.location && errors.location.phone && (
                  <Alert variant="danger">
                    {errors.location?.phone?.message}
                  </Alert>
                )}
              </Col>
            </Form.Row>
          </Card.Body>
          <Card.Footer>
            <ButtonGroup className="w-100">
              <Button variant="secondary" className="w-50">
                Cancel
              </Button>
              <Button variant="primary" className="w-50" type="submit">
                Create
              </Button>
            </ButtonGroup>
          </Card.Footer>
        </Form>
      </Card>
    </Container>
  );
};

const mapDispatchToProp = {
  saveProduct: saveProductAction,
  getCategories,
};

const mapStateToProp = ({ products }) => ({
  categories: products.categories,
});

export default connect(mapStateToProp, mapDispatchToProp)(ProductCreateForm);
