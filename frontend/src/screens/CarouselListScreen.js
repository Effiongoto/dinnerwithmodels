import React, { useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCarousel, listCarousels } from "../actions/carouselActions";

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
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCarousel(id));
    }
  };

  return (
    <>
      <h1>Carousels</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {carousels.map((item, index) => (
            <Card key={index}>
              <Link to={`/admin/carousels/${item._id}`}>
                <Card.Img src={item.image} variant="top" />
              </Link>
              <Card.Body>
                <Card.Title as="div">
                  <Link to={`/admin/carousels/${item._id}`}>
                    <strong>
                      <h4>{item.name}</h4>
                    </strong>
                  </Link>
                </Card.Title>

                <Card.Text as="div">
                  <p>{item.text}</p>
                </Card.Text>
              </Card.Body>
              <Link to={`/admin/carousel/${item._id}/edit`}>
                <Button variant="light" className="btn-sm">
                  <i className="fas fa-edit"></i>
                </Button>
              </Link>
              <Button
                variant="danger"
                className="btn-sm"
                onClick={() => deleteHandler(item._id)}
              >
                <i className="fas fa-trash"></i>
              </Button>
            </Card>
          ))}
        </>
      )}
      <Link to={`/admin/carousel/add`}>
        <Button variant="dark" className="btn-sm">
          Create a new Carousel
        </Button>
      </Link>
    </>
  );
};

export default CarouselListScreen;
