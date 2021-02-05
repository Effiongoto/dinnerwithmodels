import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
// import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { userSubscribe } from "../actions/userActions";
import { listPlans } from "../actions/paymentActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PaystackButton } from "react-paystack";

const SubscriptionScreen = ({history}) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const modelDetails = useSelector((state) => state.modelDetails);
  const { loading, error, model } = modelDetails;

  const planList = useSelector((state) => state.planList);
  const { plans } = planList;

  const [selectedPlan, setPlan] = useState({});

  const config = {
    reference: new Date().getTime(),
    email: userInfo.email,
    amount: selectedPlan && selectedPlan.amount,
    // plan: selectedPlan && selectedPlan.planCode,
    publicKey: 'pk_test_7250bd18e57430aaebba6f3b2a370286dabf0656',
  };

  const onSuccess = (reference) => {
    dispatch(userSubscribe(config.email, selectedPlan.planCode, reference));
    history.push(`/`);
  };

  const onClose = () => {
    alert("Subscription Unsuccessful");
  };

  const componentProps = {
    ...config,
    text: `Subscribe`,
    onSuccess: (reference) => onSuccess(reference),
    onClose: onClose
  }

  useEffect(() => {
    if (!plans || plans.length === 0) {
      dispatch(listPlans());
    }
  }, [dispatch, plans]);

  const handleChange = (event) => {
    const { value } = event.target;
    const [choice] = plans.filter((plan) => plan.planCode === value);
    setPlan(choice);
  };

  // const submitHandler = (e) => {
  //   dispatch(userSubscribe(config));
  //   e.preventDefault();
  // };

  return (
    <div>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        {/* <h3>
          Subscription for access to all models private pictures and videos
        </h3>
        <a
          href="https://paystack.com/pay/hyu87qs93x"
          className="btn btn-success my-2 d-flex justify-content-center"
          role="button"
        >
          Pay Now
        </a>
        <Message className="my-2">
          Please make sure you fill in the same Email Address used to sign up
        </Message> */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
          <Form>
          <Form.Group>
            <Form.Label>Choose a plan</Form.Label>
            <Form.Control
              as="select"
              name="plan"
              value={selectedPlan}
              onChange={handleChange}
            >
              <option value="">Select Plan ...</option>
              {plans &&
                plans.map((plan) => {
                  return (
                    <option key={plan._id} value={plan.planCode}>
                      {plan.name}
                    </option>
                  );
                })}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Plan Amount</Form.Label>
            <Form.Control value={config.amount}></Form.Control>
          </Form.Group>

          {/* <Button type="submit" variant="primary" onClick={submitHandler}>
            Subscribe
          </Button> */}
        </Form>
        <PaystackButton 
          {...componentProps}
          className="btn btn-success my-2 d-flex justify-content-center"
        />
        </div>
        )}
      </FormContainer>
    </div>
  );
};

export default SubscriptionScreen;
