import React, {Component} from 'react'
import { connect } from 'react-redux';
import {loginUser, googleLoginUser} from '../../Actions/authActions'
import isEmpty from '../../Validation/isEmpty'
import { GoogleLogin } from 'react-google-login';
class Login extends Component{
    state = {
        name: '',
        email: '',
        password: '',
        error: {}
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
        if (nextProps.error) {
            this.setState({ error: nextProps.error });
        }
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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const UserData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(UserData);

    }

    render(){
        const {error} = this.state;
        const ErrorPanel = () => {
            if(!isEmpty(error)){
                return(
                    <div className="alert alert-dismissible alert-danger">
                        <strong>Oh snap!</strong> {error.title}
                    </div>
                )
            }
            else{
                return(
                    <div></div> //need to return an empty div to finish the condition
                )
            }
        }

        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h3><strong>Login</strong></h3>
                        <br/>
                        <ErrorPanel />
                        
                        <hr/>

                        <form onSubmit={this.handleSubmit}>
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
                                <button className="btn btn-primary">LOGIN</button>
                            </div>    
                        </form>
                        <br/>
                        <h4>Or,</h4>
                        <br/>
                        <GoogleLogin
                            clientId="831620844321-oseic0v8rfnevtmf3kbc2f487kbrkred.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={this.successResponseGoogle}
                            onFailure={this.errorResponseGoogle}
                        />
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});
  
  export default connect(
    mapStateToProps,
    { loginUser, googleLoginUser }
  )(Login);

  /*
  
  auth:
    isAuthenticated: true
    user:
        email: "96koushikroy@gmail.com"
        exp: 1543865295
        iat: 1543861695
        id: "5gt9n4joxfoz8z"
        name: "Koushik Roy"
        user_type: 2


*/