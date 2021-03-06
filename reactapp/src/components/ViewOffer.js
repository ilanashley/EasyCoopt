import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../App.css';
import NavBar from './NavBar'
import { useParams, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

const ViewOffer = (props) => {

    // Params
    const { offerId } = useParams();

    // Global states
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [creationDate, setCreationDate] = useState(new Date());
    const [bonusAmount, setBonusAmount] = useState('');
    const [recruterId, setRecruterId] = useState('');
    const [contract, setContract] = useState('');
    const [link, setLink] = useState('');
    const [resume, setResume] = useState('');

    // Redirection states
    const [isRedirectToOffersList, setIsRedirectToOffersList] = useState(false)
    const [isRedirectToAddCoopte, setIsRedirectToAddCoopte] = useState(false)

    // Fetch to get the offer
    useEffect(() => {
        const loadOffer = async () => {
            var rawResponse = await fetch(`/offers/get`);
            var response = await rawResponse.json();
            const offer = response.offers.filter(offer => offer._id === offerId)

            if (offer.length > 0) {
                setTitle(offer[0].title);
                setCity(offer[0].city);
                setCreationDate(offer[0].creationDate);
                setBonusAmount(offer[0].bonusAmount);
                setContract(offer[0].contract);
                setLink(offer[0].link);
                setResume(offer[0].resume);
                setRecruterId(offer[0].userId)
            }
        };
        loadOffer();
    }, [offerId]);

    // Days since offer's creation date
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(creationDate);
    const secondDate = new Date();
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    // Redirection functions
    const redirectionToOffersList = () => {
        setIsRedirectToOffersList(!isRedirectToOffersList)
    }

    const redirectionToAddCoopte = () => {
        setIsRedirectToAddCoopte(!isRedirectToAddCoopte)
    }

    // Redirections
    if (isRedirectToOffersList) {
        return <Redirect to="/offersList" />;
    } else if (isRedirectToAddCoopte) {
        return <Redirect to={`/addCoopte/${offerId}`} />
    }

    // affichage de la card du recruteur en fonction de la pr??sence de l'id du recruteur
    let recruterCard;
    if (recruterId) {
        recruterCard =
            <Row className="bg-light p-3 m-1 border rounded-3 d-flex ">
                <h6 className="d-flex justify-content-center mb-2">Recruteur suivant cette annonce :</h6>
                <Col className="d-flex justify-content-end">
                    <div>
                        <img
                            src={recruterId.avatarUrl}
                            class="rounded-circle z-depth-1-half avatar-pic"
                            alt="avatar"
                            height="60px"
                            width="60px"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";
                            }} />
                    </div>
                </Col>
                <Col>
                    <div>
                        <p style={{ margin: 1, padding: 1, fontSize: 13 }}>{recruterId.firstName} {recruterId.lastName}  </p>
                    </div>
                </Col>
            </Row>
    }

    let offerLink
    if (link) {
        offerLink = <div style={{ marginBottom: 20, padding: 5 }}>
            <p>Vous voulez consulter l'offre originale ? C'est par <a href={link} target="_blank" rel="noreferrer">ici</a></p>
        </div>
    }

    let recommendButton
    if (props.group !== 'Recruteur') {
        recommendButton = <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 40 }}>
            <button onClick={() => redirectionToAddCoopte(offerId)} className="custom-btn-style">Recommander</button>
        </div>
    }

    return (
        <div className="section">
            <NavBar />
            <div className="d-flex justify-content-center my-5"><h1 className="fs-1">D??tail de l'offre</h1></div>
            <Container >
                <Row className="d-flex justify-content-center mt-5">
                    <Col sm="12" style={{ padding: 40, marginBottom: 50, maxWidth: 750 }} className="cardBackground"  >
                        <button className="custom-btn-style" onClick={redirectionToOffersList}><ArrowBackIcon /></button>
                        <h3 className="mt-5 fs-3 font-weight-normal"> {title} </h3>
                        <div className="d-flex mb-0 font-weight-bold offerSubtitle">
                            <p className="mr-2 offerSubtitle" >{contract} - {city} - Prime de {bonusAmount}???</p>
                        </div>
                        <div>
                            <p className="mb-0 offerSubtitle">Publi??e il y a {diffDays} jour{diffDays > 1 ? 's' : ''} </p>
                        </div>
                        <hr />
                        <p className="fs-6 p-4 lh-base">{resume}</p>
                        {offerLink}
                        {recruterCard}
                        {recommendButton}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        group: state.group
    }
}

export default connect(
    mapStateToProps,
    null
)(ViewOffer)