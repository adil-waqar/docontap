import React from 'react';
import {
  Form,
  FormInput,
  FormGroup,
  FormSelect,
  Button,
  CardTitle
} from 'shards-react';

const Initial = ({ handleInputChange, handleSignUp }) => {
  return (
    <div>
      <CardTitle>Sign Up</CardTitle>
      <Form>
        <FormGroup>
          <FormInput
            required
            id="#name"
            placeholder="Name"
            type="text"
            name="name"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            required
            id="#email"
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            required
            id="#DOB"
            placeholder="Date of birth"
            type="date"
            name="DOB"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            required
            id="#password"
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <FormSelect name="userType" required onChange={handleInputChange}>
            <option value="0" disabled selected>
              Who are you?
            </option>
            <option value="2">Doctor</option>
            <option value="1">Patient</option>
          </FormSelect>
        </FormGroup>
        <Button block pill theme="primary" onClick={handleSignUp}>
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default Initial;
