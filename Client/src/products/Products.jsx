import { useEffect } from 'react';
import { trackProductListVisit } from '../mixpanel/mixpanel';
import ProductSearchView from './ProductSearchView';
import ProductsView from './ProductsView';

const Products = () => {
  
  useEffect(() => {
    trackProductListVisit();
  }, []);
  
  return (
    <>
      <ProductSearchView />
      <ProductsView />
    </>
  );
}

export default Products;
