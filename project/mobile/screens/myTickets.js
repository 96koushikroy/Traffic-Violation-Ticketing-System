import React from 'react'
import {View, Text, Button} from 'react-native'
import {connect} from 'react-redux'
import { ListItem } from 'react-native-material-ui';
import {getTickets,getTicketReasons} from '../actions/ticketAction'
import isEmpty from '../Validation/isEmpty'

class MyTickets extends React.Component {
    static navigationOptions = {
        title: 'My Tickets',
    };


    componentDidMount(){
        if (this.props.auth.isAuthenticated == false) {
            this.props.navigation.navigate('Login')
        }
        else if(this.props.auth.user.user_type != 2){
            this.props.navigation.navigate('Dashboard')
        }
        else if(this.props.auth.isAuthenticated && this.props.auth.user.user_type == 2){
            this.props.getTickets();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.navigation.navigate('Login')
        }
    }

    render(){
        const Tickets = this.props.ticket;

        const TicketList = !isEmpty(Tickets) ? (
            Tickets.map((ticket)=>{
                return(
                    <ListItem
                        key = {ticket.id}
                        divider
                        centerElement={{
                            primaryText: ticket.car_number,
                            secondaryText: ticket.issue_date
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('ViewTicket', {
                                id: ticket.id,
                            });
                        }}
                    />
                )
            })
        ) :
        (
            <Text>No Data Available..</Text>
        )

        return(
            <View style={{padding: 10}}>
                {TicketList}
            </View>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        ticket: state.ticket.tickets,
        errors: state.error,
        auth: state.auth
    }
}
export default connect(mapStateToProps,{getTickets,getTicketReasons})(MyTickets)