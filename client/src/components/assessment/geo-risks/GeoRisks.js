import React, { Component } from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import { ApiContext } from '../../../ApiContext';
import { FormCheckbox } from 'shards-react';
import * as actionTypes from '../../../store/actions';
import { connect } from 'react-redux';

export class GeoRisks extends Component {
  static contextType = ApiContext;

  state = {
    geoRisks: [
      'p_15',
      'p_20',
      'p_21',
      'p_16',
      'p_17',
      'p_18',
      'p_14',
      'p_19',
      'p_22',
      'p_13'
    ],
    geoRiskData: [],
    checked: {}
  };

  componentDidMount() {
    this.context.api.getRiskFactors().then(response => {
      this.setState({
        geoRiskData: response
      });
    });

    this.state.geoRisks.forEach(geoRisk => {
      this.setState(prevState => {
        return {
          checked: {
            ...prevState.checked,
            [geoRisk]: false
          }
        };
      });
    });
  }

  componentWillUnmount() {
    let group = {};
    const symptomsChecked = this.state.checked;
    for (let symptom in symptomsChecked) {
      group[symptom] = {
        reported: symptomsChecked[symptom]
      };
    }

    this.props.onFinish(group);
  }

  onChangeHandler = id => {
    const checkedSymptoms = { ...this.state.checked };
    for (let symptom in checkedSymptoms) {
      if (symptom === id) {
        checkedSymptoms[symptom] = !checkedSymptoms[symptom];
      }
    }
    this.setState({
      checked: checkedSymptoms
    });
  };

  render() {
    let data = null;
    if (this.state.geoRiskData.length > 0) {
      const filteredRisks = this.state.geoRiskData.filter(risk => {
        return this.state.geoRisks.indexOf(risk.id) >= 0;
      });
      data = filteredRisks.map(risks => {
        return (
          <FormCheckbox
            key={risks.id}
            onChange={() => this.onChangeHandler(risks.id)}
            checked={this.state.checked[risks.id] || false}
          >
            {risks.name}
          </FormCheckbox>
        );
      });
    } else {
      data = <Spinner />;
    }

    return (
      <div>
        <p>Please select where you lived or recently travelled to?</p>
        {data}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFinish: georisks => dispatch({ type: actionTypes.SET_GEORISKS, georisks })
  };
};

export default connect(null, mapDispatchToProps)(GeoRisks);
