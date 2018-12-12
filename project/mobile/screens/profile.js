import React from 'react'
import {View, Text, Button} from 'react-native'


class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };
    render(){
        return(
            <View>
                <Text>My Profile</Text>
            </View>
        )
    }
}

export default Profile