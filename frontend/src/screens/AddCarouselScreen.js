import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createCarousel } from '../actions/carouselActions';

const AddCarouselScrren = ({ history }) => {
  const [carousel, setCarousel] = useState({
    name: '',
    image: '',
    text: '',
  });
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error } = userDetails;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarousel((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const addCarousel = (e) => {
    dispatch(createCarousel(carousel));
    history.push('/admin/carousel');
    e.preventDefault();
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setCarousel({
        ...carousel,
        [e.target.name]: data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>Create Home Page Carousel</h2>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            name='name'
            type='text'
            placeholder='Enter a name for your Carousel'
            value={carousel.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control
            onChange={handleChange}
            name='text'
            type='text'
            placeholder='Enter Carousel Text to be displayed'
            value={carousel.text}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Carousel Image</Form.Label>
          <Form.Control type='text' value={carousel.image}></Form.Control>
          <Form.File
            name='image'
            label='Choose File'
            custom
            onChange={uploadFileHandler}
          />
        </Form.Group>
        <Button className='btn-md btn-dark' onClick={addCarousel}>
          Create Carousel
        </Button>
      </Form>
    </Container>
  );
};

export default AddCarouselScrren;
