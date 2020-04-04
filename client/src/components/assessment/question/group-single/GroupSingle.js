import React, { Component } from 'react';
import { FormRadio } from 'shards-react';
import PropTypes from 'prop-types';
import { Button } from 'shards-react';

export class GroupSingle extends Component {
  state = {
    selected: null
  };

  onChangeHandler = id => {
    this.setState({
      selected: id
    });
  };

  render() {
    const items = this.props.items.map(item => {
      return (
        <FormRadio
          key={item.id}
          name="option"
          checked={this.state.selected === item.id}
          onChange={() => this.onChangeHandler(item.id)}
        >
          {item.name}
        </FormRadio>
      );
    });
    return (
      <div>
        {items}
        <Button
          className="mt-2"
          theme="success"
          onClick={() => this.props.handleNextQuestion(this.state.selected)}
        >
          Next Question
        </Button>
      </div>
    );
  }
}

GroupSingle.propTypes = {
  items: PropTypes.array
};

export default GroupSingle;
