import React, {Component} from 'react'
import Select from 'react-select'
import {NotificationManager} from 'react-notifications';
import axios from 'axios'
class DriverRegistration extends Component{
    state = {
        name:'',
        email:'',
        password:'',
        car_number: ''
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleChangeSelect = (selectedReason) => {
        console.log(selectedReason)
        /*this.setState({
            selectedReason
        });*/
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
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h4>Driver Registration</h4>
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

export default DriverRegistration