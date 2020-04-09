import React, { Component } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import Axios from '../utils/axios';
import { connect } from 'react-redux';
import Spinner from '../components/UI/Spinner/Spinner';

export class PreviousAssessments extends Component {
  state = {
    assessments: null
  };

  componentDidMount() {
    Axios.get(`/patient/${this.props.patientId}/assessment`)
      .then((response) => {
        this.setState({ assessments: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let initialAssessments = null;
    if (this.state.assessments) {
      initialAssessments = this.state.assessments.map((assessment) => {
        const conditions = assessment.conditions.sort(
          (a, b) => b.probability - a.probability
        );
        return (
          <Card key={conditions[0].probability} className="mb-3">
            <CardBody>
              <Row>
                <Col>{conditions[0].name}</Col>
                <Col>
                  <div className="progress" style={{ height: '20px' }}>
                    <div
                      className="progress-bar progress-bar-striped bg-success progress-bar-animated"
                      role="progressbar"
                      style={{
                        width:
                          parseInt(
                            Math.floor(conditions[0].probability * 100)
                          ).toString() + '%',
                        height: '20px'
                      }}
                      aria-valuenow={Math.floor(
                        conditions[0].probability * 100
                      )}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {Math.floor(conditions[0].probability * 100) + '%'}
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
      });
    } else initialAssessments = <Spinner />;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="View your previous assessments"
            subtitle="Assessments"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader className="border-bottom">
                <h5>Assessments</h5>
              </CardHeader>
              <CardBody className="border-bottom">
                {initialAssessments}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patientId: state.auth.user ? state.auth.user.id : state.auth.user
  };
};

export default connect(mapStateToProps, null)(PreviousAssessments);
