import React, { PureComponent, Fragment } from 'react';
import Axios from '../utils/axios';
import { connect } from 'react-redux';
import PageTitle from '../components/common/PageTitle';
import Spinner from '../components/UI/Spinner/Spinner';

import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Badge,
  Button
} from 'shards-react';

export class DoctorAppointments extends PureComponent {
  state = {
    appointments: null,
    checkAssessment: null
  };

  componentDidMount() {
    Axios.get(`/doctor/${this.props.doctorId}/appointment`)
      .then(response => {
        console.log(response);
        this.setState({ appointments: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    Axios.get(`/doctor/${this.props.doctorId}/appointment`)
      .then(response => {
        if (
          JSON.stringify(response.data.data) ===
          JSON.stringify(this.state.appointments)
        )
          return;
        this.setState({ appointments: [...response.data.data] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  checkAssessmentHandler = id => {
    // Get relevant appointment
    this.setState({
      checkAssessment: id
    });
  };

  getAssessmentMarkup = id => {
    const appointment = this.state.appointments.find(el => el.id === id);
    // Build conditions markup
    const conditionsSorted = appointment.assessment.conditions.sort(
      (a, b) => b.probability - a.probability
    );
    const conditions = conditionsSorted.map(condition => {
      return (
        <Card className="mt-3" key={condition.id}>
          <CardBody>
            <Row>
              <Col lg="8">
                <span className="mr-2">{condition.name}</span>
              </Col>
              <Col lg="4">
                <div className="progress" style={{ height: '20px' }}>
                  <div
                    className="progress-bar progress-bar-striped bg-success progress-bar-animated"
                    role="progressbar"
                    style={{
                      width:
                        parseInt(
                          Math.floor(condition.probability * 100)
                        ).toString() + '%',
                      height: '20px'
                    }}
                    aria-valuenow={Math.floor(condition.probability * 100)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {Math.floor(condition.probability * 100) + '%'}
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      );
    });

    const symptoms = appointment.assessment.symptoms.map(symptom => {
      return (
        <li key={symptom.id}>
          <i
            className={
              'text-' +
              (symptom.reported ? 'success ' : 'danger ') +
              'fa fa-fw fa-' +
              (symptom.reported ? 'plus' : 'minus') +
              '-circle'
            }
          ></i>
          {symptom.name}
        </li>
      );
    });

    let base = (
      <Fragment>
        <Col className="mt-3">
          <h5>Condtions</h5>
          <ul className="list-unstyled">{conditions}</ul>
        </Col>
        <Col className="mt-3">
          <h5>Symptoms</h5>
          {symptoms}
        </Col>
      </Fragment>
    );

    return base;
  };

  changeStatus = (status, id) => {
    Axios.put(`/appointment/${id}`, {
      status
    })
      .then(response => {
        console.log(response);
        // Get new appointments
        Axios.get(`/doctor/${this.props.doctorId}/appointment`)
          .then(response => {
            this.setState({ appointments: response.data.data });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let appointments = null;
    if (this.state.appointments) {
      appointments = this.state.appointments.map(appointment => {
        const assessmentResults = this.getAssessmentMarkup(appointment.id);
        return (
          <Card key={appointment.id} className="mb-2">
            <CardBody>
              <Row>
                <Col>
                  <h4>{appointment.patient.user.name}</h4>
                  <strong>Time: </strong> {appointment.time} <br />
                  <strong>Status: </strong>
                  <Badge theme="primary">
                    {appointment.status}
                  </Badge> <br /> <br />
                  <Button
                    onClick={() =>
                      this.changeStatus('Accepted', appointment.id)
                    }
                    outline
                    className="mr-2"
                    pill
                    theme="success"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() =>
                      this.changeStatus('Declined', appointment.id)
                    }
                    className="mr-2"
                    outline
                    pill
                    theme="danger"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={() => this.checkAssessmentHandler(appointment.id)}
                    outline
                    pill
                    theme="warning"
                  >
                    Check Assessment
                  </Button>
                </Col>
              </Row>
              {this.state.checkAssessment === appointment.id ? (
                <Row>{assessmentResults}</Row>
              ) : null}
            </CardBody>
          </Card>
        );
      });
    } else appointments = <Spinner />;

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="View your appointments"
            subtitle="Appointments"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader className="border-bottom">
                <h5>Appointments</h5>
              </CardHeader>
              <CardBody className="border-bottom">{appointments}</CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    doctorId: state.auth.user ? state.auth.user.id : state.auth.user
  };
};

export default connect(mapStateToProps, null)(DoctorAppointments);
