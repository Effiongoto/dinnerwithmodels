import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Button, ListGroup, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listModelDetails, createModelReview } from '../actions/modelActions';
import { MODEL_CREATE_REVIEW_RESET } from '../constants/modelConstants';

const ModelScreen = ({ match, history }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const modelDetails = useSelector((state) => state.modelDetails);
  const { loading, error, model } = modelDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const modelReviewCreate = useSelector((state) => state.modelReviewCreate);
  const {
    success: successModelReview,
    error: errorModelReview,
  } = modelReviewCreate;

  useEffect(() => {
    if (successModelReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: MODEL_CREATE_REVIEW_RESET });
    }
    dispatch(listModelDetails(match.params.id));
  }, [match, dispatch, successModelReview]);

  const subscriptionHandler = () => {
    history.push('/login?redirect=subscribe');
  };

  const paymentHandler = () => {
    history.push(`/login?redirect=pay/${model._id}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createModelReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h2>{model.username}</h2>
          <Row>
            {model.images &&
              model.images.map((img) => (
                <Col md={3}>
                  <Image src={img} alt={model.name} fluid />
                </Col>
              ))}
          </Row>
          <h3>Nudes</h3>
          <p>
            to unlock allprivate pictures on website for N10,000 monthly{' '}
            <Button type='button' className='btn' onClick={subscriptionHandler}>
              Click Here
            </Button>
          </p>
          <Row className='mt-5'>
            <Col md={3}>
              <Image
                // src={model.images}
                alt={model.name}
                fluid
                style={{ filter: 'blur(20px)' }}
              />
            </Col>
          </Row>
          <h3 className='mt-5'>Services</h3>
          <h3 className='mt-5'>Reviews</h3>
          <h3 className='mt-5'>Contact Info</h3>
          <p>
            To buy model's phone number for N5,000{' '}
            <Button type='button' className='btn' onClick={paymentHandler}>
              Click Here
            </Button>
          </p>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {model.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {model.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h3>Write a Customer Review</h3>
                  {errorModelReview && (
                    <Message variant='danger'>{errorModelReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ModelScreen;
