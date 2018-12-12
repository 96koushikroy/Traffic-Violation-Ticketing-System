
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Provider} from 'react-redux'
import AppNavigator from './navigator'
import store from './store'

const AppContainer = createAppContainer(AppNavigator)

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }  
}

export default App;