import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/modelActions";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const RegisterScreen = ({ history }) => {
  const [message, setMessage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newModel, setNewModel] = useState({
    username: "",
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
    attestation1: "",
    attestation2: "",
    attestation3: "",
    attestation4: "",
  });

  const dispatch = useDispatch();

  const modelRegister = useSelector((state) => state.modelRegister);
  const { loading, error, modelInfo } = modelRegister;

  // const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if (modelInfo) {
      history.push("/register/model/3");
    }
  }, [history, modelInfo]);

  const handleChange = (evt) => {
    setNewModel({
      ...newModel,
      [evt.target.name]: evt.target.value,
    });
    console.log(newModel);
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
      setMessage("Passwords do not match");
    } else {
      dispatch(register(newModel));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up As Model</h1>
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <h2>Step 1: Personal details</h2>
        <Message variant="warning">
          Ensure you start with a capital letter on all text fields
        </Message>
        <Form.Row>
          <Form.Group as={Col} controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              value={newModel.username}
              name="username"
              onChange={handleChange}
            ></Form.Control>
            <Form.Text className="text-muted">
              Note: you won't be able to change your username in the future
            </Form.Text>
          </Form.Group>

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
            <Form.Text className="text-muted">Example: 03-03-1998</Form.Text>
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
              priorityOptions={["NGN"]}
              placeholder="Country"
              name="country"
              value={newModel.country}
              onChange={(val) => setNewModel({ ...newModel, country: val })}
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
              onChange={(val) => setNewModel({ ...newModel, state: val })}
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
            <Form.Control value={newModel.states_visited_often} readOnly />
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
            Are you open to have dinner dates with everyone; both male & females
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
            Please note, males are usually the ones who pay for anything with
            you while females are usually the ones who want you for free
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
            Number only! For example: if the minimum you'll accept is N5,000
            insert 5000
          </Form.Text>
        </Form.Group>

        <h3>Private Information</h3>
        <p>This would only be shared with people who can afford your time</p>

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
          <Form.Text className="text-muted">leave blank if none</Form.Text>
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

        <h3>Attestation</h3>
        <Form.Group controlId="attestation1">
          <Form.Label>
            As a model here, are you willing to have dinner dates and more with
            people who contact you from this platform?
          </Form.Label>
          <Form.Control
            as="select"
            name="attestation1"
            value={newModel.attestation1}
            onChange={handleChange}
          >
            <option>Choose...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="attestation2">
          <Form.Label>
            Are you giving us the permission to give your phone number to people
            who find your picture attractive where they can have dinner dates
            with you and more?
          </Form.Label>
          <Form.Control
            as="select"
            name="attestation2"
            value={newModel.attestation2}
            onChange={handleChange}
          >
            <option>Choose...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="attestation3">
          <Form.Label>
            Do you understand that it is your job to keep yourself safe by
            making a video call with someone who calls you to verify the person
            is real and meeting in an open place as well as telling close
            friends about your whereabout before going on a date?
          </Form.Label>
          <Form.Control
            as="select"
            name="attestation3"
            value={newModel.attestation3}
            onChange={handleChange}
          >
            <option>Choose...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="attestation4">
          <Form.Label>
            Do you understand that as a model here, you are not supposed to take
            things from people if they have not given them to you?
          </Form.Label>
          <Form.Control
            as="select"
            name="attestation4"
            value={newModel.attestation4}
            onChange={handleChange}
          >
            <option>Choose...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Control>
        </Form.Group>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account? <Link to={"/login/model"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
