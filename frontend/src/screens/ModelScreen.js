import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listModelDetails } from '../actions/modelActions';

const ModelScreen = ({ match }) => {
  const dispatch = useDispatch();

  const modelDetails = useSelector((state) => state.modelDetails);
  const { loading, error, model } = modelDetails;

  useEffect(() => {
    dispatch(listModelDetails(match.params.id));
  }, [match, dispatch]);

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
            <strong>
              <Link to='/login'>Click here</Link>{' '}
            </strong>
            to unlock allprivate pictures on website for N10,000 monthly
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
            <strong>
              <Link to='/login'>Click here</Link>{' '}
            </strong>
            to buy model's phone number for N5,000
          </p>
        </>
      )}
    </>
  );
};

export default ModelScreen;
