import React, {Component} from 'react'
import {addPolice} from '../../Actions/policeActions'
import {connect} from 'react-redux'
import {NotificationManager} from 'react-notifications';

class PoliceRegistration extends Component{

    state = {
        name:'',
        email:'',
        password:'',
    }
    
    componentDidMount(){
        const Auth = this.props.auth
        if(Auth.isAuthenticated == false){
            this.props.history.push('/login');
            NotificationManager.error('Please Login to continue..')
            //error message
        }
        else if(Auth.isAuthenticated == true && Auth.user.user_type != 3){
            this.props.history.push('/');
            //error message
            NotificationManager.error('You are not allowed to enter this link')
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.history.push('/login');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addPolice(this.state);
        this.setState({
            name:'',
            email:'',
            password:''
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render(){
        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h3>Police Officer Registration Form</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-field">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" className="form-control" value={this.state.name}  onChange={this.handleChange}/>
                            </div>
                            <br/>

                            <div className="input-field">
                                <label htmlFor="email">Email</label>
                                <input type="text" id="email" className="form-control" value={this.state.email}  onChange={this.handleChange}/>
                            </div>
                            <br/>

                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" className="form-control" value={this.state.password}  onChange={this.handleChange}/>
                            </div>
                            <br/>

                            <div className="input-field">
                                <button className="btn btn-primary">Submit</button>
                            </div>

                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = (state, ownProps) => {
    return {
        police: state.police.polices,
        error: state.error,
        auth: state.auth
    }
}

export default connect(
    mapStateToProps,
    { addPolice }
  )(PoliceRegistration);