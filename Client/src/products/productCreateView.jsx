import React from 'react';
import { Container } from 'react-bootstrap';
import ProductCreateForm from './ProductCreateForm';

const ProductCreateView = () => {
  return (
    <Container fluid className='w-sm-100 w-xl-50 w-lg-50 w-md-50 py-3'>
      <div className='my-3'>
        <ProductCreateForm />
      </div>
    </Container>
  );
};

export default ProductCreateView;