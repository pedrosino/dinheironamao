import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const FormFieldWrapper = styled.div`
  position: relative;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const Label = styled.label``;

Label.Text = styled.span`
  color: black;
  height: 57px;
  position: absolute; 
  top: 0;
  left: 16px;
  
  display: flex;
  align-items: center;
  
  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  
  transition: .1s ease-in-out;
`;

const Select = styled.select`
  background: white;
  color: black;
  display: block;
  width: 100%;
  height: 57px;
  font-size: 18px;
  
  outline: 0;
  border: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585D;
  
  padding: 16px 16px 0 16px;
  margin-bottom: 25px;
  
  resize: none;
  border-radius: 4px;
  transition: border-color .3s;
  
  &:focus {
    border-bottom-color: var(--mediumBlue);
    background-color: white;
  }
  &:focus:not([type='color']) + ${Label.Text} {
    transform: scale(.7) translateY(-10px);
  }

  ${({ hasValue }) => hasValue && css`
    &:not([type='color']) + ${Label.Text} {
      transform: scale(.7) translateY(-10px);
    }
  `}
`;

function FormSelect({
  label, name, value, onChange, options,
}) {

  const hasValue = Boolean(value.length);

  return (
    <FormFieldWrapper>
      <Label
        htmlFor={name}
      >
        <Select
          name={name}
          onChange={onChange}
          value={value}
          hasValue={hasValue}
        >
          
          {
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          }
        </Select>
        <Label.Text>
          {label}
          :
        </Label.Text>
      </Label>
    </FormFieldWrapper>
  );
}

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};

FormSelect.defaultProps = {
  value: '',
  options: [],
};

export default FormSelect;