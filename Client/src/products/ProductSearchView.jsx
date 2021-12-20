import { Jumbotron, Container, Form, Button, Col } from "react-bootstrap";
import { useEffect } from "react";
import { getCategories } from "./ProductsActions";
import { connect, useDispatch } from "react-redux";
import { setFilters, resetFilters } from "./ProductReducer";
import { useForm } from "react-hook-form";
import { BiReset, BiSearch, BiMicrophone } from "react-icons/bi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./Product.css";
import { trackProductSearch, trackVoiceSearch } from "../mixpanel/mixpanel";

const ProductSearchView = ({ categories, getCategories }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, errors, setValue } = useForm();
  const { transcript, listening } = useSpeechRecognition();

  const onSubmit = (data) => {
    dispatch(setFilters(data));
    trackProductSearch();
  };
  const clearFilters = () => {
    reset();
    dispatch(resetFilters());
  };
  useEffect(() => {
    const get = async () => await getCategories();

    get().then((_) => console.log("categeries called"));
  }, [getCategories]);

  const voiceSearch = (event) => {
    trackVoiceSearch();
    SpeechRecognition.startListening();
    const nameInput = document.getElementById("name");
    setTimeout(() => {
      nameInput.focus();
    }, 3000);
  };
  return (
    <Jumbotron className="jumbotron" fluid>
      <Container className="searchcontainer">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <Col xs={12} md={4} className="p-2">
              <Form.Control
                type="text"
                placeholder="e.g: Car"
                name="name"
                id="name"
                onFocus={(e) => {
                  setValue(
                    "name",
                    transcript !== "" ? transcript : e.target.value
                  );
                }}
                ref={register({ maxLength: 40 })}
                className="searchNameInput"
              />
              {SpeechRecognition.browserSupportsSpeechRecognition() && (
                <Button inline onClick={voiceSearch} className="searchVoiceBtn">
                  <BiMicrophone />
                </Button>
              )}
              {errors.name && <span>sorry, you exceeded the max length</span>}
            </Col>

            <Col
              controlId="exampleForm.ControlSelect1"
              xs={12}
              md={4}
              className="p-2"
            >
              <Form.Control as="select" name="category" ref={register}>
                <option value={-1}>No Category Selected </option>
                {categories &&
                  categories.map((category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
              </Form.Control>
            </Col>

            <Col md={2} className="p-2">
              <Form.Control
                type="number"
                name="priceMin"
                placeholder="Price from"
                ref={register()}
              />
            </Col>
            <Col md={2} className="p-2">
              <Form.Control
                type="number"
                name="priceMax"
                placeholder="Price to"
                ref={register()}
              />
            </Col>
          </Form.Row>

          <Form.Row className="mt-2">
            <Col xs={12} md={11} className="p-2">
              <Button variant="primary" type="submit" block>
                <span className="mr-2">
                  <BiSearch />
                </span>
                Search
              </Button>
            </Col>
            <Col xs={12} md={1} className="p-2">
              <Button
                variant="outline-secondary"
                type="reset"
                onClick={clearFilters}
                block
              >
                <BiReset />
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
    </Jumbotron>
  );
};

const mapStateToProps = ({ products }) => ({
  categories: products.categories,
});

const mapDispatchToProp = {
  getCategories,
};

export default connect(mapStateToProps, mapDispatchToProp)(ProductSearchView);
