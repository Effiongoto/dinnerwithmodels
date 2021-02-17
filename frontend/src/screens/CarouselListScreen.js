import React, { useEffect } from 'react';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { Image, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCarousel, listCarousels } from '../actions/carouselActions';

const CarouselListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const carouselList = useSelector((state) => state.carouselList);
  const { loading, error, carousels } = carouselList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCarousels());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteCarousel(id));
    }
  };

  return (
    <>
      <h1>Carousels</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>TEXT</th>
              <th>IMAGE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carousels.map((carousel) => (
              <tr key={carousel._id}>
                <td>{carousel._id}</td>
                <td>{carousel.name}</td>
                <td>{carousel.text}</td>
                <td>
                  <Image
                    src={carousel.image}
                    alt={carousel.name}
                    fluid
                    style={{
                      height: '50px',
                      width: '50px',
                    }}
                  />
                </td>
                <td>
                  <LinkContainer to={`/admin/carousels/${carousel._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(carousel._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Link to={`/admin/carousel/add`}>
        <Button variant='dark' className='btn-sm'>
          Create a new Carousel
        </Button>
      </Link>
    </>
  );
};

export default CarouselListScreen;
