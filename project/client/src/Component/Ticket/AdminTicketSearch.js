import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAdminAllTickets} from '../../Actions/ticketActions'
import isEmpty from '../../Validation/isEmpty'
import {NotificationManager} from 'react-notifications';
import {Link} from 'react-router-dom'


class AdminTicketSearch extends Component {
    state = {
        searchText: '',
        ticketList: []
    }

    componentDidMount(){
        const Auth = this.props.auth
        if (Auth.isAuthenticated == false) {
            this.props.history.push('/login');
            NotificationManager.error('Please Login to continue..')
        }
        else if(Auth.isAuthenticated == true && Auth.user.user_type != 3){
            this.props.history.push('/');
            NotificationManager.error('You are not allowed to enter this link')
        }
        else{
            this.props.getAdminAllTickets()
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.history.push('/login');
        }
        this.setState({
            ticketList: nextProps.tickets
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render(){
        let Tickets = this.state.ticketList;
        let search = this.state.searchText.trim().toLowerCase();
        if(!isEmpty(search)){
            Tickets = Tickets.filter(function(ticket) {
                return ticket.car_number.toLowerCase().match(search);
            });
        }


        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h3>Ticket Search</h3>
                        <div className="input-field">
                            <input type="text" id="searchText" className="form-control" value={this.state.searchText} placeholder="Enter the car number here.."  onChange={this.handleChange}/>
                        </div>
                        <br/>
                        <br/>
                        {
                            isEmpty(Tickets) ? (
                                <p>No search Results</p>
                            ) : (
                                Tickets.map((ticket) => {
                                    return(
                                        <div className="cardElem" key={ticket.id}>
                                            <div className="card" >
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
                    <div className="col-md-3"></div>
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

export default connect(mapStateToProps, {getAdminAllTickets})(AdminTicketSearch)