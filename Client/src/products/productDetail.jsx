import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import images from "./images/honda1.jpeg";
import SwiftSlider from "react-swift-slider";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailIcon,
  TelegramShareButton,
  TwitterShareButton,
  TelegramIcon,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { IoIosContact, IoIosPhonePortrait } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { SiProducthunt } from "react-icons/si";
import { FaEuroSign } from "react-icons/fa";
import { getProductAction } from "./ProductsActions";
import { connect } from "react-redux";
import { MdEmail } from "react-icons/md";
import { API } from "../configs";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { push } from "connected-react-router";
import "./productDetail.css";
import jwt from "jwt-decode";
import { trackUserChat, trackUserOpenProductPage } from "../mixpanel/mixpanel";
import { getToken } from "../utils";
var _ = require("lodash");

let user = {};
const ProductDetails = ({
  getProduct,
  product,
  gotoChat,
  hideChatBtn,
  pending,
}) => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const fillSliderImages = () => {
    if (product.images) {
      var i = 1;

      const images = product.images.map((item) => {
        const container = {};
        container.src = API + item.image_url;
        container["id"] = i++;
    
        return container;
      });

      setData(images);
    }
  };
  useEffect(() => {
    console.log(id);
    getProduct(id);

    const token = getToken();
    if (!_.isNull(token)) {
      user = jwt(token);
    }
    trackUserOpenProductPage();
  }, [getProduct, id]);

  useEffect(() => {
    fillSliderImages();
  }, [product]);
  const redirectToChat = () => {
    if (product.email === user.email) {
      return;
    }
    if (id) {
      trackUserChat();
      gotoChat(id);
    }
  };

  console.log("Id " + product);

  const shareUrl = window.location.href;
  const title = "Have a look at this great product from MyUniShop";
  return (
    <React.Fragment>
      <Container className="holder" style={{ marginTop: "1%" }}>
        <Row className="rows">
          <Col lg={4} className="cols">
            <Card>
              <Card.Header>Product Details</Card.Header>
              <Card.Body>
                <Card.Title>
                  <SiProducthunt /> &nbsp;{product.name}
                </Card.Title>
                <Card.Title>
                  <FaEuroSign /> &nbsp;{product.price}
                </Card.Title>
                <Card.Title>
                  <IoLocationSharp /> &nbsp;{product.state}
                </Card.Title>
              </Card.Body>
              <Card.Footer className="text-muted">
                {" "}
                Published 2 days ago
              </Card.Footer>
            </Card>
            <Card style={{ marginTop: "3%", marginBottom: "3%" }}>
              <Card.Header>Seller Description</Card.Header>
              <Card.Body>
                <Card.Title>
                  <IoIosContact /> &nbsp;{product.first_name}
                </Card.Title>
                <Card.Title>
                  <MdEmail /> &nbsp;{product.email}
                </Card.Title>
                <Card.Title>
                  <IoIosPhonePortrait /> &nbsp;{product.phone_number}
                </Card.Title>
                {!hideChatBtn ? (
                  <Button variant="primary" onClick={redirectToChat}>
                    Chat with Seller
                  </Button>
                ) : (
                  <Button variant="primary">View Seller Details</Button>
                )}
              </Card.Body>
              <Card.Footer className="text-muted">
                Active Since 3 Years
              </Card.Footer>
            </Card>
          </Col>
          <Col lg={8} className="cols">
            <Card>
              {/* <Card.Img
                variant="top"
                style={{ height: "400px" }}
                src={
                  !_.isEmpty(product.image_url)
                    ? API + product.image_url
                    : images
                }
              /> */}
              <SwiftSlider data={data} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Title>&euro; {product.price}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="social_share">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="social_share_button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="social_share_button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="social_share_button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="social_share_button"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="body"
            className="social_share_button"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
          <LinkedinShareButton url={shareUrl} className="social_share_button">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = ({ products }) => ({
  product: products.currentProduct,
});

const mapDispatchToProp = {
  getProduct: getProductAction,
  gotoChat: (id) => push(`/products/${id}/chat`),
};

export default connect(mapStateToProps, mapDispatchToProp)(ProductDetails);
