import React, { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listModelDetails } from "../actions/modelActions";
import { userPay } from "../actions/userActions";
import { getPaystackKeys } from "../actions/paystackActions";

const PaymentScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const modelDetails = useSelector((state) => state.modelDetails);
  const { loading, error, model } = modelDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const paystackKey = useSelector((state) => state.paystackKey);
  const { keys } = paystackKey;

  // const UserPay = useSelector((state) => state.UserPay);
  // const { success: successPay } = UserPay;

  const userId = userInfo._id;
  const [pkey, setPkey] = useState(null);

  const config = {
    reference: new Date().getTime(),
    email: userInfo.email,
    amount: 500000,
    publicKey: pkey,
  };

  const onSuccess = (reference) => {
    // add model.username to users array
    dispatch(userPay(userId, model.username, reference));
    alert("Payment Successful");
    history.push(`/model/${model._id}`);
  };

  const onClose = () => {
    alert("Payment Unsuccessful");
  };

  const componentProps = {
    ...config,
    text: "Pay Now",
    onSuccess: (reference) => onSuccess(reference),
    onClose: onClose,
  };

  useEffect(() => {
    dispatch(listModelDetails(match.params.id));
    if (!keys) {
      dispatch(getPaystackKeys());
    }
    if (keys) {
      setPkey(keys.publicKey);
    }
  }, [match, dispatch, keys]);

  return (
    <FormContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h3>Payment for {model.username}'s private information</h3>
          <PaystackButton
            {...componentProps}
            className="btn btn-success my-2 d-flex justify-content-center"
          />
          {/* <Message className='my-2'>
            Please make sure you fill in the same Email Address used to sign up
            and the model you want acces to
          </Message> */}
          {/* {successPay && (
            <link to={`/model/${model._id}`}>
              Go back to {model.username}'s profile
            </link>
          )} */}
        </>
      )}
    </FormContainer>
  );
};

export default PaymentScreen;
