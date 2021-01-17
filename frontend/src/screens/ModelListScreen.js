import React, { useEffect } from 'react';
import Paginate from '../components/Paginate';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listModels, deleteModel } from '../actions/modelActions';

const ModelListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const modelList = useSelector((state) => state.modelList);
  const { loading, error, models, page, pages } = modelList;

  const modelDelete = useSelector((state) => state.modelDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = modelDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listModels('', '', '', pageNumber));
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteModel(id));
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Models</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>GENDER</th>
                <th>STATE</th>
                <th>VERIFIED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model._id}>
                  <td>
                    <Link to={`/admin/model/${model._id}`}>{model._id}</Link>
                  </td>
                  <td>{model.username}</td>
                  <td>{model.gender}</td>
                  <td>{model.state}</td>
                  <td>
                    {model.isVerified ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/model/${model._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(model._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ModelListScreen;
