import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import {provider, Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import token from './reducers/token'

import AddOffer from './components/AddOffer';
import AddCoopte from './components/AddCoopte';
import ViewOffer from './components/ViewOffer';
import JobsAvailable from './components/JobsAvailable';
import ReferralsList from './components/ReferralsList';
import Login from './components/Login';


const store = createStore(combineReducers({ token }))


function App() {
  return (

    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={AddOffer} path="/" exact />
          <Route component={AddCoopte} path="/addcoopte" exact />
          <Route component={ViewOffer} path="/viewoffer" exact />
          <Route component={JobsAvailable} path="/JobsAvailable" exact />
          <Route component={ReferralsList} path="/ReferralsList" exact />
          <Route component={Login} path="/login" exact />
        </Switch>
      </Router>
    </Provider>



  );
}

export default App;
