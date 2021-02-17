import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#343a40', color: 'white' }}>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; DinnerWithModels |{' '}
            <a href={'/'} style={{ color: 'white' }}>
              legal
            </a>{' '}
            |{' '}
            <a href={'/'} style={{ color: 'white' }}>
              FAQ
            </a>
          </Col>
        </Row>
        <Row>
          <Col className='text-center pb-3'>
            Designed by{' '}
            <a href={'https://www.oto.com.ng/'} style={{ color: 'white' }}>
              Oto Effiong
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
