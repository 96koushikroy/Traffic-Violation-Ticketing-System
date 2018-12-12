import React,{Component} from 'react'
import {connect} from 'react-redux'
import isEmpty from '../../Validation/isEmpty'
import {NotificationManager} from 'react-notifications';
import {getAdminProfile, getPoliceProfile, getDriverProfile} from '../../Actions/profileActions'
class UserProfile extends Component {
    state = {

    }
    componentDidMount(){
        if (this.props.auth.isAuthenticated == false) {
            this.props.history.push('/login');
            NotificationManager.error('Please Login to continue..')
        }
        else if(this.props.auth.user.user_type == 1){
            this.props.getDriverProfile()
        }
        else if(this.props.auth.user.user_type == 2){
            this.props.getPoliceProfile()
        }
        else{
            // user type  == 3 Admin
            this.props.getAdminProfile()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated == false) {
            this.props.history.push('/login');
        }
    }
    handleChange = (e) => {
        
    }

    render(){
        let Profile = this.props.profile;
        
        let ProfileData = isEmpty(Profile) ? (
            <p>Loading Profile</p>
        ) : (   
            <div className="card mb-3">
                <form>
                    <h3 className="card-header">
                        User ID: {Profile.id}
                    </h3>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Name: <input type="text" id="name" className="form-control" value={Profile.name} onChange={this.handleChange}/></li>
                        <li className="list-group-item">Email: <input type="text" id="email" className="form-control" value={Profile.email} onChange={this.handleChange}/></li>
                        {   
                            this.props.auth.user.user_type == 1 ? (
                                    <li className="list-group-item">Car Number: <input type="text" id="car_number" className="form-control" value={Profile.car_number} onChange={this.handleChange}/></li>
                            ) : (
                                    <div></div>
                            )
                                
                        }
                        <li className="list-group-item">Password: <input type="password" id="password" className="form-control" placeholder="Enter your new pass if you want to change" onChange={this.handleChange}/></li>
                        
                            
                        
                    </ul>
                    <div className="card-footer text-muted">
                        <button className="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        )
        return(
            <div className="container">
                <div className="row text-center">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h4>My Profile</h4>
                        <hr/>
                        {ProfileData}
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        )

    }



}


const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.error,
        auth: state.auth,
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps,{getAdminProfile, getPoliceProfile, getDriverProfile})(UserProfile)