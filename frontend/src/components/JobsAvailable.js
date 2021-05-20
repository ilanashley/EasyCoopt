import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row, Button } from "reactstrap";
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlaceIcon from '@material-ui/icons/Place';
import DeleteIcon from '@material-ui/icons/Delete';

import '../App.css';


function JobsAvailable(props) {

    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ajoutId, setAjoutId] = useState([]);

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

    var archiveOffer = async (id) => {
        console.log('Id', id)

        const archiveReq = await fetch('/offers/archive', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `status=${false}&id=${id}`
        })
        const body = await archiveReq.json()

        console.log(body)

        if (body.result === true) {

            setAjoutId([...ajoutId, body.offerCurrent._id])
            console.log('Je suis la')
        }

    }


    if (props.token) {
        var securite = <Link to="/addoffer"> <Button id="modifyButton">
            Rajouter Offre
        </Button>
        </Link>
    }
    else {

        var securite = <Link to="/login"> <Button id="modifyButton">
            Se Connecter
        </Button>
        </Link>
    }




    // Card component
    const offersList = offers.map((offer, i) => {
        var display = {};
        if (ajoutId.includes(offer._id)) {
            display = { display: 'none' }
        }
        return (
            <div key={i} className="cardBackground mb-2" style={display}>
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
                    <Button id="modifyButton">Modifier</Button>
                    <Button id="enlargeButton">
                        <OpenInNewIcon />
                    </Button>
                    <Button>
                        <DeleteIcon onClick={() => { console.log(offer._id); archiveOffer(offer._id) }} />
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
                            {securite}
                            <input className="searchBar" type="search" placeholder="Rechercher un poste.." />
                            <button className="onclickButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tri par date <ExpandMoreIcon /></button>
                            <button className="onclickButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tri par bonus <ExpandMoreIcon /></button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {offersList}
                        </Col>
                    </Row>

                </Container>
            </Container>



        </div>
    );
}

function mapStateToProps(state) {
    return { token: state.token }
}


export default connect(
    mapStateToProps,
)(JobsAvailable);

