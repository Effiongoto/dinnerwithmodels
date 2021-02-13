import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getModelDetails, updateModelProfile } from "../actions/modelActions";
import { MODEL_UPDATE_PROFILE_RESET } from "../constants/modelConstants";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const ModelEditProfileScreen = ({ history }) => {
  const [message, setMessage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const modelDetails = useSelector((state) => state.modelDetails);
  const { loading, error, model } = modelDetails;

  const modelLogin = useSelector((state) => state.modelLogin);
  const { modelInfo } = modelLogin;

  const modelUpdateProfile = useSelector((state) => state.modelUpdateProfile);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = modelUpdateProfile;

  const [newModel, setNewModel] = useState({
    id: modelInfo._id,
    email: "",
    password: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    states_visited_often: "",
    open_to_dinner_dates: "",
    DOB: "",
    about: "",
    minCashGift: "",
    phoneNumber1: "",
    phoneNumber2: "",
    whatsappNumber: "",
  });

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: MODEL_UPDATE_PROFILE_RESET });
      history.push("/profile/model");
    } else {
      if (!modelInfo) {
        history.push("/login/model");
      } else {
        if (!model || !model.username) {
          // dispatch({ type: MODEL_UPDATE_PROFILE_RESET });
          dispatch(getModelDetails("profile"));
        } else {
          setNewModel({
            ...newModel,
            id: modelInfo._id,
            email: model.email,
            gender: model.gender,
            country: model.country,
            state: model.state,
            city: model.city,
            states_visited_often: model.states_visited_often,
            open_to_dinner_dates: model.open_to_dinner_dates,
            DOB: model.DOB,
            about: model.about,
            minCashGift: model.minCashGift,
            phoneNumber1: model.phoneNumber1,
            phoneNumber2: model.phoneNumber2,
            whatsappNumber: model.whatsappNumber,
          });
        }
      }
    }
  }, [dispatch, history, modelInfo, model, successUpdate]);

  const handleChange = (evt) => {
    setNewModel({
      ...newModel,
      [evt.target.name]: evt.target.value,
    });
  };

  const addToStatesVisited = (state) => {
    setNewModel({
      ...newModel,
      states_visited_often: [
        ...new Set([...newModel.states_visited_often, state]),
      ],
    });
  };

  const removeFromStatesVisited = (state) => {
    setNewModel({
      ...newModel,
      states_visited_often: [
        ...new Set([...newModel.states_visited_often, state]),
      ].filter((value) => value !== state),
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (newModel.password !== confirmPassword) {
      console.log(newModel.passsword, confirmPassword);
      setMessage("Passwords do not match");
    } else {
      dispatch(updateModelProfile(newModel));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link className="btn btn-success my-3" to="/profile/model/image">
            Edit Profile Images
          </Link>
          <FormContainer>
            <h1>Update Profile</h1>
            <Form onSubmit={submitHandler}>
              <Message variant="warning">
                Ensure you start with a capital letter on all text fileds
              </Message>
              <Form.Row>
                {/* <Form.Group as={Col} controlId='username'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='username'
                    placeholder='Enter username'
                    value={newModel.username}
                    name='username'
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Text className='text-muted'>
                    Note: you won't be able to change your username in the
                    future
                  </Form.Text>
                </Form.Group> */}

                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={newModel.email}
                    name="email"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={newModel.password}
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="6" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    value={newModel.gender}
                    name="gender"
                    onChange={handleChange}
                  >
                    <option>Choose...</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="DOB">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="xx-xx-xxxx"
                    name="DOB"
                    value={newModel.DOB}
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Text className="text-muted">
                    Example: 03-03-1998
                  </Form.Text>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="about">
                <Form.Label>About you </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Likes, dislikes, work/school, etc"
                  name="about"
                  value={newModel.about}
                  onChange={handleChange}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} md="4" controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as={CountryDropdown}
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={newModel.country}
                    onChange={(val) =>
                      setNewModel({ ...newModel, country: val })
                    }
                  />
                  <Form.Text className="text-muted">Example: Nigeria</Form.Text>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as={RegionDropdown}
                    country={newModel.country}
                    type="text"
                    defaultOptionLabel={"Select state"}
                    placeholder="State"
                    name="state"
                    value={newModel.state}
                    onChange={(val) => setNewModel({ ...model, state: val })}
                  />
                  <Form.Text className="text-muted">Example: Lagos</Form.Text>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    value={newModel.city}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">Example: Ikeja</Form.Text>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>States visited often</Form.Label>
                  <Form.Control
                    as={RegionDropdown}
                    country={newModel.country}
                    type="text"
                    defaultOptionLabel={"Add a State"}
                    placeholder="States visited often"
                    name="states_visited_often"
                    onChange={(state) => addToStatesVisited(state)}
                  />
                  <Form.Text className="text-muted">Example: Abuja</Form.Text>
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>Selected States</Form.Label>
                  <Form.Control
                    value={newModel.states_visited_often}
                    readOnly
                  />
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>States visited often</Form.Label>
                  <Form.Control
                    as={RegionDropdown}
                    country={newModel.country}
                    type="text"
                    defaultOptionLabel={"Remove a State"}
                    placeholder="States visited often"
                    name="states_visited_often"
                    onChange={(state) => removeFromStatesVisited(state)}
                  />
                  <Form.Text className="text-muted">
                    Example: {newModel.states_visited_often[0]}
                  </Form.Text>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="open_to_dinner_dates">
                <Form.Label>
                  Are you open to have dinner dates with everyone; both male &
                  females
                </Form.Label>
                <Form.Control
                  as="select"
                  name="open_to_dinner_dates"
                  value={newModel.open_to_dinner_dates}
                  onChange={handleChange}
                >
                  <option>Choose...</option>
                  <option value="Both">Both</option>
                  <option value="Male">Male only</option>
                  <option value="Female">Female only</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  Please note, males are usually the ones who pay for anything
                  with you while females are usually the ones who want you for
                  free
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="minCashGift">
                <Form.Label>
                  As a model here, you can only accept cash gifts above what?
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Minimum cash gift"
                  name="minCashGift"
                  value={newModel.minCashGift}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  Number only! For example: if the minimum you'll accept is
                  N5,000 insert 5000
                </Form.Text>
              </Form.Group>

              <h3>Private Information</h3>
              <p>
                This would only be shared with people who can afford your time
              </p>

              <Form.Group controlId="phoneNumber1">
                <Form.Label>Phone number 1</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="phoneNumber1"
                  name="phoneNumber1"
                  value={newModel.phoneNumber1}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="phoneNumber2">
                <Form.Label>Phone number 2</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="phoneNumber2"
                  name="phoneNumber2"
                  value={newModel.phoneNumber2}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  leave blank if none
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="whatsappNumber">
                <Form.Label>Whatsapp number </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="whatsappNumber"
                  name="whatsappNumber"
                  value={newModel.whatsappNumber}
                  onChange={handleChange}
                />
              </Form.Group>

              {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
              {loadingUpdate && <Loader />}
              {message && <Message variant="danger">{message}</Message>}

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default ModelEditProfileScreen;
