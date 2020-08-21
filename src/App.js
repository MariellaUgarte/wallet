import React from 'react';
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Profile from './Profile';
import Main from './Main';
import MySelect from './select_test';
import Item from './Item';
import List from './List';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Transactions from './Transactions';
import ProtectedRoute from './ProtectedRoute';
import EditTransaction from './EditTransaction';

function App() {
  return (
    <div className={"App"}>
        <Switch>
          <Route path="/signin" component={SignIn}/>
          <Route path="/transactions/:id/edit" component={EditTransaction}/>
          <Route path="/transactions" component={Transactions}/>
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile}/>
        </Switch>
      </div>
  );
}

export default App;
