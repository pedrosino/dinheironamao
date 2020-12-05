import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const FormFieldWrapper = styled.div`
  position: relative;
  textarea {
    min-height: 150px;
  }
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
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

const Input = styled.input`
  background: white;
  color: black;
  display: block;
  width: 100%;
  height: 57px;
  font-size: 18px;
  max-width: 500px;
  
  outline: 0;
  border: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585D;
  
  padding: 16px 16px 0 16px;
  /*margin-bottom: 25px;*/
  
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

  &[type='color'] + ${Label.Text} {
    transform: scale(.7) translateY(-10px);
  }

  ${({ hasValue }) => hasValue && css`
    &:not([type='color']) + ${Label.Text} {
      transform: scale(.7) translateY(-10px);
    }
  `}
`;

function FormField({
  label, type, name, id, value, onChange,
}) {

  const hasValue = Boolean(value !== null && value.length);
  if (value === null)
    value = '';
  
  return (
    <FormFieldWrapper>
      <Label
        htmlFor={name}
      >
        <Input
          name={name}
          id={id}
          type={type}
          hasValue={hasValue}
          value={value}
          onChange={onChange}
        />
        <Label.Text>
          {label}:
        </Label.Text>
      </Label>
    </FormFieldWrapper>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

FormField.defaultProps = {
  type: 'text',
  value: '',
};

export default FormField;