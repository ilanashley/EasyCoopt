import React from 'react';
import '../App.css';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function NavBar(props) {

    const handleLogOut = () => {
        props.addToken(null)
    }

    return (
        <div className='navbarContainer'>
            <nav className="navbar navbar-light bg-white">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"><img src='../images/easycoopt_logo.png' alt='logo' height='40px' /></Link>
                    <div className="linkContainer">
                        <Link to="/" className="navbar-brand" style={{ color: "#254383" }}>Annonces</Link>
                        <Link to="/referralslist" className="navbar-brand" style={{ color: "#254383" }}>Cooptations</Link>
                        <Link to="/myaccount"> <button id="largeButton" style={{ margin: "10px", color: "#FFFFF" }}> <PersonOutlineIcon fontSize="medium" /> </button> </Link>
                        <button onClick={handleLogOut} id="largeButton" style={{ margin: "10px" }}>  <ExitToAppIcon fontSize="medium" /></button>
                    </div>
                </div>
            </nav>
        </div>
    )


}

function mapDispatchToProps(dispatch) {
    return {
        addToken: function (token) {
            dispatch({ type: 'addToken', token: token })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(NavBar)