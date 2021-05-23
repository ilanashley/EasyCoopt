import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

function NavBar(props) {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const handleLogOut = () => {
        props.addToken(null)
        props.addUserLastName(null)
    }

    let toggleLogLink
    if (props.token) {
        toggleLogLink = <Link to="/login" className="navbar-brand" style={{fontSize: 15}} onClick={handleLogOut}>Log-out</Link>
    } else {
        toggleLogLink = <Link to="/login" className="navbar-brand" style={{fontSize: 15}}>Log-in</Link>
    }

    return (
        <Navbar color="light" light expand="md" className='navbarContainer'>
            <NavbarBrand><Link to="/"><img src='../images/easycoopt_logo.png' alt='logo' height='40px' /></Link></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink><Link to="/" className="navbar-brand" style={{ color: "#254383" }}>Annonces</Link></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink><Link to="/referralslist" className="navbar-brand" style={{ color: "#254383" }}>Cooptations</Link></NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            <div className="navbar-brand">Bonjour{props.userLastName ? ` ${props.userLastName}` : ', identifiez vous'}</div>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem >
                                <Link to="/myaccount" className="navbar-brand" style={{fontSize: 15}}>Votre profil</Link>
                            </DropdownItem>
                            <DropdownItem >
                                {toggleLogLink}
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

function mapStateToProps(state) {
    return {
        token: state.token,
        userLastName: state.userLastName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToken: function (token) {
            dispatch({ type: 'addToken', token })
        },
        addUserLastName: function (userLastName) {
            dispatch({ type: 'addUserLastName', userLastName })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar)