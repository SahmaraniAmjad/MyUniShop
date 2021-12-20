import { Card, Container, Col, Row } from "react-bootstrap";
import ProductsView from "../products/ProductsView";
import Sidebar from "./Sidebar";

const PendingProducts = () => {
  const path = "/admin/pending/";
  return (
    <>
      <Container fluid>
        <Row display="flex">
          <Col xs={12} sm={4} md={2}>
            <Sidebar />
          </Col>
          <Col xs={12} sm={8} md={10}>
            <Card>
              <Card.Header>Pending Products</Card.Header>
              <Card.Body>
                <ProductsView basepath={path} pending={1} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PendingProducts;
