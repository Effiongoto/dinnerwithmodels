import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { getPlanDetails, updatePlan } from "../actions/paymentActions";

const PlanEditScreen = ({ match, history }) => {
  const planId = match.params.id;
  const [plan, setPlan] = useState({
    name: "",
    amount: "",
    interval: "",
    planCode: "",
    currency: "",
  });

  const dispatch = useDispatch();

  const planDetails = useSelector((state) => state.planDetails);
  const { loading, error, plan: planDetail } = planDetails;

  const planUpdate = useSelector((state) => state.planUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = planUpdate;

  useEffect(() => {
      if (successUpdate) {
          history.push("/admin/plans");
      } else {
          if (!planDetail.name || planDetail._id !== planId) {
              dispatch(getPlanDetails(planId));
          } else {
              setPlan(planDetail);
          }
      }
  }, [dispatch, history, planId, successUpdate, planDetail]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlan((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const submitHandler = (e) => {
    dispatch(updatePlan(plan));
    e.preventDefault();
  };

  return (
    <div>
      <Link to="/admin/plans" className="btn btn-light">
          Go Back
      </Link>
      <FormContainer>
          <h1>Edit Plan</h1>
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
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Enter Plan Name"
            value={plan.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount(Amount should be in kobo if currency is NGN and pesewas for
            GHS)</Form.Label>
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
            type="text"
            placeholder="Enter Plan Name"
            value={plan.interval}
            readOnly
          />
        </Form.Group>
        <Button className="btn-md btn-dark" onClick={submitHandler}>
          Update Plan
        </Button>
      </Form>
          )}
      </FormContainer>
    </div>
  );
};

export default PlanEditScreen;
