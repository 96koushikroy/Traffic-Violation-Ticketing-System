import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import isEmpty from '../Validation/isEmpty'
import {viewTicket, deleteTicket} from '../actions/ticketAction'
import { BottomNavigation, Card, Button } from 'react-native-material-ui';


class ViewTicket extends React.Component{
    static navigationOptions = {
        title: 'Ticket Details',
    };

    state = {
        active: '',

    }

    componentDidMount(){
        if (this.props.auth.isAuthenticated == false) {
            this.props.navigation.navigate('Login')
        }
        else if(this.props.auth.user.user_type != 2){
            this.props.navigation.navigate('Dashboard')
        }
        else if(this.props.auth.isAuthenticated && this.props.auth.user.user_type == 2){
            const tid = this.props.navigation.getParam('id', 0);
            this.props.viewTicket(tid);
        }
        this.setState({
            active: 'ticket'
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.navigation.navigate('Login')
        }
    }
    
    render(){
        const Ticket = this.props.ticket
        const tid = (!isEmpty(Ticket)) ? (
            <Card style={styles.boxWithShadow}>
                <Text style={{fontSize: 20}}>Ticket ID: {Ticket.id}</Text>
                <Text style={{fontSize: 20}}>Ticket Issue Date: {Ticket.issue_date}</Text>
                <Text style={{fontSize: 20}}>Ticket Amount: {Ticket.issue_date}</Text>
                <Text style={{fontSize: 20}}>Ticket Reason: {Ticket.ticket_reason.reason_name}</Text>
                <Text style={{fontSize: 20}}>Ticket Deadline Date: {Ticket.deadline_date}</Text>
                {
                    Ticket.status == 0 ? (
                        <Text style={{fontSize: 20}}>Ticket Staus: Pending</Text>
                    ) : (
                        <Text style={{fontSize: 20}}>Ticket Deadline Date: Approved</Text>
                    )
                }
                <Text style={{fontSize: 20}}>Ticket Deadline Date: {Ticket.deadline_date}</Text>
                <Text style={{fontSize: 20}}>Ticket Other Doc: {Ticket.other_documents} {"\n"}</Text>
                <Button
                    accent
                    raised
                    text="Delete Ticket"
                    onPress={() => {
                            this.props.deleteTicket(Ticket.id)
                            this.props.navigation.navigate('MyTickets')
                        }
                    }
                />
            </Card>
        ) : (
            <Text></Text>
        )
        const did = (!isEmpty(Ticket)) ? (
            <Card>
                <Text style={{fontSize: 20}}>Driver ID: {Ticket.driver_id}</Text>
                <Text style={{fontSize: 20}}>Car Number: {Ticket.driver.car_number}</Text>
                <Text style={{fontSize: 20}}>Name: {Ticket.driver.name}</Text>
                <Text style={{fontSize: 20}}>Email: {Ticket.driver.email}</Text>
            </Card>
            
        ) : (
            <Text></Text>
        )
        const pid = (!isEmpty(Ticket)) ? (
            <Card>
                <Text style={{fontSize: 20}}>Police ID: {Ticket.driver_id}</Text>
                <Text style={{fontSize: 20}}>Name: {Ticket.polouse.name}</Text>
                <Text style={{fontSize: 20}}>Email: {Ticket.polouse.email}</Text>
            </Card>
        ) : (
            <Text></Text>
        )

        
        return(
            <View style={{flex: 1}}>
                <View style={{padding: 10, fontSize: 15}}>
                    {this.state.active == 'ticket' &&
                        tid
                    }
                    {this.state.active == 'driver' &&
                        did
                    }
                    {this.state.active == 'police' &&
                        pid
                    }
                </View>
                <View style={styles.bottomNavigation}>
                    <BottomNavigation active={this.state.active} hidden={false} >
                            <BottomNavigation.Action
                                key="ticket"
                                icon="confirmation-number"
                                label="Ticket"
                                onPress={() => this.setState({ active: 'ticket' })}
                            />
                            <BottomNavigation.Action
                                key="police"
                                icon="security"
                                label="Police"
                                onPress={() => this.setState({ active: 'police' })}
                            />
                            <BottomNavigation.Action
                                key="driver"
                                icon="people"
                                label="Driver"
                                onPress={() => this.setState({ active: 'driver' })}
                            />
                    </BottomNavigation>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    bottomNavigation: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 56
    },
    boxWithShadow: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        ticket: state.ticket.ticket,
        errors: state.error,
        auth: state.auth
    }
}
export default connect(mapStateToProps,{viewTicket, deleteTicket})(ViewTicket)