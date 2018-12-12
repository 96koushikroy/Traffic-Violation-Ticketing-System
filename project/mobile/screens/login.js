import React from 'react'
import {View, Text, Button, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {loginUser} from '../actions/authAction'
import isEmpty from '../Validation/isEmpty'

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
        if (nextProps.error) {
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
        const {error} = this.state;
        const ErrorMessage = () => {
            if(!isEmpty(error)){
                return(
                    <Text>{error.title}</Text>
                )
            }
            else{
                return(
                    <Text></Text> //need to return an empty div to finish the condition
                )
            }
        }

        return(
            <View>
                <Text>Login Screen</Text>
                
                <ErrorMessage />

                <TextInput
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(text) => this.setState({email: text})}
                    placeholder="abc@abc.com"
                    value={this.state.text}
                />
                <TextInput
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(text) => this.setState({password: text})}
                    placeholder="******"
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Button
                    title="Login"
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