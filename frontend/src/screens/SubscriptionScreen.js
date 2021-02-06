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

const SubscriptionScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  const planList = useSelector((state) => state.planList);
  const { plans } = planList;

  const [selectedPlan, setPlan] = useState({});

  const config = {
    reference: new Date().getTime(),
    email: userInfo.email,
    amount: selectedPlan && selectedPlan.amount,
    publicKey: "pk_test_7250bd18e57430aaebba6f3b2a370286dabf0656",
  };

  const onSuccess = (reference) => {
    dispatch(createSub({customer: config.email, plan: selectedPlan.planCode}, userInfo, reference));
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
  }, [dispatch, plans]);

  const handleChange = (event) => {
    const { value } = event.target;
    const [choice] = plans.filter((plan) => plan.planCode === value);
    setPlan(choice);
  };

  return (
    <div>
      <Link to="/admin/userlist" className="btn btn-light my-3">
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
                <Form.Control value={config.amount/100}></Form.Control>
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
