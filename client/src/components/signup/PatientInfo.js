import React, { Component } from 'react';
import { Form, FormInput, FormGroup, Button, CardTitle } from 'shards-react';
import Axios from '../../utils/axios';
import { Redirect } from 'react-router-dom';

export class PatientInfo extends Component {
  state = {
    location: null,
    phone: null,
    finish: false
  };

  handleInputChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlePatientInfo = () => {
    Axios.post(`/user/${this.props.userId}/patient`, {
      location: this.state.location,
      phone: this.state.phone
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
              placeholder="Location"
              type="text"
              name="location"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              required
              placeholder="Phone no"
              type="text"
              name="phone"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <Button block pill theme="primary" onClick={this.handlePatientInfo}>
            Done
          </Button>
        </Form>
      </div>
    );
  }
}

export default PatientInfo;
