import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addTicketReason,getTicketReasons, deleteTicketReason} from '../../Actions/ticketReasonActions'
class AddTicketReason extends Component{
    state = {
        reason_name: '',
        reason_details: '',
        reasons:[]
    }
    
    componentDidMount(){

        this.props.getTicketReasons();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const TicketReason = {
            reason_name: this.state.reason_name,
            reason_details: this.state.reason_details
        }
        
        this.props.addTicketReason(TicketReason)

        this.setState({
            reason_name:'',
            reason_details:''
        });
        this.props.getTicketReasons();
    }

    handleDelete = (e) => {
        this.props.deleteTicketReason(e.target.id);
    }

    render(){

        const TicketList = this.props.reasons.map((reasons)=>{
            return(
                <tr key={reasons.id}>
                    <td>{reasons.id}</td>
                    <td>{reasons.reason_name}</td>
                    <td>{reasons.reason_details}</td>
                    <td><button className="btn btn-danger" id={reasons.id} onClick={this.handleDelete}>Delete</button></td>
                </tr>
            )
        })

        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form onSubmit={this.handleSubmit}>
                            <h5 className="text-center">Add Ticket Reason</h5>

                            <div className="input-field">
                                <label htmlFor="reason_name">Ticket Reason Name</label>
                                <input type="text" id="reason_name" className="form-control" value={this.state.reason_name} onChange={this.handleChange}/>
                            </div>
                            <br/>
                            <div className="input-field">
                                <label htmlFor="reason_details">Ticket Reason Details</label>
                                <input type="text" id="reason_details" className="form-control" value={this.state.reason_details} onChange={this.handleChange}/>
                            </div>
                            <br/>
                            <div className="input-field">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <br/><br/>
                <div className="row text-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                    <h5>Ticket Reasons List</h5>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Ticket Reason ID</th>
                            <th scope="col">Ticket Reason Name</th>
                            <th scope="col">Ticket Reason Details</th>
                            <th scope="col">Delete Ticket?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TicketList}
                        </tbody>
                    </table>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                
            </div>
        )
    }


}


const mapStateToProps = (state, ownProps) => {
    return {
        reasons: state.ticketReason.reasons
    }
}

export default connect(mapStateToProps, {addTicketReason, getTicketReasons, deleteTicketReason})(AddTicketReason);