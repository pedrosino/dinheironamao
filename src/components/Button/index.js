import styled from "styled-components";

const Button = styled.button`
  color: #FFF;
  border: 1px solid #FFF;
  background-color: var(--mediumBlue);
  box-sizing: border-box;
  cursor: pointer;
  padding: 16px 24px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  transition: opacity .3s;

  ${({ cor }) => `
    background-color: ${cor};
  `}

  &:hover,
  &:focus {
    opacity: .5;
  }  
`;

export default Button;