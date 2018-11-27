import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddTicketReason from './Component/TicketReasons/AddTicketReason'
import AddTicket from './Component/Ticket/AddTicket'
import ViewTicket from './Component/Ticket/ViewTicket'
import Navbar from './Component/Layout/Navbar'
import PoliceRegistration from './Component/Police/policeRegistration'
import Login from './Component/Authentication/Login'
import setAuthToken from './Utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import store from './store'
import {setCurrentUser, logoutUser} from './Actions/authActions'



// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/addticketreason" component={AddTicketReason} />
            <Route path="/addticket" component={AddTicket} />
            <Route path="/ticket/view/:tid" component={ViewTicket} />
            <Route path="/register/police" component={PoliceRegistration} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;