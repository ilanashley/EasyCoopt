import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';



import AddOffer from './AddOffer';
import AddCoopte from './AddCoopte';
import ViewOffer from './ViewOffer';
import JobsAvailable from './JobsAvailable';




function App() {
  return (

    
      <Router>
        <Switch>
          <Route component={AddOffer} path="/" exact />
          <Route component={AddCoopte} path="/addcoopte" exact />
          <Route component={ViewOffer} path="/viewoffer" exact />
          <Route component={JobsAvailable} path="/JobsAvailable" exact />
        </Switch>
      </Router>
    
    

  );
}

export default App;
