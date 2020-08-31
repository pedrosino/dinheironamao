import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const FormFieldWrapper = styled.div`
  position: relative;
  textarea {
    min-height: 150px;
  }
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
  background: var(--lightGray);
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

const Select = styled.select`
  background: var(--lightGray);
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

function FormField({
  label, type, name, value, onChange, options,
}) {
  const tag = type === 'select' ? 'select' : 'input';

  const hasValue = Boolean(value.length);
  const hasOptions = Boolean(options.length);

  return (
    <FormFieldWrapper>
      <Label
        htmlFor={name}
      >
        {hasOptions ?  
          <Select>
            <option></option>
            {
              options.map((option) => (
                <option value={option}>
                  {option}
                </option>
              ))
            }
            name={name}
            hasValue={hasValue}
            value={value}
            onChange={onChange}
          </Select>
        : <Input
          as={tag}
          name={name}
          type={type}
          hasValue={hasValue}
          value={value}
          onChange={onChange}
        />}
        <Label.Text>
          {label}
          :
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
  options: PropTypes.arrayOf(PropTypes.string),
};

FormField.defaultProps = {
  type: 'text',
  value: '',
  options: [],
};

export default FormField;