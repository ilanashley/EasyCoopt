import React, { useState, useEffect } from 'react';
import {
    Button,
    Container,
    Row,
    Col
} from 'reactstrap';
import { Badge } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../App.css';
import NavBar from './NavBar'
import { useParams, Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
;

const ViewOffer = (props) => {

    const { offerIdView } = useParams();

    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [creationDate, setCreationDate] = useState(new Date());
    const [bonusAmount, setBonusAmount] = useState('');
    const [contract, setContract] = useState('');
    const [link, setLink] = useState('');
    const [resume, setResume] = useState('');
    const [isRedirectToOffersList, setIsRedirectToOffersList] = useState(false)
    const [isRedirectToAddCoopte, setIsRedirectToAddCoopte] = useState(false)

    // Fetch to get the offer
    useEffect(() => {
        const loadOffer = async () => {
            var rawResponse = await fetch(`/offers/get`);
            var response = await rawResponse.json();
            const offer = response.offers.filter(offer => offer._id == offerIdView)

            if (offer.length > 0) {
                setTitle(offer[0].title);
                setCity(offer[0].city);
                setCreationDate(offer[0].creationDate);
                setBonusAmount(offer[0].bonusAmount);
                setContract(offer[0].contract);
                setLink(offer[0].link);
                setResume(offer[0].resume);
            }
        };
        loadOffer();
    }, []);

    // Days since offer's creation date
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(creationDate);
    const secondDate = new Date();
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    // Functions de redirection
    const redirectionToOffersList = () => {
        setIsRedirectToOffersList(true)
    }

    const redirectionToAddCoopte = () => {
        setIsRedirectToAddCoopte(true)
    }

    if (isRedirectToOffersList) {
        return <Redirect to="/offersList" />;
    } else if (isRedirectToAddCoopte) {
        return <Redirect to={`/addCoopte/${offerIdView}`} />
    }

    if (!props.token) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="section">
            <NavBar />
            <Container >

                <Row className="cardBackground" style={{ padding: 10, marginTop: 50, marginBottom: 50 }} >
                    <Col sm="12" md={{ size: 6, offset: 3 }} >
                        <h3 style={{ marginTop: "40px" }} > {title} </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}><p style={{fontSize: 20, fontWeight: 'bold', marginTop: 20}}>{contract} - Ville de {city}</p> </div>
                        <p>Publié il y a {diffDays} jour{diffDays > 1 ? 's' : ''} </p>
                        <hr />
                        <p style={{textAlign: 'justify'}}>{resume}</p>

                        <div style={{ marginBottom: 20 }}>
                            <a href={link} target="_blank">{link}</a>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button id="enlargeButton" onClick={redirectionToOffersList} style={{ marginTop: 10}} ><ArrowBackIcon /></button>
                            <button onClick={() => redirectionToAddCoopte(offerIdView)} className="referralButton">Recommander</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

function mapStateToProps(state) {
    return { token: state.token }
}

export default connect(
    mapStateToProps,
    null
)(ViewOffer)