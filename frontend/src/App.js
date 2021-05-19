import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import {provider, Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import token from './reducers/token'
import type from './reducers/type'

import AddOffer from './components/AddOffer';
import AddCoopte from './components/AddCoopte';
import ViewOffer from './components/ViewOffer';
import JobsAvailable from './components/JobsAvailable';
import ReferralsList from './components/ReferralsList';
import Login from './components/Login';
import MyAccount from './components/MyAccount';



const store = createStore(combineReducers({ token, type }))


function App() {
  return (

    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={JobsAvailable} path="/" exact />
          <Route component={JobsAvailable} path="/JobsAvailable" exact />
          <Route component={AddOffer} path="/addOffer" exact />
          <Route component={AddCoopte} path="/addCoopte" exact />
          <Route component={ViewOffer} path="/viewOffer" exact />
          <Route component={ReferralsList} path="/referralsList" exact />
          <Route component={Login} path="/login" exact />
          <Route component={MyAccount} path="/myAccount" exact />
        </Switch>
      </Router>
    </Provider>



  );
}

export default App;
