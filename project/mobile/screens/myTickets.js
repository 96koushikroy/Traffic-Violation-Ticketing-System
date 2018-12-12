import React from 'react'
import {View, Text, Button} from 'react-native'


class MyTickets extends React.Component {
    static navigationOptions = {
        title: 'My Tickets',
    };
    render(){
        return(
            <View>
                <Text>My Tickets</Text>
            </View>
        )
    }
}

export default MyTickets