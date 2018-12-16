import React from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {logoutUser} from '../actions/authAction'
import { Button } from 'react-native-material-ui';

class DashboardScreen extends React.Component{
    static navigationOptions = {
        title: 'Dashboard',
        headerLeft: null,
        gesturesEnabled: false,
    };

    componentDidMount(){
        if(this.props.auth.isAuthenticated == false){
            this.props.navigation.navigate('Login')
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated == false){
            this.props.navigation.navigate('Login')
        }
    }

    render(){
        
        return(
            <View style={{padding: 10}}>
                <Text style={{textAlign: 'center', fontSize: 12}}>Welcome, {this.props.auth.user.name}{"\n"}</Text>
                <Text>{"\n"}</Text>
                <Button
                    primary
                    raised
                    text="Add Ticket"
                    onPress={() => this.props.navigation.navigate('AddTicket')}
                />
                <Text>{"\n"}</Text>
                <Button
                    primary
                    raised
                    text="My Tickets"
                    onPress={() => this.props.navigation.navigate('MyTickets')}
                />
                <Text>{"\n"}</Text>
                <Button
                    primary
                    raised
                    text="Profile"
                    onPress={() => this.props.navigation.navigate('MyProfile')}
                />
                <Text>{"\n"}</Text>
                <Button
                    text="Logout"
                    primary
                    raised
                    onPress={() => this.props.logoutUser()}
                />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        error: state.error
    }
}

export default connect(mapStateToProps,{logoutUser})(DashboardScreen)