import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { dataTestId, id, type, label, value, name, checked, onChange } = props;

  return (
    <label htmlFor={ id }>
      { label }
      <input
        id={ id }
        data-testid={ dataTestId }
        type={ type }
        value={ value }
        name={ name }
        onChange={ onChange }
        checked={ checked }
      />
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
  label: PropTypes.string,
  name: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  checked: true,
  name: '',
};

export default Input;
