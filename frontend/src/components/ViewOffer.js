import React, { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../App.css';
import NavBar from './NavBar'
import { useParams, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
;

const ViewOffer = (props) => {

    const { offerIdView } = useParams();

    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [creationDate, setCreationDate] = useState(new Date());
    const [bonusAmount, setBonusAmount] = useState('');
    const [recruiterId, setRecruiterId] = useState('');
    const [recruiterInfo, setRecruiterInfo] = useState('');
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
                setRecruiterId(offer[0].userId)
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

    // affichage de la card du recruteur en fonction de la présence de l'id du recruteur
    let recruiterCard;
    if (recruiterId){
        recruiterCard =             
        <Row className="bg-light pt-3 m-2 border rounded-3 d-flex ">
        <h6 className="d-flex justify-content-center">Recruteur suivant cette annonce :</h6>
        <Col className="d-flex justify-content-end">
            <div>
            <img
                src={recruiterId.avatarUrl}
                class="rounded-circle z-depth-1-half avatar-pic"
                alt=""
                height="60px"
                width="60px"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                    "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";
            }}/>
            </div>
        </Col>
            <Col>
                <div >
                <p style={{ margin: 1 , padding: 1, lineHeight: 1}}>{recruiterId.firstName}  </p>
                <p style={{ margin: 1 , paddingBottom: 7}}>{recruiterId.lastName}</p>
                </div>
            </Col>
        </Row>
    }


    return (
    <div className="section">
    <NavBar />
    <Container >

        <Row className="cardBackground" style={{ padding: 10, marginTop: 50, marginBottom: 50 }} >
        <Col sm="12" md={{ size: 6, offset: 3 }} >
            <h3 style={{ marginTop: "40px" }}> {title} </h3>
            <div style={{display: 'flex', color: '#7785A2', lineHeight: 1}} className="mb-0"><p className="mr-2">{contract}</p><p>-</p> <p className="ml-2">{city}</p> 
            </div>
            <div>
            <p style={{color: '#7785A2', lineHeight: 1}} className="mb-0">Publiée il y a {diffDays} jour{diffDays > 1 ? 's' : ''} </p></div>
            <hr/>
            <p style={{textAlign: 'justify'}}>{resume}</p>

            <div style={{ marginBottom: 20 }}>
                <a href={link} target="_blank">{link}</a>
            </div>
            {recruiterCard}
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button  onClick = {() => redirectionToAddCoopte(offerIdView)} className="referralButton pt-3 mb-4">Recommander</button>
                <button id="enlargeButton" onClick={redirectionToOffersList}><ArrowBackIcon /></button>
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