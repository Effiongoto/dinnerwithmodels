import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselDetails, updateCarousel } from "../actions/carouselActions";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const CarouselEditScreen = ({ match, history }) => {
  const carouselId = match.params.id;
  const [carousel, setCarousel] = useState({
    name: "",
    text: "",
    image: "",
  });

  const dispatch = useDispatch();

  const carouselDetails = useSelector((state) => state.carouselDetails);
  const { loading, error, carousel: carouselDetail } = carouselDetails;

  const carouselUpdate = useSelector((state) => state.carouselUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = carouselUpdate;

  useEffect(() => {
    if (successUpdate) {
      history.push("/admin/carousel");
    } else {
      if (!carouselDetail.name || carouselDetail._id !== carouselId) {
        dispatch(getCarouselDetails(carouselId));
      } else {
        setCarousel(carouselDetail);
      }
    }
  }, [dispatch, history, carouselId, successUpdate, carouselDetail]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarousel((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setCarousel({
        ...carousel,
        [e.target.name]: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = (e) => {
    dispatch(updateCarousel(carousel));
    e.preventDefault();
  };

  return (
    <div>
      <Link to="/admin/carousel" className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h2>Edit Carousel</h2>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Enter a name for your Carousel"
                value={carousel.name}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="text"
                type="text"
                placeholder="Enter Carousel Text to be displayed"
                value={carousel.text}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Carousel Image</Form.Label>
              <Form.Control type="text" value={carousel.image}></Form.Control>
              <Form.File
                name="image"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              />
            </Form.Group>
            <Button className="btn-md btn-dark" onClick={submitHandler}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default CarouselEditScreen;
