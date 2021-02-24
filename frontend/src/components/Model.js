import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Model = ({ model }) => {
  return (
    <Card
      style={{
        minWidth: 200,
      }}
    >
      <Link to={`/model/${model._id}`}>
        <Card.Img src={model.profileImage} variant="top" />
      </Link>

      <Card.Body>
        <Card.Title as="div">
          <Link to={`/model/${model._id}`}>
            <strong>
              <h4>{model.username}</h4>
            </strong>
          </Link>
          <p className="top">
            Verified{" "}
            <i className="fas fa-check-square" style={{ color: "green" }}></i>
          </p>
        </Card.Title>

        <Card.Text as="div">
          <Rating
            value={model.rating}
            text={`from ${model.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="p">
          <strong>Gender: </strong>
          {model.gender} <br></br>
          <strong>Location: </strong>
          {model.city}, {model.state}, {model.country}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Model;
