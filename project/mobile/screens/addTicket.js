import React from 'react'
import {View, Text, Picker} from 'react-native'
import { Button } from 'react-native-material-ui';
import {getTicketReasons, addTicket} from '../actions/ticketAction'
import {connect} from 'react-redux'
import TextInput from 'react-native-material-textinput'
import DatePicker from 'react-native-datepicker'
import { Select, Option } from 'react-native-select-list2';
import isEmpty from '../Validation/isEmpty';

class AddTicket extends React.Component {
    static navigationOptions = {
        title: 'Add Ticket',
    };

    state = {
        car_number: '',
        police_id: '',
        selectedReason: 0,
        other_documents: '',
        amount: '',
        issue_date: '',
        deadline_date: '',
        file: null
    }

    componentDidMount(){
        if (this.props.auth.isAuthenticated == false) {
            this.props.navigation.navigate('Login')
            //NotificationManager.error('Please Login to continue..')
        }
        else if(this.props.auth.user.user_type != 2){
            this.props.navigation.navigate('Dashboard')
            //NotificationManager.error('You are not allowed to enter this link')
        }
        else if(this.props.auth.isAuthenticated && this.props.auth.user.user_type == 2){    
            this.setState({
                police_id: this.props.auth.user.id
            });
            this.props.getTicketReasons();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.navigation.navigate('Login')
        }
    }

    handleSubmit = () => {
        this.props.addTicket(this.state);
        this.setState({
            car_number: '',
            police_id: '',
            selectedReason: 0,
            other_documents: '',
            amount: '',
            issue_date: '',
            deadline_date: ''

        });
        //NotificationManager.success('Ticket Added Successfully!')
    }

    render(){
        return(
            <View style={{padding: 10}}>
                <TextInput
                    label="Car Number:"
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(text) => this.setState({car_number: text})}
                    placeholder="DHK-MT-CHA-11-1414"
                    value={this.state.car_number}
                />
                

                <TextInput
                    label="Other Documents:"
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(text) => this.setState({other_documents: text})}
                    placeholder="License No. 11111"
                    value={this.state.other_documents}
                />

                <TextInput
                    label="Ticket Fee:"
                    style={{height: 40, borderColor: 'black', borderWidth: 1}}
                    onChangeText={(text) => this.setState({amount: text})}
                    placeholder="1234"
                    value={this.state.amount}
                />
                <DatePicker
                    date={this.state.deadline_date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2018-01-01"
                    maxDate="2020-12-30"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    placeholder="Pick Ticket Deadline Date"
                    style={{width: 300}}
                    onDateChange={(date) => {this.setState({deadline_date: date})}}
                />
                <Text>{"\n"}</Text>
                <Text>Ticket Reason:</Text>
                {!isEmpty(this.props.reasons) ? (
                    <Select onSelect= {(t,v)=>{this.setState({selectedReason: t})}}>
                        {this.props.reasons.map(rr => {
                            return (<Option key={rr.id} value={rr.id}>{rr.reason_name}</Option>)
                        })}
                    </Select>
                    ) : (
                        <Text></Text>
                    ) 
                }
                
                <Text>{"\n"}</Text>
                
                <Button
                    primary
                    raised
                    style={{width:10}}
                    text="ADD TICKET"
                    onPress={this.handleSubmit}
                />
            </View>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        reasons: state.ticket.reasons,
        errors: state.error,
        auth: state.auth
    }
}
export default connect(mapStateToProps, {getTicketReasons, addTicket})(AddTicket);