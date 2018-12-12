import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './screens/login'
import DashboardScreen from './screens/dashboard'

const AppNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen
    },
    Dashboard: {
      screen: DashboardScreen
    }
});

export default AppNavigator