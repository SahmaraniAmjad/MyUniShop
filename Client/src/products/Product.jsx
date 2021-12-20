import { Card, Button, Col, Badge, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "holderjs";
import { API } from "../configs";
import { updateProductStatusBySeller } from "./ProductsActions";
import { connect } from "react-redux";

const Product = ({ product, basepath, seller, updateStatus }) => {
  const path = basepath ? basepath : "/products/";
  
  const handleDeactivate = () => {
    updateStatus(product, 3);
  }

  const handleActivate = () => {
    updateStatus(product, 2);
  }
  return (
    <Col xs={12} sm={6} md={3} className="my-3">
      <Card key={product.id}>
        <Card.Img
          variant="top"
          src={
            product.images && product.images.length > 0
              ? API + product.images[0].image_url
              : "holder.js/100px180"
          }
        />
        <Card.Body>
          <Card.Title>{product.name}
          </Card.Title>
          <Card.Subtitle>&euro; {product.price}</Card.Subtitle>
          <Card.Text>{product.description}
        
            {
              seller && product.status_id === 3 && (
                <span>
                 <h4> <Badge variant="warning" className="mr-2">DEACTIVATED</Badge> </h4>
                </span>
              )
            }

            {
              seller && product.status_id === 4 && (
                <span>
                 <h4> <Badge variant="danger" className="mr-2">REJECTED</Badge> </h4>
                </span>
              )
            }

            {
              seller && product.status_id === 1 && (
                <span>
                 <h4> <Badge variant="secondary" className="mr-2">PENDING</Badge> </h4>
                </span>
              )
            }
          </Card.Text>
          <ButtonGroup>
            {
              seller && (product.status_id == 2) && (
                <Button variant="outline-danger" className="mr-2" onClick={handleDeactivate} block>
                  Deactivate
                </Button>
              )

            }
            
            {
              seller && product.status_id === 3 && product.status_id !== 4  && (
                <Button variant="outline-success" className="mr-2" onClick={handleActivate} block>
                  Activate
                </Button>
              )
            }
            <Link to={`${path}${product.id}`}>
              <Button variant="outline-primary"  onClick="" block>
                View
            </Button>
            </Link>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};

const mapDispatchToProp = {
  updateStatus: updateProductStatusBySeller
}

export default connect(null, mapDispatchToProp)(Product);
