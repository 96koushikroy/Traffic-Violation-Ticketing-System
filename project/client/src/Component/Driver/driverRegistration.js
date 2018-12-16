import React, {Component} from 'react'
import Select from 'react-select'
import {NotificationManager} from 'react-notifications';
import axios, {post} from 'axios'
import { connect } from 'react-redux';
import {loginUser, googleLoginUser} from '../../Actions/authActions'
import isEmpty from '../../Validation/isEmpty'
import { GoogleLogin } from 'react-google-login';
import { ClipLoader } from 'react-spinners';

class DriverRegistration extends Component{
    state = {
        name:'',
        email:'',
        password:'',
        car_number: '',
        file: null,
        loading: false
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

    onChange = (e) => {
        this.setState({
            file:e.target.files[0]
        })
    }
    handleFileSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file',this.state.file);
        formData.append('apikey','47cfc563df88957');
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        this.setState({
            loading: true
        })
        axios.post("https://api.ocr.space/parse/image",formData,config)
        .then((response) => {
            this.setState({
                loading: false
            })
            console.log(response.data.ParsedResults[0]);
            let ocrRes = response.data.ParsedResults[0].ParsedText
            if(isEmpty(ocrRes)){
                NotificationManager.error('Server did not return any result');
            }
            this.setState({
                car_number: response.data.ParsedResults[0].ParsedText
            })
        })
        .catch((error) => {
            console.log(error)
        });
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
                            <br/>
                            <div className="input-field">
                                <label htmlFor="car_number_file">Upload Your Car Number Photo: </label>
                                <br/>
                                <input type="file" id="car_number_file" onChange={this.onChange} />
                                <button id="submitFile" onClick={this.handleFileSubmit}>Upload</button>
                                <br/><br/>
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={50}
                                    color={'#123abc'}
                                    loading={this.state.loading}
                                />
                                <br/>
                                <label htmlFor="car_number">Car Number</label>
                                <input type="text" id="car_number" className="form-control" value={this.state.car_number}  onChange={this.handleChange}/>
                                
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