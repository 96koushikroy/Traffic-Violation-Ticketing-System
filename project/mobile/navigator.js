import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './screens/login'
import DashboardScreen from './screens/dashboard'
import AddTicket from './screens/addTicket'
import MyTickets from './screens/myTickets'
import Profile from './screens/profile'

const AppNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen
    },
    Dashboard: {
      screen: DashboardScreen
    },
    AddTicket: {
      screen: AddTicket
    },
    MyTickets: {
      screen: MyTickets
    },
    MyProfile: {
      screen: Profile
    }
});

export default AppNavigator