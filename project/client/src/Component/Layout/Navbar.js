import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {logoutUser} from '../../Actions/authActions'


class Navbar extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser()
    }

    render(){
        const { isAuthenticated, user } = this.props.auth;
        
        const LoginButton = () => {
            return (<li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>)
        }

        const LogoutButton = () => {
            return (<li className="nav-item"><a className="nav-link" href="" onClick={this.handleLogout}>Logout</a></li>)
        }
        
        const UserProfile = () => {
            return (<li className="nav-item"><Link className="nav-link" to="" >{user.name}</Link></li>)
        }

        const AuthNav = () => {
            if(isAuthenticated){
                return (
                    <div>
                        <UserProfile />
                        <LogoutButton />
                    </div>
                )
            }
            else{
                return <LoginButton />
            }
        }

        return(
            <div>
                <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">Traffic Ticketing System</Link>
                        </div>
                        <ul className="nav navbar-nav">
                            
                            <AuthNav />
                            <li className="nav-item"><Link className="nav-link" to="/addticketreason">Add Ticket Reason</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/addticket">Add Ticket</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/register/police">Police Registration</Link></li>
                        </ul>
                    </div>
                </nav>
                <br/><br/><br/><br/><br/>    
            </div>
        )
    
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{logoutUser})(Navbar)