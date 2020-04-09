import React, { Component } from 'react';
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
  Badge
} from 'shards-react';

export class PatientAppointments extends Component {
  state = {
    appointments: []
  };

  componentDidMount() {
    Axios.get(`/patient/${this.props.patientId}/appointment`)
      .then((response) => {
        this.setState({ appointments: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    let appointments = null;
    if (this.state.appointments) {
      appointments = this.state.appointments.map((appointment) => {
        return (
          <Card key={appointment.id} className="mb-2">
            <CardBody>
              <Row>
                <Col lg="4">
                  <h4>{appointment.doctor.user.name}</h4>
                  <strong>Hospital: </strong> {appointment.doctor.hospital}{' '}
                  <br />
                  <strong>Fee: </strong> {appointment.doctor.fee}
                </Col>
                <Col lg="8">
                  <strong>Appointment time: </strong> {appointment.time} <br />
                  <strong>Status: </strong>
                  <Badge theme="primary">{appointment.status}</Badge>
                </Col>
              </Row>
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

const mapStateToProps = (state) => {
  return {
    patientId: state.auth.user.id
  };
};

export default connect(mapStateToProps, null)(PatientAppointments);
