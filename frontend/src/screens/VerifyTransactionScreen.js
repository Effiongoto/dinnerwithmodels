import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Container, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { verifyTransaction } from "../actions/paymentActions";

const VerifyTransactionScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [referenceNumber, setReferenceNumber] = useState("");

  const verifyDetails = useSelector((state) => state.verifyTransaction);
  const { loading, error, details } = verifyDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleChange = (event) => {
    const { value } = event.target;
    setReferenceNumber(value);
  };

  const verify = (e) => {
    dispatch(verifyTransaction(referenceNumber));
    e.preventDefault();
  };

  if (!userInfo || !userInfo.isAdmin) {
    history.push("/login");
  }

  return (
    <Container>
      {details ? (
        <>
          <h1>Transaction Details</h1>
          <p><strong>Amount:</strong> {details.currency} {details.amount/100}</p>
          <p><strong>Date:</strong> {details.transaction_date}</p>
          <p><strong>Reference Number:</strong> {details.reference}</p>
          <p><strong>Customer Email:</strong> {details.customer.email}</p>
        </>
      ) : (
        <>
          <h2>Verify a Transaction</h2>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form>
            <Form.Group>
              <Form.Label>Transaction Reference Number</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="ref"
                type="text"
                placeholder="n2qd5mvtxfd1gtc"
                value={referenceNumber}
              />
            </Form.Group>
            <Button className="btn-md btn-dark" onClick={verify}>
              Verify
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default VerifyTransactionScreen;
