import React, { Component } from 'react';
import Axios from '../../../utils/axios';
import Spinner from '../../UI/Spinner/Spinner';
import {
  Card,
  CardBody,
  Row,
  Col,
  CardImg,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormRadio
} from 'shards-react';
import DocAvatar from '../../../images/avatars/doctor.png';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class Appointment extends Component {
  state = {
    doctors: null,
    modal: false,
    radio: {
      selected: {}
    },
    doctor: {
      doctorSchedules: []
    }
  };

  componentDidMount() {
    Axios.get('/doctor')
      .then((response) => {
        this.setState({
          doctors: response.data.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  modalToggle = (doctor = {}) => {
    if (this.state.modal) doctor.doctorSchedules = [];
    this.setState({
      doctor,
      modal: !this.state.modal
    });
  };

  getDoctorScheduleMarkup = (schedules) => {
    return schedules.map((schedule) => {
      return (
        <div key={schedule.day}>
          {schedule.day + ': ' + schedule.from + ' - ' + schedule.to}
        </div>
      );
    });
  };

  handleRadio = (schedule) => {
    this.setState({
      radio: {
        selected: schedule
      }
    });
  };

  getScheduleSelectMarkup = (schedules) => {
    const markup = schedules.map((schedule) => {
      return (
        <FormRadio
          key={schedule.day}
          onChange={() => this.handleRadio(schedule)}
          checked={this.state.radio.selected.day === schedule.day}
        >
          {schedule.day + ': ' + schedule.from + ' - ' + schedule.to}
        </FormRadio>
      );
    });
    return markup;
  };

  setAppointment = () => {
    const time = this.state.radio.selected.from;
    const day = this.state.radio.selected.day;
    const dayTime = day + ' ' + time;
    Axios.post(`/patient/${this.props.patientId}/appointment`, {
      doctorId: this.state.doctor.id,
      time: dayTime,
      assessmentId: this.props.assessmentId
    })
      .then((response) => {
        this.props.history.push('/appointments');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let doctors = null;
    if (this.state.doctors) {
      doctors = this.state.doctors.map((doctor) => {
        return (
          <Card key={doctor.userId} className="mb-3">
            <CardBody>
              <Row>
                <Col xs="12" sm="12" md="2" lg="2">
                  <CardImg src={DocAvatar} style={{ width: '70%' }} />
                </Col>
                <Col xs="12" sm="12" md="4" lg="4">
                  <h4>{doctor.user.name}</h4>
                  <p>
                    <strong>Qualification: </strong>
                    {doctor.qualification} <br />
                    <strong>Specialization: </strong>
                    {doctor.specialization} <br />
                    <strong>Hospital: </strong>
                    {doctor.hospital} <br />
                    <strong>Location: </strong>
                    {doctor.location} <br />
                    <strong>Rating: </strong> {doctor.rating}/10
                  </p>
                </Col>
                <Col xs="12" sm="12" md="6" lg="6">
                  <strong>Fee: </strong> {doctor.fee} <br />
                  <strong>Timings: </strong>
                  <br />
                  {this.getDoctorScheduleMarkup(doctor.doctorSchedules)}
                  <Button
                    onClick={() => this.modalToggle(doctor)}
                    style={{ bottom: '0', position: 'absolute', right: '0' }}
                    pill
                    theme="success"
                  >
                    Book appointment
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
      });
    } else {
      doctors = <Spinner />;
    }
    return (
      <div>
        <CardTitle className="mb-3" style={{ textAlign: 'center' }}>
          Book an appointment
        </CardTitle>
        {doctors}
        <Modal open={this.state.modal} toggle={this.modalToggle}>
          <ModalHeader>
            Please choose an appropriate appointment time
          </ModalHeader>
          <ModalBody>
            {this.getScheduleSelectMarkup(this.state.doctor.doctorSchedules)}
            <Button
              onClick={this.setAppointment}
              className="float-right"
              pill
              theme="success"
            >
              Done
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patientId: state.auth.user.id
  };
};

export default withRouter(connect(mapStateToProps, null)(Appointment));
