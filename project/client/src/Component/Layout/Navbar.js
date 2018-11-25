import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = () => {
    return(
        <div>
            <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Traffic Ticketing System</Link>
                    </div>
                    <ul className="nav navbar-nav">
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


export default Navbar