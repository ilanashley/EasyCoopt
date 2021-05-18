import React from 'react';
import '../App.css';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <div className='navbarContainer'>
            <nav className="navbar navbar-light bg-white">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand"><img src='./images/easycoopt_logo.png' alt='logo' height='100px' /></a>
                    <div className="linkContainer">
                        <a href="#" className="navbar-brand">Cooptations</a>
                        <a href="#" className="navbar-brand">Annonces</a>
                        <Link to="/myaccount"> <button id="largeButton" style={{margin:"10px", color: "#FFFFF"}}> <PersonOutlineIcon fontSize="medium" /> </button> </Link> 
                        <button id="largeButton" style={{margin:"10px"}}>  <ExitToAppIcon fontSize="medium" /></button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar