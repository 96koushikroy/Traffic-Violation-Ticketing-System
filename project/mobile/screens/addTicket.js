import React from 'react'
import {View, Text, Button} from 'react-native'


class AddTicket extends React.Component {
    static navigationOptions = {
        title: 'Add Ticket',
    };
    render(){
        return(
            <View>
                <Text>Add Ticket</Text>
            </View>
        )
    }
}

export default AddTicket