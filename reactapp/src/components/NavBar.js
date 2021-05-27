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
    DropdownItem,
    Badge
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
        toggleLogLink = <Link to="/login" className="navbar-brand" style={{ fontSize: 15 }} onClick={handleLogOut}>Déconnexion</Link>
    } else {
        toggleLogLink = <Link to="/login" className="navbar-brand" style={{ fontSize: 15 }}>Log-in</Link>
    }

    let numberReferralsBadge
    if (props.group) {
        numberReferralsBadge = <Badge style={{ position: 'relative', bottom: 18, right: 18, borderRadius: 20, backgroundColor: '#78CFCE' }} color="secondary">
            {props.numberReferrals}
        </Badge>
    }


    return (
        <Navbar color="light" light expand="md" className='navbarContainer shadow'>
            <NavbarBrand><Link to="/"><img src='../images/easycoopt_logo.png' alt='logo' height='40px' /></Link></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink>
                            <Link to="/" className="navbar-brand" style={{ color: "#254383" }}>Annonces</Link>
                            <Badge style={{ position: 'relative', bottom: 18, right: 18, borderRadius: 20, backgroundColor: '#78CFCE' }} color="secondary">
                                {props.numberOffers}
                            </Badge>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>
                            <Link to="/referralslist" className="navbar-brand" style={{ color: "#254383" }}>Cooptations</Link>
                            {numberReferralsBadge}
                        </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            <div className="navbar-brand">Bonjour{props.userLastName ? ` ${props.userLastName}` : ', identifiez vous'}</div>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem >
                                <Link to="/myaccount" className="navbar-brand" style={{ fontSize: 15 }}>Votre profil</Link>
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
        group: state.group,
        userLastName: state.userLastName,
        numberOffers: state.numberOffers,
        numberReferrals: state.numberReferrals
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