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
            <Image
              src={model.profileImage}
              alt={model.username}
              fluid
              style={{ height: '300px', marginRight: 20, marginBottom: 20 }}
            />
            {model.images &&
              model.images.map((img) => (
                <Image
                  src={img}
                  alt={model.username}
                  fluid
                  style={{ height: '300px', marginRight: 20, marginBottom: 20 }}
                />
              ))}
          </Row>
          <h3 className='mt-5'>About Me:</h3>
          <Rating
            value={model.rating}
            text={`from ${model.numReviews} reviews`}
          />
          <p>
            <strong>
              {model.username} is a {model.gender} model from {model.city},{' '}
              {model.state}, {model.country}
            </strong>
          </p>
          <p>
            <strong>Date of bith:</strong> {model.DOB}{' '}
          </p>
          <p>{model.about}</p>
          <p>States visited often: {model.states_visited_often}</p>
          <p>Minimum cash gift:{model.minCashGift}</p>
          <p>
            Open to dates with {model.open_to_dinner_dates}s{' '}
            {model.open_to_dinner_dates === 'Both' ? <>sexes</> : <>only</>}
          </p>

          <h3>Nude Pictures:</h3>
          {userInfo && userInfo.isSubscribed ? (
            <Row>
              {model.privateImages &&
                model.privateImages.map((img) => (
                  <Image
                    src={img}
                    alt={model.username}
                    fluid
                    style={{
                      height: '300px',
                      marginRight: 20,
                      marginBottom: 20,
                    }}
                  />
                ))}
            </Row>
          ) : (
            <p>
              to unlock all private pictures on website for N10,000 monthly{' '}
              <Button
                type='button'
                className='btn'
                onClick={subscriptionHandler}
              >
                Click Here
              </Button>
            </p>
          )}

          <h3 className='mt-5'>Contact Info</h3>
          {userInfo &&
          userInfo.modelsPaidFor.find((x) => x === model.username) ? (
            <>
              <p>Phone Number: {model.phoneNumber1}</p>
              {model.phoneNumber2 && <p>Other Number: {model.phoneNumber2}</p>}
              <p>Whatsapp Number: {model.whatsappNumber}</p>
            </>
          ) : (
            <p>
              To buy model's phone number for N5,000{' '}
              <Button type='button' className='btn' onClick={paymentHandler}>
                Click Here
              </Button>
            </p>
          )}

          <Row>
            <Col md={6}>
              <h3>Reviews</h3>
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
                  <h3>Write a Review</h3>
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
