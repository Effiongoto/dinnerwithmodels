import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  Button,
  ListGroup,
  Form,
  Carousel,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listModelDetails, createModelReview } from "../actions/modelActions";
import { MODEL_CREATE_REVIEW_RESET } from "../constants/modelConstants";

const ModelScreen = ({ match, history }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const modelDetails = useSelector((state) => state.modelDetails);
  const { loading, error, model } = modelDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const modelReviewCreate = useSelector((state) => state.modelReviewCreate);
  const {
    success: successModelReview,
    error: errorModelReview,
    message: successReviewMessage,
  } = modelReviewCreate;

  const [overlay, setOverlay] = useState({
    src: "",
    display: "none",
    status: false,
  });

  useEffect(() => {
    if (successModelReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: MODEL_CREATE_REVIEW_RESET });
    }
    dispatch(listModelDetails(match.params.id));
  }, [match, dispatch, successModelReview]);

  const subscriptionHandler = () => {
    history.push("/login?redirect=subscribe");
  };

  const paymentHandler = () => {
    history.push(`/login?redirect=pay/${model._id}`);
  };

  const overlayHandler = (value) => {
    console.log("clicked", value);
    setOverlay({ ...overlay, src: value, display: "block", status: true });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createModelReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      {overlay.status ? (
        <div
          id="overlay"
          onClick={() =>
            setOverlay({ src: "", status: false, display: "none" })
          }
          style={{
            textAlign: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            display: overlay.display,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Image
            src={overlay.src}
            alt={model.username}
            style={{
              // position: "fixed",
              // top: 0,
              // left: "50%",
              border: "3px solid black",
              margin: "5%",
              // width: "100%",
              height: "80%",
              // zIndex: 10,
              // display: overlay.display,
            }}
          />
        </div>
      ) : (
        <>
          <Link className="btn btn-dark my-3" to="/">
            Go Back
          </Link>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <h2>{model.username}</h2>
              <div className="avatar">
                <Image
                  src={model.profileImage}
                  alt={model.username}
                  fluid
                  // style={{
                  //   height: 100,
                  //   marginRight: 20,
                  //   marginBottom: 20,
                  //   marginLeft: 20,
                  //   borderRadius: "20%",
                  // }}
                />
              </div>
              {model.images && model.images.length !== 0 && (
                <Carousel interval={2000}>
                  {model.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        onClick={() => overlayHandler(image)}
                        src={image}
                        className="d-block w-100"
                        alt={`${model.username} image`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
              <h3 className="mt-3">About Me:</h3>
              <Rating
                value={model.rating}
                text={`from ${model.numReviews} reviews`}
                className="pb-1"
              />
              <p>
                <strong>
                  {model.username && model.username.toUpperCase()} is a{" "}
                  {model.gender} model from {model.city}, {model.state},{" "}
                  {model.country}
                </strong>
              </p>
              <p>
                <strong>Date of bith:</strong> {model.DOB}
              </p>
              <p>{model.about}</p>
              <p>
                <strong>States visited often:</strong>
                {model.states_visited_often &&
                  model.states_visited_often.join(", ")}
              </p>
              <p>
                <strong>Minimum cash gift:</strong> {model.minCashGift}
              </p>
              <p>
                Open to dates with {model.open_to_dinner_dates}{" "}
                {model.open_to_dinner_dates === "Both" ? <>sexes</> : <>only</>}
              </p>

              <h3>Nude Pictures:</h3>
              {userInfo &&
              userInfo.isSubscribed &&
              userInfo.isSubscribed.status === "active" ? (
                <Row
                  style={{
                    marginLeft: 20,
                  }}
                >
                  {model.privateImages &&
                    model.privateImages.map((img) => (
                      <Image
                        src={img}
                        alt={model.username}
                        fluid
                        style={{
                          height: "300px",
                          marginRight: 20,
                          marginBottom: 20,
                        }}
                      />
                    ))}
                </Row>
              ) : (
                <p>
                  to unlock all private pictures on website for N10,000 monthly{" "}
                  <Button
                    type="button"
                    className="btn"
                    onClick={subscriptionHandler}
                  >
                    Click Here
                  </Button>
                </p>
              )}

              <h3
                style={{
                  lineHeight: "0",
                }}
              >
                Contact Info
              </h3>
              {userInfo &&
              userInfo.modelsPaidFor.find((x) => x.name === model.username) ? (
                <>
                  <p>Phone Number: {model.phoneNumber1}</p>
                  {model.phoneNumber2 && (
                    <p>Other Number: {model.phoneNumber2}</p>
                  )}
                  <p>Whatsapp Number: {model.whatsappNumber}</p>
                </>
              ) : (
                <p
                  style={{
                    lineHeight: "1.5rem",
                  }}
                >
                  To buy model's phone number for N5,000{" "}
                  <Button
                    type="button"
                    className="btn"
                    onClick={paymentHandler}
                  >
                    Click Here
                  </Button>
                </p>
              )}

              <Row>
                <Col md={6}>
                  <h3>Reviews</h3>
                  {model.reviews.length === 0 && <Message>No Reviews</Message>}
                  <ListGroup variant="flush">
                    {model.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                      <h3>Write a Review</h3>
                      {errorModelReview && (
                        <Message variant="danger">{errorModelReview}</Message>
                      )}
                      {successReviewMessage && (
                        <Message variant="success">
                          {successReviewMessage}
                        </Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              row="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button type="submit" variant="primary">
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to write a
                          review{" "}
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ModelScreen;
