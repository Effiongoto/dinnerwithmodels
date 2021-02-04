import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPlan } from "../actions/paymentActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AddPlanScreen = ({ history }) => {
  const [plan, setPlan] = useState({
    name: "",
    amount: "",
    interval: "",
  });
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error} = userDetails;
//   const {
//     userLogin: { userInfo },
//   } = useSelector((state) => state.userLogin);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlan((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const addPlan = (e) => {
    dispatch(createPlan(plan));
    history.push("/admin/plans");
    e.preventDefault();
  };

  return (
    <Container>
      <h2>Create Plan</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Enter Plan Name"
            value={plan.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="amount"
            type="number"
            placeholder="Enter Plan Amount"
            value={plan.amount}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Interval</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="interval"
            as="select"
            value={plan.interval}
          >
            <option value="">pick the plan interval ...</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="biannually">Bi-Annually</option>
            <option value="annually">Annually</option>
          </Form.Control>
        </Form.Group>
        <Button className="btn-md btn-dark" onClick={addPlan}>
          Create Plan
        </Button>
      </Form>
    </Container>
  );
};

export default AddPlanScreen;
