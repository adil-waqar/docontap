import React, { Component, Fragment } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  CardImg,
  Form,
  FormInput,
  FormGroup,
  Button
} from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import Spinner from '../components/UI/Spinner/Spinner';
import logo from '../images/logo.png';
import Axios from '../utils/axios';

export class SignIn extends Component {
  state = {
    email: '',
    password: '',
    error: null,
    loading: false,
    success: false
  };

  signInHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    Axios.post('/user/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        this.props.onLogin(
          response.data.data,
          response.headers['x-auth-token']
        );
        // Save token to local storage
        localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        this.setState({ loading: false, success: true });
      })
      .catch(err => {
        // Give an alert here
        this.setState({ error: err, loading: false });
        console.log(err);
      });
  };

  emailHandler = e => {
    this.setState({ email: e.target.value });
  };

  passwordHandler = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    let cardBody = null;
    if (!this.state.loading) {
      cardBody = (
        <Fragment>
          <CardImg className="mb-2" style={{ width: '50px' }} src={logo} />
          <CardTitle>Sign In</CardTitle>

          <Form className="mb-3" onSubmit={this.signInHandler}>
            <FormGroup>
              <FormInput
                required
                id="#email"
                placeholder="Email"
                type="email"
                onChange={this.emailHandler}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                required
                id="#password"
                placeholder="Password"
                type="password"
                onChange={this.passwordHandler}
              />
            </FormGroup>
            <Button block pill theme="primary" type="submit">
              Sign in
            </Button>
          </Form>
          <p>
            Don't have an account?{' '}
            <NavLink to="/signup" exact>
              Sign up!
            </NavLink>
          </p>
        </Fragment>
      );
    } else {
      cardBody = (
        <Fragment>
          <CardImg className="mb-2" style={{ width: '50px' }} src={logo} />
          <Spinner />
        </Fragment>
      );
    }

    let redirect = null;
    if (this.props.user) {
      if (this.props.user.user.userType === '1') {
        redirect = <Redirect to="/start-assessment" exact />;
      } else {
        redirect = <Redirect to="/doctor-appointments" exact />;
      }
    }

    return (
      <div>
        {redirect}
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              title="Sign in"
              subtitle="Welcome to DocOnTap"
              className="text-sm-left mb-3"
            />
          </Row>
          <Row>
            <Col sm="10" md="8" lg="5" className="mx-auto">
              <Card className="mb-2" style={{ textAlign: 'center' }}>
                <CardBody>{cardBody}</CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (user, token) =>
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: {
          user,
          token
        }
      })
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
