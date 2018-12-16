import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllPolice, deletePolice} from '../../Actions/policeActions'
import {NotificationManager} from 'react-notifications';
import isEmpty from '../../Validation/isEmpty'
import {Link} from 'react-router-dom'

class ViewAllPolice extends Component {
    state = {
        searchText:'',
        policeResult: []
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentDidMount(){
        if (this.props.auth.isAuthenticated == false) {
            this.props.history.push('/login');
            NotificationManager.error('Please Login to continue..')
        }
        else if(this.props.auth.user.user_type != 3){
            this.props.history.push('/');
            NotificationManager.error('You are not allowed to enter this link')
        }
        else if(this.props.auth.isAuthenticated && this.props.auth.user.user_type == 3){
            this.props.getAllPolice()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.history.push('/login');
        }
        this.setState({
            policeResult: nextProps.police
        })
    }

    handleDelete = (e) => {
        let rr = window.confirm("Are you sure to delete this!?");
        if (rr == true) {
            this.props.deletePolice(e.target.id)
        }
    }

    render(){
        let Polices = this.state.policeResult;
        let search = this.state.searchText.trim().toLowerCase();
        if(!isEmpty(search)){
            Polices = Polices.filter(function(police) {
                return police.name.toLowerCase().match(search);
            });
        }
        
        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h4>Police Search</h4>
                        <div className="input-field">
                            <input type="text" id="searchText" className="form-control" value={this.state.searchText} placeholder="Enter your search parameters here.."  onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <br/>
                <div className="row text-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h4>Police List</h4>
                        {
                            Polices.map((police) => {
                                return(
                                    <div className="card" key={police.id}>
                                        <div className="card-body">
                                            <h4 className="card-title">{police.name}</h4>
                                            <h6 className="card-subtitle mb-2 text-muted">{police.email}</h6>
                                            <Link to={"/police/view/" + police.id} className="card-link btn btn-outline-primary">View</Link>
                                            <button onClick={this.handleDelete} id={police.id}  className="card-link btn btn-outline-danger">Delete</button>
                                        </div>
                                    </div>
                                )
                            })
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
        police: state.police.polices
    }
}

export default connect(mapStateToProps,{getAllPolice, deletePolice})(ViewAllPolice)