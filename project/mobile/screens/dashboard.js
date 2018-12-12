import React from 'react'
import {View, Text, Button, AsyncStorage} from 'react-native'
import {connect} from 'react-redux'
import {logoutUser} from '../actions/authAction'

class DashboardScreen extends React.Component{
    static navigationOptions = {
        title: 'Dashboard',
        headerLeft: null
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
            <View>
                <Text>Welcome, {this.props.auth.user.name}</Text>
                <Button
                    title="Add Ticket"
                    onPress={() => this.props.navigation.navigate('AddTicket')}
                />
                <Button
                    title="My Tickets"
                    onPress={() => this.props.navigation.navigate('MyTickets')}
                />
                <Button
                    title="Profile"
                    onPress={() => this.props.navigation.navigate('MyProfile')}
                />
                <Button
                    title="Logout"
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