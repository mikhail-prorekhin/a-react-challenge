import React from "react";

function ErrorField(props) {
  const {
    label,
    input,
    inputModificator,
    type,
    meta: { error, touched }
  } = props;


  const errorText = touched &&
    error && <div className="field__error">{error}</div>;



const  inputElement = <div className={`${inputModificator || ' '}`}> 
      <input
      className="field__input "
      {...input}
      type={type}
      />
</div>


  return (
    <div className="field">
      <label className="field__label">{label || input.name}</label>
      {inputElement}
      {errorText}
    </div>
  );
}
ErrorField.propTypes = {};
export default ErrorField;
