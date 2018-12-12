import React from 'react'
import {View, Text, Button, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {getTicketReasons} from '../actions/ticketAction'


class LoginScreen extends React.Component {
    state = {
        email: '',
        password: ''
    }

    static navigationOptions = {
        title: 'Login',
    };

    componentDidMount(){
        this.props.getTicketReasons()
    }

    render(){
        return(
            <View>
                <Text>Login Screen</Text>
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
                    onPress={() => console.log(this.props.reasons)}
                />
            </View>
        )
    }

}
const mapStateToProps = (state, ownProps) => {
    return {
        reasons: state.ticketReason.reasons
    }
}

export default connect(mapStateToProps,{getTicketReasons})(LoginScreen)