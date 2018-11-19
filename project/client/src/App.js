import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddTicketReason from './Component/TicketReasons/AddTicketReason'
import Navbar from './Component/Layout/Navbar'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/addticketreason" component={AddTicketReason} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
