import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Model = ({ model }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/model/${model._id}`}>
        <Card.Img src={model.images[0]} variant='top' />
      </Link>

      <Card.Body>
        <Card.Title as='div'>
          <Link to={`/model/${model._id}`}>
            <strong>
              <h4>{model.username}</h4>
            </strong>
          </Link>
          <p className='top'>
            Verified{' '}
            <i class='fas fa-check-square' style={{ color: 'green' }}></i>
          </p>
        </Card.Title>

        <Card.Text as='div'>
          <Rating value={model.rating} text={`${model.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as='p'>
          <strong>Location: </strong>
          {model.city}, {model.state}, {model.country}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Model;
