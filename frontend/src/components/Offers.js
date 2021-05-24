import React, { useState } from 'react';

import PlaceIcon from '@material-ui/icons/Place';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Container, Row, Col, Input, Label } from "reactstrap";

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';

import ViewOffer from './ViewOffer';


const Offers = (props) => {

    const [offerId, setOfferId] = useState('');

    if (props.loading) {
        return <h2>Loading...</h2>
    }

    const handleOnClick = (id) => {
        setOfferId(id)
    }

    if (offerId) {
        return <Redirect to={`/addoffer/${offerId}`}></Redirect>
    }

    // Map pour l'affichage des offres
    const offersList = props.currentOffers.map((offer, i) => {

        // Days since offer's creation date
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(offer.creationDate);
        const secondDate = new Date();
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

        // Archived offer style
        let archivedStyle
        if(offer.archived === true) {
            archivedStyle = { border: 'solid #f78400'}
        }

        let updateOffer
        let archiveOffer
        let recommendOnOffer
        if (props.typeId === 'Recruteur') {
            updateOffer = <Col md='2' sm="4" className="d-flex justify-content-center p-2">
                <button className="referralButton" onClick={() => handleOnClick(offer._id)}>
                    Modifier
                </button>
            </Col> 
            archiveOffer = <Col md='2' sm="4" className="d-flex justify-content-center p-2">
                <button className="referralButton" onClick={() => { props.archiveOffer(i, offer._id) }}>
                    Archiver
                </button>
            </Col>
        } else {
            recommendOnOffer =<Col md='4' sm="6" className="d-flex justify-content-center p-2">
                <button className="referralButton" onClick={() => props.recommend(offer._id)} >Recommander</button>
            </Col>
        }

        if (props.typeId === 'Recruteur' || offer.archived === false) {
            return (

                <div key={offer._id} className="cardBackground mb-2" style={archivedStyle}>
                    <Row className="d-flex align-items-center " >
    
                        <Col md='3' sm="6"  className="d-flex justify-content-center">
                            <h5 className="m-2">{offer.title}</h5>
                        </Col>
                        <Col md='4' sm="6">
                            <Row  className="bg-light pt-3 m-2 border rounded-3">
                                <Col className="d-flex flex-column justify-content-start align-items-center">
                                    <CalendarTodayIcon fontSize="small" />
                                    <div style={{fontSize: 12, padding: 10}}>Il y a {diffDays} jour{diffDays > 1 ? 's' : ''}</div>
                                </Col>
                                <Col className="d-flex flex-column justify-content-start align-items-center">
                                    <BusinessCenterIcon fontSize="small" />
                                    <div style={{fontSize: 12, padding: 10}}>{offer.contract}</div>
                                </Col>
                                <Col className="d-flex flex-column justify-content-start align-items-center">
                                    <PlaceIcon fontSize="small" />
                                    <div style={{fontSize: 12, padding: 10}}>{offer.city}</div>
                                </Col>
                                <Col className="d-flex flex-column justify-content-start align-items-center">
                                    <AccountBalanceOutlinedIcon fontSize="small"/>
                                    <div style={{fontSize: 12, padding: 10}}>{offer.bonusAmount}€</div>
                                </Col>
                            </Row>                                            
                        </Col>
                        {recommendOnOffer}
                        {updateOffer}
                        {archiveOffer}
                        <Col md='1' sm="4" className="d-flex justify-content-center p-2">
                            <button className="referralButton m-2" onClick={() => props.viewOffer(offer._id)}>
                                Voir
                            </button>
                        </Col>
                            
                    </Row>
                </div>
            )
        }

        
    })

    return (

        <div>
            {offersList}
        </div>

    )
}

function mapStateToProps(state) {
    return {
        token: state.token,
        typeId: state.typeId
    };
}

export default connect(
    mapStateToProps,
    null
)(Offers);
