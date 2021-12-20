import { Form, Button, Col, Card, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";

import Sidebar from "./Sidebar";
import ProductDetails from "../products/productDetail";
import { updateProductStatus } from "../products/ProductsActions";
import "./Admin.css";

const PendingProduct = ({ updateProductStatus, product }) => {
  const { id } = useParams();

  const handleSubmit = (approve, e) => {
    updateProductStatus(approve, id);
  };

  return (
    <>
      {product && product.status_id === 1 && (
        <Card className="text-center adminActionsCard">
          <Card.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Button
                    variant="primary"
                    onClick={(e) => handleSubmit(true, e)}
                  >
                    Approve
                  </Button>
                </Form.Group>

                <Form.Group as={Col}>
                  <Button
                    variant="danger"
                    onClick={(e) => handleSubmit(false, e)}
                  >
                    Reject
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      )}
      <Container fluid>
        <Row display="flex">
          <Col xs={12} sm={4} md={2}>
            <Sidebar />
          </Col>
          <Col xs={12} sm={8} md={10}>
            <Card>
              <Card.Header>Pending Products</Card.Header>
              <Card.Body>
                <ProductDetails hideChatBtn={1} pending={1} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapDispatchToProp = {
  updateProductStatus,
};

const mapStateToProps = ({ products }) => ({
  product: products.currentProduct,
});

export default connect(mapStateToProps, mapDispatchToProp)(PendingProduct);
