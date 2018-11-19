import React, {Component} from 'react'
import {connect} from 'react-redux'
import {viewTicket} from '../../Actions/ticketActions'
class ViewTicket extends Component {

    componentDidMount(){
        let tid = this.props.match.params.tid;
        this.props.viewTicket(tid);

    }

    render(){
        let Data = (this.props.ticket) != null ? (<div>
            <h2>Ticket Id: {this.props.ticket[0].id}</h2>
            <h2>Issue Date: {this.props.ticket[0].issue_date}</h2>
            <h2>Deadline Date: {this.props.ticket[0].deadline_date}</h2>
            <h2>Car number: {this.props.ticket[0].car_number}</h2>
            <h2>Amount: {this.props.ticket[0].amount}</h2>
        </div>) 
        : (<h1>Loading data</h1>)
        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        {Data}
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>

        )
        
    }



}
const mapStateToProps = (state) => {
    return {
        ticket: state.ticket.ticket
    }
};
export default connect(mapStateToProps,{viewTicket})(ViewTicket)