import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';
import {
  CardTitle,
  FormRadio,
  Form,
  FormGroup,
  FormInput,
  Row,
  Col
} from 'shards-react';

export class Basic extends Component {
  changeSexHandler = sex => {
    this.props.onSexChange(sex);
  };

  changeAgeHandler = e => {
    this.props.onAgeChange(e.target.value);
  };

  render() {
    return (
      <div>
        <CardTitle>Please select your age and sex.</CardTitle>
        {/* <label className="mr-3">Sex: </label> */}
        <p className="mb-2">Select your sex</p>
        <FormRadio
          name="sex"
          inline
          onChange={() => this.changeSexHandler('male')}
          checked={this.props.sex === 'male'}
        >
          Male
        </FormRadio>
        <FormRadio
          name="sex"
          inline
          onChange={() => this.changeSexHandler('female')}
          checked={this.props.sex === 'female'}
        >
          Female
        </FormRadio>
        <Form>
          <Row>
            <Col sm="12" md="6" lg="2">
              <FormGroup>
                <label className="" htmlFor="#input-age">
                  Age
                </label>
                {/* <p>Type your age</p> */}
                <FormInput
                  onChange={this.changeAgeHandler}
                  type="number"
                  id="input-age"
                  value={this.props.age}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    age: state.patient.age,
    sex: state.patient.sex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSexChange: sex =>
      dispatch({
        type: actionTypes.SET_SEX,
        sex
      }),
    onAgeChange: age => dispatch({ type: actionTypes.SET_AGE, age })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
