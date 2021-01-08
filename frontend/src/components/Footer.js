import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; DinnerWithModels | <a href={'/'}>legal</a> |{' '}
            <a href={'/'}>FAQ</a>
          </Col>
        </Row>
        <Row>
          <Col className='text-center'>
            Designed by <a href={'/'}>Oto Effiong</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
