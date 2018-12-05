import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import {logoutUser} from '../../Actions/authActions'
import {NotificationManager} from 'react-notifications';

class Navbar extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser()
        NotificationManager.info('Logged Out Successfully');
        
    }

    render(){
        const { isAuthenticated, user } = this.props.auth;
        
        const LoginButton = () => {
            return (<li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>)
        }

        const LogoutButton = () => {
            return (<li className="nav-item"><Link className="nav-link" to="" onClick={this.handleLogout}>Logout</Link></li>)
        }
        
        const UserProfile = () => {
            return (<li className="nav-item"><Link className="nav-link" to="" >{user.name}</Link></li>)
        }

        const AddTicket = () => {
            return (<li className="nav-item"><Link className="nav-link" to="/addticket">Add Ticket</Link></li>)
        }

        const AddTicketReason = () => {
            return (<li className="nav-item"><Link className="nav-link" to="/addticketreason">Add Ticket Reason</Link></li>)
        }

        const RegisterPolice = () => {
            return (<li className="nav-item"><Link className="nav-link" to="/register/police">Police Registration</Link></li>)
        }

        const ViewAllPolice = () => {
            return (<li className="nav-item"><Link className="nav-link" to="/police/view">Police List</Link></li>)
        }

        
        const RegisterDriver = () => {
            return (<li className="nav-item"><Link className="nav-link" to="/register/driver">Driver Registration</Link></li>)
        }

        return(
            <div>
                <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">Traffic Ticketing System</Link>
                        </div>
                        <ul className="nav navbar-nav">
                            {!isAuthenticated &&
                                <RegisterDriver />
                            }
                            {isAuthenticated && user.user_type == 2 &&
                                <AddTicket />
                            }
                            {isAuthenticated && user.user_type == 3 &&
                                <AddTicketReason />
                            }
                            {isAuthenticated && user.user_type == 3 &&
                                <RegisterPolice />
                            }
                            {isAuthenticated && user.user_type == 3 &&
                                <ViewAllPolice />
                            }
                            {isAuthenticated &&
                                    <UserProfile />
                            }
                            {isAuthenticated ?  (
                                <LogoutButton />
                                ):(
                                    <LoginButton />
                                )
                            }
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