import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import AddOffer from './components/AddOffer';
import AddCoopte from './components/AddCoopte';
import ViewOffer from './components/ViewOffer';

function App() {
  return (

    <Router>
      <Switch>
        <Route component={AddOffer} path="/" exact />
        <Route component={AddCoopte} path="/addcoopte" exact />
        <Route component={ViewOffer} path="/viewoffer" exact />
      </Switch>
    </Router>

  );
}

export default App;
