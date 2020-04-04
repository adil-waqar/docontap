import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormCheckbox } from 'shards-react';
import { ApiContext } from '../../../ApiContext';
import Spinner from '../../UI/Spinner/Spinner';
import * as actionTypes from '../../../store/actions';

export class Suggest extends Component {
  static contextType = ApiContext;

  state = {
    suggestedSymptoms: null,
    checked: {}
  };

  toSuggest = () => {
    return {
      sex: this.props.sex,
      age: this.props.age,
      selected: _.filter(_.keys(this.props.symptoms), key => {
        return this.props.symptoms[key].reported === true;
      })
    };
  };

  checkBoxHandler = id => {
    const checkSymptoms = { ...this.state.checked };
    for (let symptom in checkSymptoms) {
      if (symptom === id) checkSymptoms[symptom] = !checkSymptoms[symptom];
    }
    this.setState({ checked: checkSymptoms });
  };

  componentDidMount() {
    this.context.api.getSuggestedSymptoms(this.toSuggest()).then(response => {
      if (response.length <= 0) {
        document.getElementById('next-step').click();
        return;
      }

      this.setState({
        suggestedSymptoms: response
      });

      this.state.suggestedSymptoms.forEach(symptom => {
        this.setState(prevState => {
          return {
            checked: {
              ...prevState.checked,
              [symptom.id]: false
            }
          };
        });
      });
    });
  }

  componentWillUnmount() {
    let groups = {};
    const symptomStatuses = this.state.checked;
    for (let symptom in symptomStatuses) {
      if (symptomStatuses[symptom]) {
        groups[symptom] = {
          reported: true,
          related: true
        };
      }
    }
    this.props.onFinish(groups);
  }

  render() {
    let data = null;

    if (this.state.suggestedSymptoms) {
      data = _.take(this.state.suggestedSymptoms, 5).map(symptom => {
        return (
          <FormCheckbox
            key={symptom.id}
            checked={this.state.checked[symptom.id] || false}
            onChange={() => this.checkBoxHandler(symptom.id)}
          >
            {symptom.name}
          </FormCheckbox>
        );
      });
    } else {
      data = <Spinner />;
    }

    return (
      <div>
        <p>Do you have any of the following symptoms?</p>
        {data}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sex: state.patient.sex,
    age: state.patient.age,
    symptoms: state.patient.symptoms
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFinish: suggestions => {
      dispatch({
        type: actionTypes.SET_SUGGESTIONS,
        suggestions
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggest);
