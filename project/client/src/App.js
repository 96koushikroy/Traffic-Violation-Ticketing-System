import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddTicketReason from './Component/TicketReasons/AddTicketReason'
import AddTicket from './Component/Ticket/AddTicket'
import ViewTicket from './Component/Ticket/ViewTicket'
import Navbar from './Component/Layout/Navbar'
import PoliceRegistration from './Component/Police/policeRegistration'

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
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
