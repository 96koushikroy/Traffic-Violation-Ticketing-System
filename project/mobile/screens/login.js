import React from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {loginUser} from '../actions/authAction'
import isEmpty from '../Validation/isEmpty'
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-material-ui';
import TextInput from 'react-native-material-textinput'
import { showMessage } from "react-native-flash-message";

class LoginScreen extends React.Component {
    state = {
        email: '',
        password: '',
        error: {}
    }

    static navigationOptions = {
        title: 'Login',
    };

    componentDidMount(){
        if(this.props.auth.isAuthenticated == true){
            this.props.navigation.navigate('Dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated == true){
            this.props.navigation.navigate('Dashboard')
        }
        if (!isEmpty(nextProps.error)) {
            this.setState({ error: nextProps.error });
        }
    }

    handleLogin = () => {
        const UserData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(UserData);
    }

    render(){

        return(
            <View style={{padding: 10}}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,

                }}>Police Login</Text>


                <TextInput
                    label="Email Address:"
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(text) => this.setState({email: text})}
                    placeholder="abc@abc.com"
                    value={this.state.email}
                />
                <TextInput
                    label="Password:"
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(text) => this.setState({password: text})}
                    placeholder="******"
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Button
                    primary
                    raised
                    icon={<Ionicons name="ios-log-in" size={32} color="white" />}
                    style={{width:10}}
                    text=" Login"
                    onPress={this.handleLogin}
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

export default connect(mapStateToProps,{loginUser})(LoginScreen)