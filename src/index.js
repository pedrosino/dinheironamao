import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from '../src/pages/About';
import Home from '../src/pages/Home';
import NovaDespesa from '../src/pages/despesa/nova';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/*<Route path="/relatorio" component={Relatorio} />*/}
      <Route path="/despesa/nova" component={NovaDespesa} />
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
