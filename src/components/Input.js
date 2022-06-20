import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { dataTestId, id, type, label, value, checked, onChange } = props;

  return (
    <label htmlFor={ id }>
      { label }
      <input
        id={ id }
        data-testid={ dataTestId }
        type={ type }
        value={ value }
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
};

Input.defaultProps = {
  label: '',
  checked: true,
};

export default Input;
