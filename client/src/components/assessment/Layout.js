import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button } from 'shards-react';

const Layout = props => {
  return (
    <Card className="mb-3">
      <CardHeader className="border-bottom">
        <h5>Patient Assessment</h5>
      </CardHeader>
      <CardBody className="border-bottom">{props.children}</CardBody>
      <CardFooter className="d-flex justify-content-end">
        <Button id="next-step" onClick={props.onNextStep}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Layout;
