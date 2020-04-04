import React from 'react';
import DoctorInfo from './DoctorInfo';
import PatientInfo from './PatientInfo';

const BasicInfo = props => {
  return (
    <div>
      {props.userType === '2' ? (
        <DoctorInfo userId={props.userId} />
      ) : (
        <PatientInfo userId={props.userId} />
      )}
    </div>
  );
};

export default BasicInfo;
