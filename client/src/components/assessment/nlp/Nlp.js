import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  CardTitle,
  FormTextarea,
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from 'shards-react';

import { ApiContext } from '../../../ApiContext';
import * as actionTypes from '../../../store/actions';

export class Nlp extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.delayedHandler = _.debounce(this.handleFeelChange, 400);
  }

  state = {
    observations: []
  };

  handleFeelChange = e => {
    this.context.api
      .parse(e.target.value)
      .then(response => {
        this.updateObservations(response.mentions);
      })
      .catch(err => {
        // Will do it later!
      });
  };

  updateObservations = observations => {
    if (!observations) {
      this.setState({
        observations: []
      });
      return;
    }
    this.setState({
      observations
    });
  };

  componentWillUnmount() {
    if (_.isEmpty(this.state.observations)) {
      return;
    }
    const pairs = this.state.observations.map(item => {
      let val = {
        reported: item.choice_id === 'present'
      };
      if (val.reported) {
        Object.assign(val, {
          initial: true
        });
      }
      return [item.id, val];
    });
    const o = _.fromPairs(pairs);
    this.props.onFinish(o);
  }

  onTextChange = e => {
    e.persist();
    this.delayedHandler(e);
  };

  render() {
    let observations = [];
    for (let o of this.state.observations) {
      observations.push(
        <ListGroupItem key={o.id}>
          <i
            className={
              'mr-1 text-' +
              (o.choice_id === 'present' ? 'success' : 'danger') +
              ' fa fa-fw fa-' +
              (o.choice_id === 'present' ? 'plus' : 'minus') +
              '-circle'
            }
          ></i>
          {o.name}
        </ListGroupItem>
      );
    }
    return (
      <div>
        <CardTitle>Tell us how you feel below</CardTitle>
        <p>We will try out best to recognize your symptoms.</p>
        <FormTextarea onChange={this.onTextChange} className="mb-2" />
        <p>Identified observations:</p>
        <Row>
          <Col lg="6" md="8" sm="12">
            <ListGroup small>{observations}</ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFinish: symptoms => dispatch({ type: actionTypes.SET_SYMPTOMS, symptoms })
  };
};

export default connect(null, mapDispatchToProps)(Nlp);
