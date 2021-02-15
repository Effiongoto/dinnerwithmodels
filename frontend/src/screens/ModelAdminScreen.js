import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Image, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listModelDetails } from '../actions/modelActions';

const ModelAdminScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const modelDetails = useSelector((state) => state.modelDetails);
  const { loading, error, model } = modelDetails;
  //   const id = model._id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login/model');
    } else {
      if (!model || !model.username || model._id !== match.params.id) {
        // dispatch({ type: MODEL_UPDATE_PROFILE_RESET });
        dispatch(listModelDetails(match.params.id));
      }
    }
  }, [dispatch, history, userInfo.isAdmin, model, match.params.id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Link className='btn btn-light my-3' to='/admin/modellist'>
            Go Back
          </Link>
          <h1>Model Profile</h1>
          <Link
            className='btn btn-success my-3 ml-auto'
            to={`/admin/model/${model._id}/edit`}
          >
            Edit Profile
          </Link>
          <h2>{model.username}</h2>
          {model.isVerified ? (
            <Message>Profile is verified</Message>
          ) : (
            <>
              <Message variant='danger'>Profile is not verified</Message>
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
            style={{ height: '300px' }}
          />
          <h3>Other pictures:</h3>
          <Row>
            {model.images &&
              model.images.map((img) => (
                <Image
                  src={img}
                  alt={model.name}
                  fluid
                  style={{ height: '300px', marginRight: 20, marginBottom: 20 }}
                />
              ))}
          </Row>
          <h3>Nude pictures:</h3>
          <Row>
            {model.privateImages &&
              model.privateImages.map((img) => (
                <Image
                  src={img}
                  alt={model.name}
                  fluid
                  style={{ height: '300px', marginRight: 20, marginBottom: 20 }}
                />
              ))}
          </Row>
          <h3>Verification picture:</h3>
          <Image
            src={model.verificationImage}
            alt={model.name}
            fluid
            style={{ height: '300px' }}
          />

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
          </ListGroup>
          <h3>Attestation answers</h3>
          <p>
            As a model here, are you willing to have dinner dates and more with
            people who contact you from this platform?<br></br>
            Answer: {model.attestation1}
          </p>
          <p>
            Are you giving us the permission to give your phone number to people
            who find your picture attractive where they can have dinner dates
            with you and more? <br></br>
            Answer: {model.attestation2}
          </p>
          <p>
            Do you understand that it is your job to keep yourself safe by
            making a video call with someone who calls you to verify the person
            is real and meeting in an open place as well as telling close
            friends about your whereabout before going on a date? <br></br>
            Answer: {model.attestation3}
          </p>
          <p>
            Do you understand that as a model here, you are not supposed to take
            things from people if they have not given them to you? <br></br>
            Answer: {model.attestation4}
          </p>
        </>
      )}
    </>
  );
};

export default ModelAdminScreen;
