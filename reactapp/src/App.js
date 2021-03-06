import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import token from './reducers/token'
import group from './reducers/group'
import userId from './reducers/userId'
import userFirstName from './reducers/userFirstName'

import AddOffer from './components/AddOffer';
import AddCoopte from './components/AddCoopte';
import ViewOffer from './components/ViewOffer';
import OffersList from './components/OffersList';
import ReferralsList from './components/ReferralsList';
import Login from './components/Login';
import MyAccount from './components/MyAccount';

const store = createStore(combineReducers({ token, group, userId, userFirstName }))

function App() {
  return (

    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={AddOffer} path="/addOffer" exact />
          <Route component={AddOffer} path="/addOffer/:offerId" exact />          
          <Route component={AddCoopte} path="/addCoopte/:offerId" exact />
          <Route component={ViewOffer} path="/viewOffer/:offerId" exact />
          <Route component={OffersList} path="/" exact />
          <Route component={OffersList} path="/offersList" exact />
          <Route component={ReferralsList} path="/referralsList" exact />
          <Route component={Login} path="/login" exact />
          <Route component={MyAccount} path="/myAccount" exact />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
