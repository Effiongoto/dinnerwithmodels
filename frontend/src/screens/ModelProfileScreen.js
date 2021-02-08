import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getModelDetails } from '../actions/modelActions';

const ModelProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const modelDetails = useSelector((state) => state.modelDetails);
  const { loading, error, model } = modelDetails;
  //   const id = model._id;

  const modelLogin = useSelector((state) => state.modelLogin);
  const { modelInfo } = modelLogin;

  useEffect(() => {
    if (!modelInfo) {
      history.push('/login/model');
    } else {
      if (!model || !model.username) {
        // dispatch({ type: MODEL_UPDATE_PROFILE_RESET });
        dispatch(getModelDetails('profile'));
      }
    }
  }, [dispatch, history, modelInfo, model]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h1>Model Profile</h1>
          <Link
            className='btn btn-success my-3 ml-auto'
            to='/profile/model/edit'
          >
            Edit Profile
          </Link>
          <h2>{model.username}</h2>
          {model.isVerified ? (
            <Message>Profile is verified</Message>
          ) : (
            <>
              <Message variant='danger'>Profile is not verified</Message>
              <p>
                Wait 3 days for profile to be verified. After 3 days, reach out
                to the admin for guidance.
              </p>
            </>
          )}
          <h3>About Me</h3>
          <p>{model.about}</p>
          <p>Date of birth:{model.DOB}</p>
          <p>
            <strong>Location: </strong>
            {model.city}, {model.state}, {model.country}{' '}
          </p>
          <p>Gender: {model.gender}</p>
          <p>States visited often: {model.states_visited_often}</p>
          <p>Minimum cash gift:{model.minCashGift}</p>
          <p>
            Open to dates with {model.open_to_dinner_dates}{' '}
            {model.open_to_dinner_dates === 'Both' ? (
              <span>sexes</span>
            ) : (
              <span>only</span>
            )}
          </p>
          <h3>Private Info</h3>
          <p>Email: {model.email}</p>
          <p>Phone Number: {model.phoneNumber1}</p>
          {model.phoneNumber2 && <p>Other Number: {model.phoneNumber2}</p>}
          <p>Whatsapp Number: {model.whatsappNumber}</p>
          <h3>Profile picture:</h3>
          <Image
            src={model.profileImage}
            alt={model.name}
            fluid
            style={{ height: '300px', marginRight: 20, marginBottom: 20 }}
          />
          <h3>Other pictures:</h3>
          <Row>
            {model.images &&
              model.images.map((img) => (
                <Col md={3}>
                  <Image
                    src={img}
                    alt={model.name}
                    fluid
                    style={{
                      height: '300px',
                      marginRight: 20,
                      marginBottom: 20,
                    }}
                  />
                </Col>
              ))}
          </Row>
          <h3>Nude pictures:</h3>
          <Row>
            {model.privateImages &&
              model.privateImages.map((img) => (
                <Col md={3}>
                  <Image
                    src={img}
                    alt={model.name}
                    fluid
                    style={{
                      height: '300px',
                      marginRight: 20,
                      marginBottom: 20,
                    }}
                  />
                </Col>
              ))}
          </Row>
          <h3>Verification picture:</h3>
          <Image
            src={model.verificationImage}
            alt={model.name}
            fluid
            style={{ height: '300px', marginRight: 20, marginBottom: 20 }}
          />

          <h3>Reviews</h3>
          {model.reviews && model.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
            {model.reviews && model.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </>
  );
};

export default ModelProfileScreen;
