import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddTicketReason from './Component/TicketReasons/AddTicketReason'
import AddTicket from './Component/Ticket/AddTicket'
import ViewTicket from './Component/Ticket/ViewTicket'
import Navbar from './Component/Layout/Navbar'
import PoliceRegistration from './Component/Police/policeRegistration'
import Login from './Component/Authentication/Login'
import ViewAllPolice from './Component/Police/viewAllPolice'
import ViewPolice from './Component/Police/viewPolice'
import DriverRegistration from './Component/Driver/driverRegistration'
import ApproveTicketList from './Component/Ticket/approveTicketList'
import ViewAllTicketDriver from './Component/Driver/viewAllDriverTicket'
import AdminTicketSearch from './Component/Ticket/AdminTicketSearch'
import UserProfile from './Component/Profile/userProfile'

import setAuthToken from './Utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import store from './store'
import {setCurrentUser, logoutUser} from './Actions/authActions'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';


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
            <Route exact path="/police/view" component={ViewAllPolice} />
            <Route path="/police/view/:pid" component={ViewPolice} />
            <Route path="/register/driver" component={DriverRegistration} />
            <Route path="/approveticket" component={ApproveTicketList} />
            <Route path="/mytickets" component={ViewAllTicketDriver} />
            <Route path="/admin/ticket/search" component={AdminTicketSearch} />
            <Route path="/myprofile" component={UserProfile} />
          </Switch>
          <NotificationContainer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
