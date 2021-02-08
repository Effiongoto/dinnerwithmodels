import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import {
  USER_UPDATE_RESET,
  USER_DETAILS_RESET,
} from "../constants/userConstants";
import { listAllModels } from "../actions/modelActions";
import { disableSub, getSubDetails } from "../actions/subscriptionActions";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    modelsPaidFor: [],
    isSubscribed: "",
    isAdmin: "",
  });

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user: userDetail } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const modelAll = useSelector((state) => state.modelAll);
  const { models } = modelAll;

  const subDetails = useSelector((state) => state.subDetails);
  const { sub } = subDetails;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });
      history.push("/admin/userlist");
    } else {
      if (!userDetail.name || userDetail._id !== userId) {
        dispatch(getUserDetails(userId));
        dispatch(listAllModels());
      } else {
        setUser({ ...userDetail });
      }
    }
  }, [dispatch, history, userId, userDetail, successUpdate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };
  const handleCheck = (event) => {
    const { name, checked } = event.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: checked,
        isSubscribed: {
          ...userDetail.isSubscribed,
          status:
            name !== "isSubscribed"
              ? user.isSubscribed.status
              : name === "isSubscribed" && checked === true
              ? "active"
              : "inactive",
        },
      };
    });
    dispatch(getSubDetails(user.isSubscribed.subCode));
  };
  const addToModelArray = (event) => {
    const { name, value } = event.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: [...new Set([...prevValue.modelsPaidFor, value])],
      };
    });
  };

  const removeFromModelArray = (event) => {
    const { name, value } = event.target;
    setUser((prevValue) => {
      return {
        ...prevValue,
        [name]: [...new Set([...prevValue.modelsPaidFor, value])].filter(
          (el) => el !== value
        ),
      };
    });
  };

  const submitHandler = (e) => {
    if (user.isSubscribed.status === "active") {
      dispatch(updateUser(user));
    } else if (user.isSubscribed.status === "inactive") {
      dispatch(
        disableSub({ code: sub.subCode, token: sub.emailToken }, sub._id, user)
      );
    }
    e.preventDefault();
  };

  return (
    <div>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={user.name}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={user.email}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={user.password}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Add to Models Paid For</Form.Label>
                <Form.Control
                  as="select"
                  name="modelsPaidFor"
                  value={user.modelsPaidFor}
                  onChange={addToModelArray}
                >
                  <option value="">Select Models ...</option>
                  {models &&
                    models
                      .filter(
                        (model) => !user.modelsPaidFor.includes(model.username)
                      )
                      .map((model) => {
                        return (
                          <option key={model._id} value={model.name}>
                            {model.username}
                          </option>
                        );
                      })}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Remove from Models Paid For</Form.Label>
                <Form.Control
                  as="select"
                  name="modelsPaidFor"
                  value={user.modelsPaidFor}
                  onChange={removeFromModelArray}
                >
                  <option value="">Select Models Paid For ...</option>
                  {models &&
                    models
                      .filter((model) =>
                        user.modelsPaidFor.includes(model.username)
                      )
                      .map((model) => {
                        return (
                          <option key={model._id} value={model.name}>
                            {model.username}
                          </option>
                        );
                      })}
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Models Paid For</Form.Label>
              <Form.Control value={user.modelsPaidFor} readOnly></Form.Control>
            </Form.Group>

            {user.isSubscribed && user.isSubscribed.status === "active" && (
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

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={user.isAdmin}
                name="isAdmin"
                onChange={handleCheck}
                value={user.isAdmin}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" onClick={submitHandler}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
