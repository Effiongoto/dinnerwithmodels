import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Model from '../components/Model';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listModels } from '../actions/modelActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const modelList = useSelector((state) => state.modelList);
  const { loading, error, models } = modelList;

  useEffect(() => {
    dispatch(listModels());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Models</h1>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            {models.map((model) => (
              <Col key={model._id} sm={12} md={6} lg={4} xl={3}>
                <Model model={model} />
              </Col>
            ))}
          </Row>
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
