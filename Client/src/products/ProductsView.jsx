import { Badge, Container, Row, Spinner } from "react-bootstrap";
import "holderjs";
import { useEffect, useState } from "react";
import Product from "./Product";
import "./Product.css";
import { connect } from "react-redux";
import { getProducts, getPendingProducts } from "./ProductsActions";

const ProductsView = ({
  filters,
  products,
  getProducts,
  getPendingProducts,
  basepath,
  pending,
  empty,
}) => {
  const [loading, setLoading] = useState(true);
  const message =
    "No products found for the given filters, choose something else?";
  useEffect(() => {
    if (pending) {
      const get = async () => getPendingProducts();
      get().then((x) => setLoading(false));
    } else if (filters) {
      const get = async () => getProducts(filters);
      get().then((x) => setLoading(false));
    }
  }, [getProducts, getPendingProducts, filters, pending]);

  return loading ? (
    <Spinner
      className="spinner-center"
      animation="grow"
      variant="primary"
      size="lg"
    />
  ) : (
    <Container fluid>
      {empty && (
        <div className="text-center">
          <Badge variant="light">
            {pending ? "No pending products" : message}
          </Badge>
        </div>
      )}
      <Row>
        {products &&
          products.length > 0 &&
          products?.map((product) => (
            <Product product={product} key={product.id} basepath={basepath} />
          ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ products }) => ({
  products: products.products,
  filters: products.filters,
  empty: products.empty,
});

const mapDispatchToProp = {
  getProducts,
  getPendingProducts,
};

export default connect(mapStateToProps, mapDispatchToProp)(ProductsView);
