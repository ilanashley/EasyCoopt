import React, { useState } from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PlaceIcon from '@material-ui/icons/Place';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux'
import { Button, Row, Col } from "reactstrap";
import { Redirect } from 'react-router-dom'

const Offers = (props) => {

    const [offerId, setOfferId] = useState('');

    if (props.loading) {
        return <h2>Loading...</h2>
    }

    const handleOnClick = (id) => {
        setOfferId(id)
    }
    if (offerId !=='') {
        return <Redirect to={`/addoffer/${offerId}`}></Redirect>
    }


    // Map pour l'affichage des offres
    const offersList = props.currentOffers.map((offer, i) => {

        // Days since offer's creation date
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(offer.creationDate);
        const secondDate = new Date();
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

        var display = {};
        if (props.ajoutId.includes(offer._id)) {
            display = { display: 'none' }
        }
        return (
            <div key={offer._id} className="cardBackground mb-2" style={display}>
                <Row className="d-flex flex-column flex-md-row align-items-center ">

                <Col >
                    <h5 className="d-flex justify-content-center mt-1">{offer.title}</h5>
                </Col>
                <Col className="cardInfoBg">
                    <Row className="d.flex justify-content-center align-items-center">
                        <Col >
                            <div className="cardInfoIcons mt-3">
                                <CalendarTodayIcon fontSize="medium"/>
                                <p className="cardIconsText mt-1">Il y a {diffDays} jours</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="cardInfoIcons mt-3">
                                <BusinessCenterIcon fontSize="medium"/>
                                <p className="cardIconsText mt-1">{offer.contract}</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="cardInfoIcons mt-3">
                                <PlaceIcon fontSize="medium"/>
                                <p className="cardIconsText mt-1">{offer.city}</p>
                            </div>
                        </Col>

                    </Row>
                </Col>
                <Col>
                <Row md="auto" className="d-flex">
                    <Col >
                    <h5 className="mt-3">{offer.bonusAmount}€</h5>
                    </Col>
                    <Col>
                    <button  onClick = {() =>  props.recommend(offer._id)} id="referralButton">Recommander</button>
                    </Col>
                </Row>
                </Col>
                <Col  md="auto" className="d-flex justify-content-around">    
                    <Button onClick={() => handleOnClick(offer._id)} id="modifyButton">
                        Modifier
                    </Button>
                    <DeleteIcon  className="mt-3 deleteIcon"  fontSize="medium"  onClick={() => { props.archiveOffer(offer._id) }}/>
                    <Button  className="mt-2"  id="enlargeButton">
                        <OpenInNewIcon />
                    </Button>
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
        typeId: state.typeId
    };
}

export default connect(
    mapStateToProps,
    null
)(Offers);
