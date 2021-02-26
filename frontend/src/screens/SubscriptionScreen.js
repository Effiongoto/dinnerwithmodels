import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { listPlans } from "../actions/paymentActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PaystackButton } from "react-paystack";
import { createSub } from "../actions/subscriptionActions";
import { getPaystackKeys } from "../actions/paystackActions";

const SubscriptionScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const planList = useSelector((state) => state.planList);
  const { plans } = planList;

  const paystackKey = useSelector((state) => state.paystackKey);
  const { keys } = paystackKey;

  const [selectedPlan, setPlan] = useState({});
  const [pkey, setPkey] = useState(null);

  const config = {
    reference: new Date().getTime(),
    email: userInfo.email,
    amount: selectedPlan && selectedPlan.amount,
    publicKey: pkey,
  };

  const onSuccess = (reference) => {
    dispatch(
      createSub(
        { customer: config.email, plan: selectedPlan.planCode },
        userInfo,
        reference
      )
    );
    history.push(`/`);
  };

  const onClose = () => {
    alert("Subscription Unsuccessful");
  };

  const componentProps = {
    ...config,
    text: `Subscribe`,
    onSuccess: (reference) => onSuccess(reference),
    onClose: onClose,
  };

  useEffect(() => {
    if (!plans || plans.length === 0) {
      dispatch(listPlans());
    }
    if (!keys) {
      dispatch(getPaystackKeys());
    }
    if (keys) {
      setPkey(keys.publicKey);
    }
  }, [dispatch, plans, keys]);

  const handleChange = (event) => {
    const { value } = event.target;
    const [choice] = plans.filter((plan) => plan.planCode === value);
    setPlan(choice);
  };

  return (
    <div>
      <Link to="/admin/userlist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <Form>
              <Form.Group>
                <Form.Label>Choose a plan</Form.Label>
                <Form.Control as="select" name="plan" onChange={handleChange}>
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
                <Form.Control
                  value={selectedPlan.amount / 100}
                  readOnly
                ></Form.Control>
              </Form.Group>
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
