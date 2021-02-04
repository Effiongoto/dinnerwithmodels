import React, { useState } from "react";
import {} from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useDispatch } from "react-redux";

const PlanEditScreen = ({ match, history }) => {
  const planId = match.params.id;
  const [plan, setPlan] = useState({
    name: "",
    amount: "",
    interval: "",
    planCode: "", 
    currency: ""
  });

  const dispatch = useDispatch();
  return (
      <div>
          <h1>Hello</h1>
      </div>
  )
};

export default PlanEditScreen;
