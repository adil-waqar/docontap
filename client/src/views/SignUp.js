import React, { Component } from 'react';
import { Card, CardBody, Container, Row, Col, CardImg } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import logo from '../images/logo.png';
import Axios from '../utils/axios';
import Initial from '../components/signup/Initial';
import Spinner from '../components/UI/Spinner/Spinner';
import BasicInfo from '../components/signup/BasicInfo';

export class SignUp extends Component {
  state = {
    name: '',
    email: '',
    DOB: '',
    password: '',
    userType: '',
    loading: false,
    step: 1,
    userId: null
  };

  handleSignUp = e => {
    e.preventDefault();
    this.setState({ loading: true });

    Axios.post('/user/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      dob: this.state.DOB,
      userType: this.state.userType
    }).then(response => {
      this.setState(prevState => {
        return {
          step: prevState.step + 1,
          loading: false,
          userId: response.data.data.id
        };
      });
    });
  };

  handleInputChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    let module = null;
    switch (this.state.step) {
      case 1:
        module = (
          <Initial
            handleInputChange={this.handleInputChange}
            handleSignUp={this.handleSignUp}
          />
        );
        break;
      case 2:
        module = (
          <BasicInfo
            userId={this.state.userId}
            userType={this.state.userType}
          />
        );
        break;
      default:
        module = null;
    }
    return (
      <div>
        {' '}
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              title="Sign Up"
              subtitle="Welcome to DocOnTap"
              className="text-sm-left mb-3"
            />
          </Row>
          <Row>
            <Col sm="10" md="8" lg="5" className="mx-auto">
              <Card className="mb-2" style={{ textAlign: 'center' }}>
                <CardBody>
                  <CardImg
                    className="mb-2"
                    style={{ width: '50px' }}
                    src={logo}
                  />
                  {this.state.loading ? <Spinner /> : module}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SignUp;
