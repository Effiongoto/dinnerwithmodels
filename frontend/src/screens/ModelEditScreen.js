import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listModelDetails, updateModel } from '../actions/modelActions';
import {
  MODEL_UPDATE_RESET,
  MODEL_DETAILS_RESET,
} from '../constants/modelConstants';

const ModelEditScreen = ({ match, history }) => {
  const modelID = match.params.id;

  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const dispatch = useDispatch();

  const modelDetails = useSelector((state) => state.modelDetails);
  const { loading, error, model } = modelDetails;

  const modelUpdate = useSelector((state) => state.modelUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = modelUpdate;

  //   if (successUpdate) {
  //     dispatch({ type: MODEL_UPDATE_RESET });
  //     dispatch({ type: MODEL_DETAILS_RESET });
  //     history.push('/admin/modellist');
  //   } else {
  //     if (!model.name || model._id !== modelID) {
  //       dispatch(listModelDetails(modelID));
  //     } else {
  //       setUsername(model.username);
  //       setEmail(model.email);
  //       setIsVerified(model.isVerified);
  //     }
  //   }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: MODEL_UPDATE_RESET });
      dispatch({ type: MODEL_DETAILS_RESET });
      history.push('/admin/modellist');
    } else {
      dispatch(listModelDetails(match.params.id));
      if (model.username) {
        setEmail(model.email);
        setIsVerified(model.isVerified);
      }
    }
  }, [
    match,
    model.username,
    model.email,
    model.isVerified,
    dispatch,
    history,
    successUpdate,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateModel({
        _id: modelID,
        email,
        isVerified,
      })
    );
  };

  return (
    <>
      <Link to='/admin/modellist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Model</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {/* <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isVerified'>
              <Form.Check
                type='checkbox'
                label='Is Verified'
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ModelEditScreen;
