import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getTicketReasons} from '../../Actions/ticketReasonActions'
import {addTicket, getTickets, deleteTicket} from '../../Actions/ticketActions'
import Select from 'react-select'
import {Link} from 'react-router-dom'
import {NotificationManager} from 'react-notifications';
import isEmpty from '../../Validation/isEmpty'


class AddTicket extends Component{
    state = {
        car_number: '',
        police_id: '',
        selectedReason: null,
        other_documents: '',
        amount: '',
        issue_date: '',
        deadline_date: ''
    }

    componentDidMount(){
        if (this.props.auth.isAuthenticated == false) {
            this.props.history.push('/login');
            NotificationManager.error('Please Login to continue..')
        }
        else if(this.props.auth.user.user_type != 2){
            this.props.history.push('/');
            NotificationManager.error('You are not allowed to enter this link')
        }
        else if(this.props.auth.isAuthenticated && this.props.auth.user.user_type == 2){    
            this.setState({
                police_id: this.props.auth.user.id
            });
            this.props.getTicketReasons();
            this.props.getTickets();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.history.push('/login');
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    handleChangeSelect = (selectedReason) => {
        this.setState({
            selectedReason
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTicket(this.state);
        this.setState({
            car_number: '',
            police_id: '',
            selectedReason: null,
            other_documents: '',
            amount: '',
            issue_date: '',
            deadline_date: ''
        });
        this.props.getTickets();
    }

    handleDelete = (e) => {
        let rr = window.confirm("Are you sure to delete this!?");
        if (rr == true) {
            this.props.deleteTicket(e.target.id)
        }
    }

    render(){
        const options = [];
        this.props.reasons.map((reasons)=>{
            return(
                options.push({value: reasons.id, label: reasons.reason_name})
            )
        })
        const Tickets = this.props.tickets;
        const TicketList = !isEmpty(Tickets) ? (
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Ticket ID</th>
                    <th scope="col">Car Number</th>
                    <th scope="col">Issue Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">View Ticket?</th>
                    <th scope="col">Delete Ticket?</th>
                    </tr>
                </thead>
                <tbody>
                    {Tickets.map((ticket)=>{
                        return(
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.car_number}</td>
                                <td>{ticket.issue_date}</td>
                                <td>{ticket.amount}</td>
                                <td>{ticket.status}</td>
                                <td><Link to={"/ticket/view/" + ticket.id}><button className="btn btn-danger">View</button></Link></td>
                                <td><button className="btn btn-danger" id={ticket.id} onClick={this.handleDelete}>Delete</button></td>
                            </tr>
                        )
                    })}            
                    </tbody>
                </table>


        ) :
        (
            <p>No Data Available..</p>
        )
        
        




        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">

                        <form onSubmit={this.handleSubmit}>
                            <h5 className="text-center">Add Ticket</h5>

                            <div className="input-field">
                                <label htmlFor="car_number">Car Number</label>
                                <input type="text" id="car_number" className="form-control" value={this.state.car_number}  onChange={this.handleChange}/>
                            </div>
                            <br/>
                            <label htmlFor="">Ticket Reason</label>
                            <Select
                                value={this.state.selectedReason}
                                onChange={this.handleChangeSelect}
                                options={options}
                            />
                            <br/>

                            <div className="input-field">
                                <label htmlFor="other_documents">Other Documents</label>
                                <input type="text" id="other_documents" className="form-control" value={this.state.other_documents} onChange={this.handleChange}/>
                            </div>
                            <br/>
                            
                            <div className="input-field">
                                <label htmlFor="amount">Ticket Fee</label>
                                <input type="text" id="amount" className="form-control" value={this.state.amount} onChange={this.handleChange}/>
                            </div>
                            <br/>

                            <div className="input-field">
                                <label htmlFor="deadline_date">Deadline Date</label>
                                <input type="date" id="deadline_date" className="form-control" value={this.state.deadline_date} onChange={this.handleChange}/>
                            </div>
                            <br/>

                            <div className="input-field">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>

                    </div>
                    
                    <div className="col-md-4"></div>
                </div>
                <br/>
                <br/>
                <div className="row text-center">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <h5>My Tickets</h5>
                            {TicketList}
                        </div>
                        <div className="col-md-1"></div>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        reasons: state.ticketReason.reasons,
        tickets: state.ticket.tickets,
        errors: state.error,
        auth: state.auth
    }
}
export default connect(mapStateToProps, {getTicketReasons,addTicket,getTickets,deleteTicket})(AddTicket);