import React from 'react';
import { Container, Row, Col, CardImg } from 'shards-react';
import img from '../../../images/welcome.png';

const Welcome = () => {
  return (
    <Container>
      <Row>
        <Col lg="9" md="9" sm="12">
          <h5>
            <strong>Hello!</strong>
          </h5>
          <p>
            You’re about to use a short (3 min), safe and anonymous health
            checkup. Your answers will be carefully analyzed and you’ll learn
            about possible causes of your symptoms.
          </p>
        </Col>
        <Col lg="3" md="3" sm="12">
          <div className="d-flex justify-content-end">
            <CardImg src={img} style={{ width: '100%' }} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
