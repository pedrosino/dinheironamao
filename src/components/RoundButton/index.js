import styled from "styled-components";

const Button = styled.button`
  color: #FFF;
  border: 1px solid #FFF;
  background-color: var(--mediumBlue);
  box-sizing: border-box;
  cursor: pointer;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border-radius: 50%;
  text-decoration: none;
  display: inline-block;
  transition: opacity .3s;
  text-align: center;
  /* From https://stackoverflow.com/a/37373838 */
  padding: 0;
  min-width: 60px;
  max-width: 120px;
  overflow: none;

  :before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    padding-top: 100%;
  }

  span {
    display: inline-block;
    vertical-align: middle;
    max-width: 90%;
  }

  /* Usar com <span> quando for texto longo */
  /*---------*/

  &:hover,
  &:focus,
  &:active {
    opacity: .5;
  }  
`;

export default Button;