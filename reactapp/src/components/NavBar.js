import React, { useState, useEffect } from 'react';
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
    const [numberOffers, setNumberOffers] = useState(0)
    const [numberReferrals, setNumberReferrals] = useState(0)

    const fetchOffers = async () => {
        var rawResponse = await fetch('/offers/get')
        var response = await rawResponse.json()
    
        let offers = [...response.offers]
        let numberOffers = 0
        let numberReferrals = 0
    
        if (props.token) {
          if (props.group === 'Coopteur') {
            offers = offers.filter(offer => offer.isActive === true)
            numberOffers = offers.length
           
            let usersToken = []
            for (let i=0; i<offers.length; i++) {
              for(let j=0; j<offers[i].referralsIds.length; j++) {
                if(offers[i].referralsIds[j].userId) {
                  usersToken.push(offers[i].referralsIds[j].userId.token)
                }
              }
            }
            numberReferrals = usersToken.filter(token => token === props.token).length
          } else if (props.group === 'Recruteur') {
            numberOffers = offers.length
            for (let i = 0; i < numberOffers; i++) {
              numberReferrals += offers[i].referralsIds.length
            }
          }
        } else {
          offers = offers.filter(offer => offer.isActive === true)
          numberOffers = offers.length
        }
    
        setNumberOffers(numberOffers)
        setNumberReferrals(numberReferrals)
      }
    
      useEffect(() => {
        fetchOffers()
      }, [])

    const toggle = () => setIsOpen(!isOpen);

    const handleLogOut = () => {
        props.addToken(null)
        props.addUserLastName(null)
    }

    let toggleLogLink
    if (props.token) {
        toggleLogLink = <Link to="/login" className="navbar-brand" style={{ fontSize: 15 }} onClick={handleLogOut}>Déconnexion</Link>
    } else {
        toggleLogLink = <Link to="/login" className="navbar-brand" style={{ fontSize: 15 }}>Connexion</Link>
    }

    let numberReferralsBadge
    if (props.group) {
        numberReferralsBadge = <Badge style={{ position: 'relative', bottom: 18, right: 18, borderRadius: 20, backgroundColor: '#78CFCE' }} color="secondary">
            {numberReferrals}
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
                                {numberOffers}
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