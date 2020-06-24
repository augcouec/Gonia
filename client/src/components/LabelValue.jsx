import React from "react";

const LabelValue = (props) => {
  return (
    <div className="label-value">
      <span className="label-value__label bold">{props.label} :</span>
      <span className="label-value__value">{props.value}</span>
    </div>
  );
};

export default LabelValue;
