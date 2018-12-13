import React from 'react'
import {View, Text} from 'react-native'
import TextInput from 'react-native-material-textinput'
import { Button } from 'react-native-material-ui';
import {connect} from 'react-redux'
import {getPoliceProfile, updatePoliceProfile} from '../actions/profileAction'
import isEmpty from '../Validation/isEmpty'


class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };

    state = {
        name:'',
        email:'',
        password:'',
        car_number:''
    }

    componentDidMount(){
        if (this.props.auth.isAuthenticated == false) {
            this.props.navigation.navigate('Login')
        }
        else if(this.props.auth.user.user_type == 1){
            //this.props.getDriverProfile()
        }
        else if(this.props.auth.user.user_type == 2){
            this.props.getPoliceProfile()
        }
        else{
            // user type  == 3 Admin
            //this.props.getAdminProfile()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.history.push('/login');
        }
        if(!isEmpty(nextProps.profile)){
            this.setState(nextProps.profile)
            this.setState({
                password:''
            })
        }
    }

    handleSubmit = () => {
        const newData = this.state
        delete newData.car_number

        if(this.props.auth.user.user_type == 1){
            //this.props.updateDriverProfile(this.state)
        }
        else if(this.props.auth.user.user_type == 2){
            this.props.updatePoliceProfile(newData)
        }
        //NotificationManager.success('Profile Updated Successfully')
        
    }


    render(){
        const {error} = this.state;
        const ErrorMessage = () => {
            if(!isEmpty(error)){
                return(
                    <Text style={{textAlign: 'center', fontSize: 12, color: 'red'}}>
                        {"\n"}
                        {error.title}
                        {"\n"}
                    </Text>
                )
            }
            else{
                return(
                    <Text></Text> //need to return an empty div to finish the condition
                )
            }
        }
        let Profile = this.props.profile;
        
        let ProfileData = isEmpty(Profile) ? (
            <Text>Loading Profile</Text>
        ) : (
            <View>
                <Text style={{textAlign: 'center', fontSize: 15}}>Profile ID: {Profile.id} {"\n"}</Text>
                <TextInput
                    label="Name:"
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(text) => this.setState({name: text})}
                    placeholder="John Doe"
                    value={this.state.name}
                />
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
                    secureTextEntry={true}
                />
                <Button
                    primary
                    raised
                    style={{width:10}}
                    text="UPDATE Profile"
                    onPress={this.handleSubmit}
                />
            </View>
        )
        return(
            <View style={{padding: 10}}>
                <ErrorMessage />
                
                {ProfileData}
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.error,
        auth: state.auth,
        profile: state.profile.profile
    }
}


export default connect(mapStateToProps,{getPoliceProfile, updatePoliceProfile})(Profile)