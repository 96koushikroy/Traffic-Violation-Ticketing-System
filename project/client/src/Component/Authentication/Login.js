import React, {Component} from 'react'
import { connect } from 'react-redux';
import {loginUser} from '../../Actions/authActions'
import isEmpty from '../../Validation/isEmpty'

class Login extends Component{
    state = {
        email: '',
        password: '',
        error: {}
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if (nextProps.error) {
            this.setState({ error: nextProps.error });
        }
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
                    <div></div>
                )
            }

        }

        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h5><strong>Login</strong></h5>
                        <br/>
                        <ErrorPanel />
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
    { loginUser }
  )(Login);