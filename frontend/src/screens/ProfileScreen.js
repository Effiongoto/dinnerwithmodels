import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { disableSub, getSubDetails } from "../actions/subscriptionActions";

const ProfileScreen = ({ location, history }) => {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSubscribed: "",
  });
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user: userDetail } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const subDetails = useSelector((state) => state.subDetails);
  const { sub } = subDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userDetail || !userDetail.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(userInfo._id));
      } else {
        setUser({
          name: userDetail.name,
          email: userDetail.email,
          isSubscribed: userDetail.isSubscribed,
          _id: userDetail._id,
        });
      }
    }
  }, [dispatch, history, userInfo, userDetail, success]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleCheck = (event) => {
    const { checked } = event.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        isSubscribed: {
          ...userDetail.isSubscribed,
          status: checked === true ? "active" : "inactive",
        },
      };
    });
    dispatch(getSubDetails(user.isSubscribed.subCode));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      if (user.isSubscribed.status === "inactive") {
        dispatch(
          disableSub(
            { code: sub.subCode, token: sub.emailToken },
            sub._id,
            user
          )
        );
      }
      dispatch(
        updateUserProfile({
          id: userDetail._id,
          name: user.name,
          email: user.email,
          password: user.password,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={12}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              placeholder="Enter name"
              value={user.name}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password Address</Form.Label>
            <Form.Control
              name="password"
              placeholder="Enter password"
              value={user.password}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              placeholder="Confirm password"
              value={user.confirmPassword}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          {userDetail.isSubscribed &&
            userDetail.isSubscribed.status === "active" && (
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Is Subscribed"
                  checked={
                    user.isSubscribed && user.isSubscribed.status === "active"
                      ? true
                      : false
                  }
                  name="isSubscribed"
                  onChange={handleCheck}
                  value={user.isSubscribed}
                ></Form.Check>
              </Form.Group>
            )}

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
