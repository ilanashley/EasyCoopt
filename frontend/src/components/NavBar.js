import React from 'react';
import '../App.css';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <div className='navbarContainer'>
            <nav className="navbar navbar-light bg-white">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand"><img src='./images/easycoopt_logo.png' alt='logo' height='40px' /></a>
                    <div className="linkContainer">
                        <Link to="/referralslist"><a className="navbar-brand" style={{color: "#254383"}}>Cooptations</a></Link>
                        <Link to="/"> <a className="navbar-brand" style={{color: "#254383"}}>Annonces</a></Link> 
                        <Link to="/myaccount"> <button id="largeButton" style={{margin:"10px", color: "#FFFFF"}}> <PersonOutlineIcon fontSize="medium" /> </button> </Link> 
                        <button id="largeButton" style={{margin:"10px"}}>  <ExitToAppIcon fontSize="medium" /></button>
                    </div>
                </div>
            </nav>
        </div>
    )
    

}

export default NavBar