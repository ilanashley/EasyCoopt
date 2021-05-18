import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button } from "reactstrap";
import NavBar from './NavBar'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlaceIcon from '@material-ui/icons/Place';

import '../App.css';


function JobsAvailable() {

    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOffers = async () => {
            setLoading(true)
            var rawResponse = await fetch('/offers/get')
            var response = await rawResponse.json()
            setOffers(response.offers)
            setLoading(false)
        }
        fetchOffers()
    }, [])

    const offersList = offers.map((offer, i) => {
        return (
            <div key={i} className=" col-md-12 cardBackground mb-2">
                <li className="d-flex flex-column flex-md-row align-items-center justify-content-around">
                    <h2>{offer.title}</h2>
                    <div className="cardInfoBg">
                        <span className="d-flex justify-content-center">
                            <div className="cardInfoIcons">
                                <CalendarTodayIcon fontSize="large" />
                                <p>{offer.creationDate}</p>
                            </div>
                            <div className="cardInfoIcons">
                                <BusinessCenterIcon fontSize="large" />
                                <p>{offer.contract}</p>
                            </div>
                            <div className="cardInfoIcons">
                                <PlaceIcon fontSize="large" />
                                <p>{offer.city}</p>
                            </div>
                        </span>
                    </div>
                    <h3>{offer.bonusAmount}€</h3>
                    <Button id="referralButton">Recommander</Button>
                    <Button id="enlargeButton">
                        <OpenInNewIcon />
                    </Button>
                </li>
            </div>
        )
    })

    return (
        <div className="section">
            <NavBar />
            <Container style={{ marginTop: '100px' }}>
                <Container>

                    <Row className="mb-4 d.flex">
                        <Col className="flex-row">
                            <input className="searchBar" type="search" placeholder="Rechercher un poste.." />
                            <button className="onclickButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tri par date <ExpandMoreIcon /></button>
                            <button className="onclickButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tri par bonus <ExpandMoreIcon /></button>
                        </Col>
                    </Row>
                    <Row>
                        {offersList}
                    </Row>

                </Container>
            </Container>



        </div>
    );
}

export default JobsAvailable;
