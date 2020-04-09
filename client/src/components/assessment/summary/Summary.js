import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ApiContext } from '../../../ApiContext';
import Spinner from '../../UI/Spinner/Spinner';
import { Card, CardBody, Row, Col, Button, Alert } from 'shards-react';
import Axios from '../../../utils/axios';

export class Summary extends Component {
  static contextType = ApiContext;

  state = {
    diagnosis: null,
    explanations: {}
  };

  toDiagnosis() {
    let res = {
      age: this.props.patient.age,
      sex: this.props.patient.sex,
      evidence: []
    };

    let symptoms = this.props.patient.symptoms;
    res.evidence = _.map(symptoms, (symptom, symptomId) => {
      const getChoiceId = (choice) => {
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

  explainHandler = (id) => {
    const newExplanations = { ...this.state.explanations, [id]: null };
    this.setState({ explanations: newExplanations });

    this.context.api
      .explain(Object.assign(this.toDiagnosis(), { target: id }))
      .then((data) => {
        const exp = { ...this.state.explanation };
        exp[id] = data;
        this.setState({
          explanations: exp
        });
      });
  };

  componentDidMount() {
    // GET results
    this.context.api.diagnosis(this.toDiagnosis()).then((response) => {
      this.setState(
        {
          diagnosis: response
        },
        () => {
          this.toAssessment();
        }
      );
    });
    // POST assessment
  }

  toAssessment = () => {
    const conditions = this.state.diagnosis.conditions.map((condition) => {
      return {
        name: condition.name,
        probability: condition.probability
      };
    });

    const filteredConditions = _.take(conditions, 3);
    const symptoms = Object.keys(this.props.patient.symptoms).filter((el) => {
      return el[0] === 's';
    });

    this.context.api.getSymptoms().then((response) => {
      const apiSymptoms = symptoms.map((symptom) => {
        const symptomObject = response.find((el) => el.id === symptom);
        return {
          name: symptomObject.name,
          reported: this.props.patient.symptoms[symptom].reported
        };
      });

      // POST assessment
      Axios.post(`/patient/${this.props.user.id}/assessment`, {
        conditions: filteredConditions,
        symptoms: apiSymptoms
      })
        .then((response) => {
          const id = response.data.data.assessment.id;
          this.props.setAssessmentId(id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  getExplanationMarkup = (conditionId) => {
    let supporting = null;
    let conflicting = null;
    let base = null;
    const explanation = this.state.explanations[conditionId];
    if (explanation) {
      // Build supporting evidence
      supporting = explanation.supporting_evidence.map((evidence) => {
        return (
          <li key={evidence.id}>
            <i className="text-success fa fa-fw fa-plus-circle"></i>
            {evidence.common_name}
          </li>
        );
      });
      // Build conflicting evidence
      conflicting = explanation.conflicting_evidence.map((evidence) => {
        return (
          <li key={evidence.id}>
            <i className="text-danger fa fa-fw fa-minus-circle"></i>
            {evidence.common_name}
          </li>
        );
      });
      // Build base
      base = (
        <Row>
          <Col>
            <span className="badge badge-success">
              <i className="fa fa-fw fa-thumbs-up"></i>Evidence for
            </span>
            <ul className="list-unstyled">{supporting}</ul>
          </Col>
          <Col>
            <span className="badge badge-danger">
              <i className="fa fa-fw fa-thumbs-down"></i>Evidence against
            </span>
            <ul className="list-unstyled">{conflicting}</ul>
          </Col>
        </Row>
      );

      return base;
    } else return null;
  };

  render() {
    let results = null;
    if (!this.state.diagnosis) {
      results = <Spinner />;
    } else {
      results = this.state.diagnosis.conditions.map((condition) => {
        // Build explanation markup
        let explaination = this.getExplanationMarkup(condition.id);
        return (
          <Card key={condition.id} className="mb-2">
            <CardBody>
              <Row>
                <Col xs="8" sm="8" md="8" lg="8">
                  <span className="mr-2">{condition.name}</span>
                  {condition.probability >= 0.2 ? (
                    <Fragment>
                      <Button
                        pill
                        theme="warning"
                        size="sm"
                        onClick={() => this.explainHandler(condition.id)}
                      >
                        Explain
                      </Button>
                    </Fragment>
                  ) : null}
                </Col>
                <Col xs="4" sm="4" md="4" lg="4">
                  <div className="progress" style={{ height: '20px' }}>
                    <div
                      className="progress-bar progress-bar-striped bg-success progress-bar-animated"
                      role="progressbar"
                      style={{
                        width:
                          parseInt(
                            Math.floor(condition.probability * 100)
                          ).toString() + '%',
                        height: '20px'
                      }}
                      aria-valuenow={Math.floor(condition.probability * 100)}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {Math.floor(condition.probability * 100) + '%'}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  {this.state.explanations[condition.id] === null ? (
                    <Spinner />
                  ) : (
                    explaination
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
      });
    }

    return (
      <div>
        <p>Based on the interview, you could suffer from: </p>
        {results}
        <Alert style={{ borderRadius: '20px' }} theme="secondary">
          <i className="fa fa-info-circle"></i> Please note that the list above
          may not be complete and is provided solely for informational purposes
          and is not a qualified medical opinion.
        </Alert>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    patient: state.assessment,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, null)(Summary);
