import React, {Component} from 'react'


class PoliceRegistration extends Component{

    state = {
        name:'',
        email:'',
        password:'',
    }

    handleSubmit = (e) => {

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

export default PoliceRegistration