import React, { useEffect, useState } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import Model from '../components/Model';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listModels } from '../actions/modelActions';

const HomeScreen = ({ match, history }) => {
  const [heading, setHeading] = useState('All Models');
  const keyword = match.params.keyword;
  const gender = match.params.gender;
  const verified = 'true';

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const modelList = useSelector((state) => state.modelList);
  const { loading, error, models, page, pages } = modelList;

  useEffect(() => {
    dispatch(listModels(keyword, gender, verified, pageNumber));
  }, [dispatch, keyword, gender, pageNumber]);

  const buttonHandler = (evt) => {
    setHeading(evt.target.value);
    if (evt.target.value === 'Female Models') {
      history.push('/gender/female');
    } else if (evt.target.value === 'Male Models') {
      history.push('/gender/male');
    } else {
      history.push(`/`);
    }
  };
  return (
    <>
      <ButtonGroup size='sm' className='justify-content-md-center'>
        <Button onClick={buttonHandler} value='All Models'>
          All Models
        </Button>
        <Button onClick={buttonHandler} value='Male Models'>
          Male Models
        </Button>
        <Button onClick={buttonHandler} value='Female Models'>
          Female Models
        </Button>
      </ButtonGroup>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Col md={9}>
              <h1 style={{ fontFamily: 'Imbue' }}>{heading}</h1>
              <Row>
                {models.map((model) => (
                  <Col key={model._id} sm={12} md={6} lg={4} xl={3}>
                    <Model model={model} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </Col>
            <Col md={3}>
              <TwitterTimelineEmbed
                sourceType='profile'
                screenName='saurabhnemade'
                options={{ height: 600 }}
              />
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
