import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getDriverTickets} from '../../Actions/ticketActions'
import isEmpty from '../../Validation/isEmpty'
import {NotificationManager} from 'react-notifications';
import {Link} from 'react-router-dom'

class ViewAllTicketDriver extends Component{
    state = {
        searchText: '',
        pendingTickets:[],
        resolvedTickets:[]
    }
    componentDidMount(){
        const Auth = this.props.auth
        if (Auth.isAuthenticated == false) {
            this.props.history.push('/login');
            NotificationManager.error('Please Login to continue..')
        }
        else if(Auth.isAuthenticated == true && Auth.user.user_type != 1){
            this.props.history.push('/');
            NotificationManager.error('You are not allowed to enter this link')
        }
        else{
            this.props.getDriverTickets()
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.history.push('/login');
        }
        if(!isEmpty(nextProps.tickets)){
            this.setState({
                pendingTickets: nextProps.tickets.filter(ticket => ticket.status == 0)
            })
            this.setState({
                resolvedTickets: nextProps.tickets.filter(ticket => ticket.status == 1)
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    render(){
        let resolvedTickets = this.state.resolvedTickets
        let pendingTickets = this.state.pendingTickets
        let search = this.state.searchText.trim().toLowerCase();
        if(!isEmpty(search)){
            resolvedTickets = resolvedTickets.filter(function(ticket) {
                return ticket.issue_date.toLowerCase().match(search);
            });
        }
        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-6">
                        <h4>Pending Tickets</h4>
                        <hr/>
                        {
                            isEmpty(pendingTickets) ? (
                                <p>No search Results</p>
                            ) : (
                                pendingTickets.map((ticket) => {
                                    return(
                                        <div className="cardElem" key={ticket.id}>
                                            <div className="card border-warning" >
                                                <div className="card-body">
                                                    <h4 className="card-title">{ticket.car_number}</h4>
                                                    <h6 className="card-subtitle mb-2 text-muted">Driver ID: {ticket.driver_id}</h6>
                                                    <h6 className="card-subtitle mb-2 text-muted">Issue Date: {ticket.issue_date}</h6>
                                                    <h6 className="card-subtitle mb-2 text-muted">Deadline: {ticket.deadline_date}</h6>
                                                    <Link to={"/ticket/view/" + ticket.id} className="card-link btn btn-outline-primary">View</Link>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    )
                                })
                            )
                            
                        }
                    </div>
                    <div className="col-md-6">
                        <h4>Resolved Tickets</h4>
                        <div className="input-field">
                            <input type="text" id="searchText" className="form-control" value={this.state.searchText} placeholder="Enter your issue date here.."  onChange={this.handleChange}/>
                        </div>
                        <br/>
                        {
                            isEmpty(resolvedTickets) ? (
                                <p>No search Results</p>
                            ) : (
                                resolvedTickets.map((ticket) => {
                                    return(
                                        <div className="cardElem" key={ticket.id}>
                                            <div className="card border-success" >
                                                <div className="card-body">
                                                    <h4 className="card-title">{ticket.car_number}</h4>
                                                    <h6 className="card-subtitle mb-2 text-muted">Driver ID: {ticket.driver_id}</h6>
                                                    <h6 className="card-subtitle mb-2 text-muted">Issue Date: {ticket.issue_date}</h6>
                                                    <h6 className="card-subtitle mb-2 text-muted">Deadline: {ticket.deadline_date}</h6>
                                                    <Link to={"/ticket/view/" + ticket.id} className="card-link btn btn-outline-primary">View</Link>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    )
                                })
                            )
                            
                        }
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.error,
        auth: state.auth,
        tickets: state.ticket.tickets
    }
}

export default connect(mapStateToProps, {getDriverTickets}) (ViewAllTicketDriver)