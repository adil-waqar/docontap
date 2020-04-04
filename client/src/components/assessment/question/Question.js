import React, { Component } from 'react';
import { ApiContext } from '../../../ApiContext';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import GroupSingle from './group-single/GroupSingle';
import GroupMultiple from './group-multiple/GroupMultiple';
import Single from './single/Single';
import { CardTitle } from 'shards-react';
import * as actionTypes from '../../../store/actions';
import _ from 'lodash';

export class Question extends Component {
  static contextType = ApiContext;

  state = {
    currentQuestion: null
  };

  toDiagnosis() {
    let res = {
      age: this.props.patient.age,
      sex: this.props.patient.sex,
      evidence: []
    };

    let symptoms = this.props.patient.symptoms;
    res.evidence = _.map(symptoms, (symptom, symptomId) => {
      const getChoiceId = choice => {
        if (choice === true) {
          return 'present';
        }
        if (_.isUndefined(choice)) {
          return 'unknown';
        }
        if (choice === false) {
          return 'absent';
        }
      };

      let diagnosisSymptom = {
        id: symptomId,
        choice_id: getChoiceId(symptom.reported)
      };

      if (symptom.initial) {
        Object.assign(diagnosisSymptom, {
          initial: true
        });
      }

      if (symptom.related) {
        Object.assign(diagnosisSymptom, {
          related: true
        });
      }

      return diagnosisSymptom;
    });
    return res;
  }

  makeGroup = selected => {
    let group = {};
    if (typeof selected === 'object') {
      for (let key in selected) {
        group[key] = { reported: selected[key] };
      }
    } else {
      group[selected] = { reported: true };
    }
    return group;
  };

  handleNextQuestion = async prevSelected => {
    // Clearing the current question
    this.setState({ currentQuestion: null });
    // Dispatch evidence
    const group = this.makeGroup(prevSelected);
    await this.props.onFinish(group);
    // Make the next call
    this.context.api.diagnosis(this.toDiagnosis()).then(response => {
      // Check stop condition
      if (response['should_stop'] === true) {
        document.getElementById('next-step').removeAttribute('disabled');
        document.getElementById('next-step').click();
        return;
      }
      this.setState({
        currentQuestion: response
      });
    });
  };

  componentDidMount() {
    // Disable the next button
    document.getElementById('next-step').setAttribute('disabled', 'true');
    this.context.api.diagnosis(this.toDiagnosis()).then(response => {
      this.setState({
        currentQuestion: response
      });
    });
  }

  render() {
    let options = null;
    let fullQuestion = null;

    if (this.state.currentQuestion) {
      const { items, text } = this.state.currentQuestion.question;
      const { question } = this.state.currentQuestion;
      switch (question.type) {
        case 'single':
          options = (
            <Single
              key="secret-key-2"
              items={items}
              handleNextQuestion={this.handleNextQuestion}
            />
          );
          break;
        case 'group_single':
          options = (
            <GroupSingle
              key="secret-key-2"
              items={items}
              handleNextQuestion={this.handleNextQuestion}
            />
          );
          break;
        case 'group_multiple':
          options = (
            <GroupMultiple
              key="secret-key-2"
              items={items}
              handleNextQuestion={this.handleNextQuestion}
            />
          );
          break;
        default:
          options = null;
      }
      fullQuestion = [
        <CardTitle key="secret-key-1">{text}</CardTitle>,
        options
      ];
    } else fullQuestion = <Spinner />;

    return <div>{fullQuestion}</div>;
  }
}

const mapStateToProps = state => {
  return {
    patient: state.patient
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFinish: evidence => dispatch({ type: actionTypes.SET_EVIDENCE, evidence })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
