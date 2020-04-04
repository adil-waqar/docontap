import React, { Component } from 'react';
import { Button } from 'shards-react';

export class Single extends Component {
  buttonHandler = status => {
    const answer = { [this.props.items[0].id]: status };
    this.props.handleNextQuestion(answer);
  };

  render() {
    return (
      <div>
        <Button
          onClick={() => this.buttonHandler(true)}
          outline
          theme="success"
          className="mr-1"
        >
          Yes
        </Button>
        <Button
          onClick={() => this.buttonHandler(false)}
          outline
          theme="danger"
          className="mr-1"
        >
          No
        </Button>
        <Button
          onClick={() => this.buttonHandler(undefined)}
          outline
          theme="warning"
          className="mr-1"
        >
          Don't know
        </Button>
      </div>
    );
  }
}

export default Single;
