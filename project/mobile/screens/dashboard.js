import React from 'react'
import {View, Text} from 'react-native'

class DashboardScreen extends React.Component{
    static navigationOptions = {
        title: 'Dashboard',
    };
    render(){
        return(
            <View>
                <Text>Dashboard Screen</Text>
            </View>
        )
    }
}

export default DashboardScreen