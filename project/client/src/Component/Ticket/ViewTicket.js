import React, {Component} from 'react'
import {connect} from 'react-redux'
import {viewTicket, approveSingleTicket} from '../../Actions/ticketActions'
import isEmpty from '../../Validation/isEmpty'
import {NotificationManager} from 'react-notifications';

class ViewTicket extends Component {

    componentDidMount(){
        if (this.props.auth.isAuthenticated == false) {
            this.props.history.push('/login');
            NotificationManager.error('Please Login to continue..')
        }
        else{
            let tid = this.props.match.params.tid;
            this.props.viewTicket(tid);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.history.push('/login');
        }
        let tid = this.props.match.params.tid;
        this.props.viewTicket(tid);
        //console.log(nextProps)
    }

    handleApprove = (e) => {
        let rr = window.confirm("Are you sure to approve this!?");
        if (rr == true) {
            this.props.approveSingleTicket(e.target.id)
            let tid = this.props.match.params.tid;
            this.props.viewTicket(tid);
        }
    }
    

    render(){
        const { isAuthenticated, user } = this.props.auth;
        let TicketData = isEmpty(this.props.ticket) ? (
            <p>Data Loading...</p>
        ) : (

            <div className="card mb-3">
                <h3 className="card-header">Ticket Information</h3>
                <div className="card-body">
                    <h5 className="card-title">Ticket ID: {this.props.ticket.id}</h5>
                    <h5 className="card-title">Ticket Amount: {this.props.ticket.amount} Tk</h5>
                    {
                        this.props.ticket.status == 0 ? (
                            <li className="list-group-item">Ticket Status:&nbsp;&nbsp;<span className="badge badge-warning">Pending</span></li>
                        ) : (
                            <li className="list-group-item">Ticket Status:&nbsp;&nbsp;<span className="badge badge-success">Approved</span></li>
                        )
                    }
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Car Number: {this.props.ticket.car_number}</li>
                    <li className="list-group-item">Ticket Reason: {this.props.ticket.ticket_reason.reason_name}</li>
                    <li className="list-group-item">Ticket Issue Date: {this.props.ticket.issue_date}</li>
                    <li className="list-group-item">Ticket Deadline Date: {this.props.ticket.deadline_date}</li>
                    <li className="list-group-item">Other Document Information: {this.props.ticket.other_documents}</li>
                    
                </ul>
            </div>
        )
        let DriverData = isEmpty(this.props.ticket) ? (
            <p>Data Loading...</p>
        ) : (

            <div className="card mb-3">
                <h3 className="card-header">Driver Information</h3>
                <div className="card-body">
                    <h5 className="card-title">Driver ID: {this.props.ticket.driver.id}</h5>
                    <h5 className="card-title">Driver Name: {this.props.ticket.driver.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Driver Email: {this.props.ticket.driver.email}</li>
                </ul>
            </div>
        )

        let PoliceData = isEmpty(this.props.ticket) ? (
            <p>Data Loading...</p>
        ) : (
            <div className="card mb-3">
                <h3 className="card-header">Police Information</h3>
                <div className="card-body">
                    <h5 className="card-title">Police ID: {this.props.ticket.polouse.id}</h5>
                    <h5 className="card-title">Police Name: {this.props.ticket.polouse.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Police Email: {this.props.ticket.polouse.email}</li>
                </ul>
            </div>
        )

        let ApproveButton = isEmpty(this.props.ticket) ? (
            <div></div>
        ):(
            this.props.ticket.status == 0 ? (
                <button type="button" onClick={this.handleApprove} id={this.props.ticket.id}  className="btn btn-outline-warning btn-lg">Approve Ticket</button>
            ) : (
                <div></div>
            )
            
        )

        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-4">
                        {TicketData}
                        <br/>
                        {isAuthenticated && user.user_type == 3 &&
                            ApproveButton
                        }
                    </div>
                    <div className="col-md-4">
                        {DriverData}
                    </div>
                    <div className="col-md-4">
                        {PoliceData}
                    </div>
                    
                </div>
            </div>
        )
    }



}
const mapStateToProps = (state) => {
    return {
        ticket: state.ticket.ticket,
        auth: state.auth
    }
};
export default connect(mapStateToProps,{viewTicket, approveSingleTicket})(ViewTicket)