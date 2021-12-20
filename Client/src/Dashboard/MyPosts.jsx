import React, { useEffect, useState } from 'react';
import { Container, Nav, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Product from '../products/Product';
import productDetail from '../products/productDetail';
import { getProductsByUserAction } from './../products/ProductsActions';
import { Form, Button, Col, Card} from "react-bootstrap";

const STATUS = {
  ALL: 0,
  PENDING: 1,
  APPROVED: 2,
}

const MyPosts = ({ products, getUserProducts}) => {

  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    getUserProducts();
  }, [getUserProducts]);

  useEffect(() => {
    if (products) {
      setFilterProducts(products);
    }
  }, [products]);

  const handleSelect = (eventKey) => {
    eventKey = parseInt(eventKey);
    if (eventKey === 0) {
      setFilterProducts(products);
    } else {
      if (products && products.length > 0) {
        const filteredByStatus = products.filter(product => product.status_id === eventKey);
        setFilterProducts(filteredByStatus);    
      }
    }
  };
  return (
    <Container fluid>
      <div>
        <Nav fill variant="pills" defaultActiveKey={STATUS.ALL} onSelect={handleSelect}>
          <Nav.Item>
            <Nav.Link eventKey={STATUS.ALL}>All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={STATUS.PENDING}>Pending</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={STATUS.APPROVED}>Active</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <Container className='mt-5'>
        <Row>
          {filterProducts && filterProducts.length > 0 ?
            filterProducts.map((product) => (
              <Product product={product} key={product.id} basepath={''} seller={true} status_id={STATUS.PENDING}/>
              )) : (
              <div class="container">
                <div class="row justify-content-center text-muted">
                  <h1>Nothing So far</h1>
                </div>
              </div>
            )
          }  
        </Row>
      </Container>
    </Container>
  )
};

const mapStateToProps = ({ products }) => ({
  products: products.products
});

const mapDispatchToProp = {
  getUserProducts: getProductsByUserAction
}

export default connect(mapStateToProps, mapDispatchToProp)(MyPosts);