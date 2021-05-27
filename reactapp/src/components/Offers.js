import React, { useState } from 'react';

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from "reactstrap";

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';

const Offers = (props) => {

    const [offerId, setOfferId] = useState('');

    if (props.loading) {
        return <h2>Chargement...</h2>
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
        if(offer.isActive === false) {
            archivedStyle = { border: ' 1px solid #f78400'}
        }
       
        let offerButton
        if (props.group === 'Recruteur') {
            offerButton = <Container>
                <Row>
                    <Col  className='d-flex justify-content-center m-2'>
                        <button className="custom-btn-style" onClick={() => handleOnClick(offer._id)}>
                            Modifier
                        </button>
                    </Col> 
                    <Col  className='d-flex justify-content-center m-2'>
                        <button className="custom-btn-style" onClick={() => { props.archiveOffer(i, offer._id) }}>
                            {offer.isActive === true ? 'Archiver' : 'Restaurer'}
                        </button>
                    </Col>
                    <Col  className='d-flex justify-content-center m-2'>
                        <button className="custom-btn-style" onClick={() => props.viewOffer(offer._id)}>
                            Voir
                        </button>
                    </Col>
                </Row>
            </Container>
        } else {
            offerButton = <Container>
                <Row>
                    <Col className='d-flex justify-content-center m-2'>
                        <button className="custom-btn-style" onClick={() => props.recommend(offer._id)} >
                            Recommander
                        </button>
                    </Col>
                    <Col className='d-flex justify-content-center m-2'>
                        <button className="custom-btn-style" onClick={() => props.viewOffer(offer._id)}>
                            Voir
                        </button>
                    </Col>
                </Row>
            </Container>
        }
       
        return (

            <div key={i} className="cardBackground mb-2 " style={archivedStyle} >
                <Row className="d-flex align-items-center ">

                    <Col lg='4' sm="12"  className="d-flex justify-content-center">
                        <h4 className="m-2 p-2">{offer.title}</h4>
                    </Col>
                    <Col lg='4' sm="12">
                        <Row  className="bg-light pt-3 m-2 border rounded-3">
                            <Col className="d-flex flex-column justify-content-start align-items-center">
                                <CalendarTodayIcon fontSize="small" />
                                <div style={{fontSize: 12}} className="text-center p-2">Il y a {diffDays} jour{diffDays > 1 ? 's' : ''}</div>
                            </Col>
                            <Col className="d-flex flex-column justify-content-start align-items-center">
                                <BusinessCenterOutlinedIcon fontSize="small" />
                                <div style={{fontSize: 12}} className="text-center p-2">{offer.contract}</div>
                            </Col>
                            <Col className="d-flex flex-column justify-content-start align-items-center">
                                <PlaceOutlinedIcon fontSize="small" />
                                <div style={{fontSize: 12}} className="text-center p-2">{offer.city}</div>
                            </Col>
                            <Col className="d-flex flex-column justify-content-start align-items-center">
                                <AccountBalanceOutlinedIcon fontSize="small"/>
                                <div style={{fontSize: 12}} className="text-center p-2">{offer.bonusAmount}€</div>
                            </Col>
                            <Col className="d-flex flex-column justify-content-start align-items-center">
                                <ContactsOutlinedIcon fontSize="small"/>
                                <div style={{fontSize: 12}} className="text-center p-2">{offer.referralsIds.length} coopté{offer.referralsIds.length > 1 ? 's' : ''}</div>
                            </Col>
                        </Row>                                            
                    </Col>
                    <Col lg='4' sm="12">
                        {offerButton}
                    </Col>                       
                </Row>
            </div>
        )       
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
        group: state.group
    };
}

export default connect(
    mapStateToProps,
    null
)(Offers);
