
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Provider} from 'react-redux'
import AppNavigator from './navigator'
import store from './store'
import { AsyncStorage } from "react-native"
import isEmpty from './Validation/isEmpty'
import setAuthToken from './Utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import {setCurrentUser, logoutUser} from './actions/authAction'
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import FlashMessage from "react-native-flash-message";

const AppContainer = createAppContainer(AppNavigator)
const uiTheme = {

};

// check for token
let Tok = '';
AsyncStorage.getItem('jwtToken').then(v => {
  Tok = v
  if (!isEmpty(Tok)) {
    // set auth token header auth
    setAuthToken(Tok);
    // Decode token and get user info and exp
    const decoded = jwt_decode(Tok);
    // set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  
    // check for expired token
    
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      this.props.navigation.navigate('Login')
    }
  }
})


class App extends React.Component{
  render(){
    return(
      
      <Provider store={store}>
        <ThemeContext.Provider value={getTheme(uiTheme)}>
          <AppContainer />
          <FlashMessage position="top" />
        </ThemeContext.Provider>
      </Provider>
    )
  }  
}

export default App;