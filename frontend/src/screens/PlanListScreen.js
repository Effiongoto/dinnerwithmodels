import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { deletePlan, listPlans } from "../actions/paymentActions";

const PlanListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const planList = useSelector((state) => state.planList);
  const { loading, error, plans } = planList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listPlans());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePlan(id));
    }
  };

  return (
    <div>
      <h1>Plans</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>AMOUNT</th>
              <th>INTERVAL</th>
              <th>PLAN CODE</th>
              <th>CURRENCY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan._id}>
                <td>{plan._id}</td>
                <td>{plan.name}</td>
                <td>{plan.amount}</td>
                <td>{plan.interval}</td>
                <td>{plan.planCode}</td>
                <td>{plan.currency}</td>
                <td>
                  <LinkContainer to={`/admin/plans/${plan._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(plan._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <LinkContainer to={`/admin/plans/add`}>
        <Button variant="dark" className="btn-sm">
          Create a new Plan
        </Button>
      </LinkContainer>
    </div>
  );
};

export default PlanListScreen;
