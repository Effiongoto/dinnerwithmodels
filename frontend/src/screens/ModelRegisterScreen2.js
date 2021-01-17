import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { updateModelProfile } from '../actions/modelActions';

const RegisterScreen2 = ({ history }) => {
  const modelLogin = useSelector((state) => state.modelLogin);
  const { modelInfo } = modelLogin;

  const modelUpdateProfile = useSelector((state) => state.modelUpdateProfile);
  const { loading, success, error } = modelUpdateProfile;

  const [attestation, setAttestation] = useState({
    id: modelInfo._id,
    attestation1: '',
    attestation2: '',
    attestation3: '',
    attestation4: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      history.push('/register/model/3');
    }
  }, [history, success]);

  const handleChange = (evt) => {
    setAttestation({
      ...attestation,
      [evt.target.name]: evt.target.value,
    });
    console.log(attestation);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateModelProfile(attestation));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Step 2: Attestation</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='attestation1'>
              <Form.Label>
                As a model here, are you willing to have dinner dates and more
                with people who contact you from this platform?
              </Form.Label>
              <Form.Control
                as='select'
                name='attestation1'
                value={attestation.attestation1}
                onChange={handleChange}
              >
                <option>Choose...</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='attestation2'>
              <Form.Label>
                Are you giving us the permission to give your phone number to
                people who find your picture attractive where they can have
                dinner dates with you and more?
              </Form.Label>
              <Form.Control
                as='select'
                name='attestation2'
                value={attestation.attestation2}
                onChange={handleChange}
              >
                <option>Choose...</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='attestation3'>
              <Form.Label>
                Do you understand that it is your job to keep yourself safe by
                making a video call with someone who calls you to verify the
                person is real and meeting in an open place as well as telling
                close friends about your whereabout before going on a date?
              </Form.Label>
              <Form.Control
                as='select'
                name='attestation3'
                value={attestation.attestation3}
                onChange={handleChange}
              >
                <option>Choose...</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='attestation4'>
              <Form.Label>
                Do you understand that as a model here, you are not supposed to
                take things from people if they have not given them to you?
              </Form.Label>
              <Form.Control
                as='select'
                name='attestation4'
                value={attestation.attestation4}
                onChange={handleChange}
              >
                <option>Choose...</option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default RegisterScreen2;
