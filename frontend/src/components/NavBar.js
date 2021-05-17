import React from 'react';
import '../App.css';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function NavBar() {
    return (
        <div className='navbarContainer'>
            <nav className="navbar navbar-light bg-white">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand"><img src='./images/easycoopt_logo.png' alt='logo' height='100px' /></a>
                    <div className="linkContainer">
                        <a href="#" className="navbar-brand">Cooptations</a>
                        <a href="#" className="navbar-brand">Annonces</a>
                        <button id="largeButton" style={{margin:"10px"}}>  <PersonOutlineIcon fontSize="medium" /></button>
                        <button id="largeButton" style={{margin:"10px"}}>  <ExitToAppIcon fontSize="medium" /></button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar