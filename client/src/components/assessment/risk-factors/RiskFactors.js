import React, { Component } from 'react';
import { FormCheckbox } from 'shards-react';
import { ApiContext } from '../../../ApiContext';
import Spinner from '../../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

export class RiskFactors extends Component {
  static contextType = ApiContext;

  state = {
    common_risks: ['p_7', 'p_28', 'p_10', 'p_9', 'p_147', 'p_8'],
    checked_risks: {
      p_7: false,
      p_28: false,
      p_10: false,
      p_9: false,
      p_147: false,
      p_8: false
    },
    risk_factors: []
  };

  componentDidMount() {
    this.context.api.getRiskFactors().then(response => {
      const commonRisks = response.filter(risk => {
        if (this.state.common_risks.indexOf(risk.id) >= 0) return true;
        else return false;
      });
      this.setState({ risk_factors: commonRisks });
    });
  }

  componentWillUnmount() {
    let groups = this.state.checked_risks;
    for (let risk in this.state.checked_risks) {
      groups[risk] = {
        reported: this.state.checked_risks[risk]
      };
    }
    this.props.onFinish(groups);
  }

  checkboxHandler = id => {
    const risks = { ...this.state.checked_risks };
    for (let risk in risks) {
      if (risk === id) risks[risk] = !risks[risk];
    }
    this.setState({ checked_risks: risks });
  };

  render() {
    let risks = null;
    if (this.state.risk_factors.length > 0) {
      risks = this.state.risk_factors.map(risk => {
        return (
          <FormCheckbox
            key={risk.id}
            checked={this.state.checked_risks[risk.id]}
            onChange={() => this.checkboxHandler(risk.id)}
          >
            {risk.name}
          </FormCheckbox>
        );
      });
    } else {
      risks = <Spinner />;
    }

    return (
      <div>
        <p>Please check all that apply to you.</p>
        {risks}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFinish: risks => {
      dispatch({
        type: actionTypes.SET_RISKS,
        risks
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(RiskFactors);
