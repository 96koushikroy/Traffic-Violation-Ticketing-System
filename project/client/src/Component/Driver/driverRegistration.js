import React, {Component} from 'react'
import Select from 'react-select'
import {NotificationManager} from 'react-notifications';
import axios from 'axios'
import { connect } from 'react-redux';
import {loginUser, googleLoginUser} from '../../Actions/authActions'
import isEmpty from '../../Validation/isEmpty'
import { GoogleLogin } from 'react-google-login';

class DriverRegistration extends Component{
    state = {
        name:'',
        email:'',
        password:'',
        car_number: ''
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.goBack();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.goBack();
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleChangeSelect = (selectedReason) => {
        //console.log(selectedReason)
        /*this.setState({
            selectedReason
        });*/
    }

    successResponseGoogle = (response) => {
        const UserData = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            password: ''
        }
        this.props.googleLoginUser(UserData);
    }

    errorResponseGoogle = (response) => {
        console.log(response);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const DriverData = this.state;
        axios
        .post('/api/driver/register', DriverData)
        .then(res => {
            this.props.history.push('/')
            NotificationManager.success('Registered Successfully');
            
        })
        .catch(err => {
            NotificationManager.error(err.response.data.title);
        })
    }

    render(){
        const Metropolitan = [
            { value: 'Dhaka', label: 'Dhaka' },
            { value: 'Chittagong', label: 'Chittagong' },
            { value: 'Khulna', label: 'Khulna' },
            { value: 'Rajshahi', label: 'Rajshahi' },
            { value: 'Barisal', label: 'Barisal' },
            { value: 'Sylhet', label: 'Sylhet' }
        ];
        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h3>Driver Registration</h3>
                        <hr/>
                        <GoogleLogin
                            clientId="831620844321-oseic0v8rfnevtmf3kbc2f487kbrkred.apps.googleusercontent.com"
                            buttonText="Signup with Google"
                            onSuccess={this.successResponseGoogle}
                            onFailure={this.errorResponseGoogle}
                        />
                        <br/>
                        <br/>
                        <h4>Or,</h4>
                        <br/>
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
                            <h5>Set your Car Number: </h5>
                            <div className="input-field">
                                <label htmlFor="car_number">Car Number</label>
                                <input type="text" id="car_number" className="form-control" value={this.state.car_number}  onChange={this.handleChange}/>
                                
                                {/*
                                <label htmlFor="metropolitan">Select Metropolitan</label>
                                <Select
                                onChange={this.handleChangeSelect}
                                options={Metropolitan}
                                />*/}
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

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});
  
  export default connect(
    mapStateToProps,
    { googleLoginUser }
  )(DriverRegistration);