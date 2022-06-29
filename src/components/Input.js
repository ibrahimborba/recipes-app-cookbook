import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const {
    dataTestId,
    id,
    type,
    frontLabel,
    backLabel,
    value,
    name,
    checked,
    placeholder,
    onChange } = props;

  return (
    <label htmlFor={ id }>
      { frontLabel }
      <input
        id={ id }
        data-testid={ dataTestId }
        type={ type }
        value={ value }
        name={ name }
        placeholder={ placeholder }
        onChange={ onChange }
        checked={ checked }
      />
      { backLabel }
    </label>
  );
}

Input.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  frontLabel: PropTypes.string,
  backLabel: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  frontLabel: '',
  backLabel: '',
  checked: true,
  name: '',
  placeholder: '',
};

export default Input;
