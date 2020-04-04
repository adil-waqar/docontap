import React, { Component } from 'react';
import { Form, FormInput, FormGroup, Button, CardTitle } from 'shards-react';
import Axios from '../../utils/axios';
import { Redirect } from 'react-router-dom';

export class DoctorInfo extends Component {
  state = {
    fee: null,
    hospital: null,
    qualification: null,
    specialization: null,
    location: null,
    finish: false
  };

  handleInputChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleDoctorInfo = () => {
    console.log('Handle doctor info');
    Axios.post(`/user/${this.props.userId}/doctor`, {
      fee: this.state.fee,
      hospital: this.state.hospital,
      qualification: this.state.qualification,
      specialization: this.state.specialization,
      location: this.state.location
    })
      .then(response => {
        this.setState({ finish: true });
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        {this.state.finish ? <Redirect to="/signin" exact /> : null}
        <CardTitle>Basic Information</CardTitle>
        <Form>
          <FormGroup>
            <FormInput
              required
              placeholder="Hospital"
              type="text"
              name="hospital"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              required
              placeholder="Qualification"
              type="text"
              name="qualification"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              required
              placeholder="Specialization"
              type="text"
              name="specialization"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              required
              placeholder="Fee"
              type="number"
              name="fee"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              required
              placeholder="Location"
              type="text"
              name="location"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <Button block pill theme="primary" onClick={this.handleDoctorInfo}>
            Done
          </Button>
        </Form>
      </div>
    );
  }
}

export default DoctorInfo;
