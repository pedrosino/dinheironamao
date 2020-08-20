import React from 'react';
import styled from 'styled-components';
import Menu from '../Menu';
import Footer from '../Footer';

const Main = styled.main`
  padding-top: 80px;
  padding-bottom: 40px;
  flex: 1;
  display: flex;
  flex-direction: row;
  margin: 0 10px 10px 0;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    padding-top: 50px;
    flex-direction: column;
  }
`;

function Layout(props) {
  return(
    <div className="wrapper">
      <Menu />
      <Main>
        {props.children}
      </Main>
      <Footer />
    </div>
  );
}

export default Layout;
