import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../src/components/Layout';
import App from './App';
import * as serviceWorker from './serviceWorker';

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/*<Route path="/relatorio" component={Relatorio} />*/}
      <Route path="/about" component={About} />
      <Route path="/" component={Home} exact />
      <Route component={() => (<div>Não encontrado</div>)} />
    </Switch>
  </BrowserRouter>,
  
  //<React.StrictMode>
  //  <App />
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
