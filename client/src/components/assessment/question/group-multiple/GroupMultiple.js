import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormCheckbox, Button } from 'shards-react';

export class GroupMultiple extends Component {
  state = {
    checked: {}
  };

  UNSAFE_componentWillMount() {
    const initialChecked = {};
    this.props.items.forEach(item => {
      initialChecked[item.id] = false;
    });

    this.setState({ checked: initialChecked });
  }

  onChangeHandler = id => {
    const newChecked = { ...this.state.checked };
    newChecked[id] = !newChecked[id];
    this.setState({ checked: newChecked });
  };

  render() {
    let options = this.props.items.map(item => {
      return (
        <FormCheckbox
          key={item.id}
          checked={this.state.checked[item.id]}
          onChange={() => this.onChangeHandler(item.id)}
        >
          {item.name}
        </FormCheckbox>
      );
    });
    return (
      <div>
        {options}
        <Button
          className="mt-2"
          theme="success"
          onClick={() => this.props.handleNextQuestion(this.state.checked)}
        >
          Next Question
        </Button>
      </div>
    );
  }
}

GroupMultiple.propTypes = {
  items: PropTypes.array
};

export default GroupMultiple;
