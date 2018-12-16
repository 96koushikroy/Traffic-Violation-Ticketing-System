import React, {Component} from 'react'
import {connect} from 'react-redux'
import {viewPolice,deletePolice} from '../../Actions/policeActions'
import {NotificationManager} from 'react-notifications';

class ViewPolice extends Component {
    
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
            let pid = this.props.match.params.pid;
            this.props.viewPolice(pid);
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.history.push('/login');
        }
    }

    handleDelete = (e) => {
        console.log('deleting ' + e.target.id)
        let rr = window.confirm("Are you sure to delete this!?");
        if (rr == true) {
            this.props.deletePolice(e.target.id)
            this.props.history.push('/police/view');
        }
        
    }
    
    render(){
        let Data = (this.props.police) != null ? (
            <div>
                <h1>Police Data: </h1>
                <h2>Police Id: {this.props.police.id}</h2>
                <h2>Police Name: {this.props.police.name}</h2>
                <h2>Police Email: {this.props.police.email}</h2>
                <button onClick={this.handleDelete} id={this.props.police.id} className="btn btn-danger">Delete</button>
            </div>
        ) 
        : (<h1>Loading data</h1>)
        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        {Data}
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        police: state.police.police,
        auth: state.auth
    }
};

export default connect(mapStateToProps, {viewPolice,deletePolice})(ViewPolice)
