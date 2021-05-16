import React, { useState } from 'react';
import {
    Button,
    Container,
    Row,
    Col
} from 'reactstrap';
import{ Badge} from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './App.css';

const ViewOffer = (props) => {


    return (
        <div className="section">
            <div className='navbarContainer'>
                <nav className="navbar navbar-light bg-white">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><img src='./logo.png' height="40px"/></a>
                        <div className="d-flex">
                            <a className="navbar-brand" href="#">Mes Cooptations</a>
                            <Button id="largeButton" style={{margin:"10px"}}>  <PersonOutlineIcon fontSize="medium" /></Button>
                            <Button id="largeButton" style={{margin:"10px"}}>  <ExitToAppIcon fontSize="medium" /></Button>
                        </div>
                    </div>
                </nav>
            </div>
        <Container >
            
            <Row className="cardBackground" style={{ padding: "10px", marginTop:"50px" }} >
                <Col  sm="12" md={{ size: 6, offset: 3 }} >
                    <h3 style={{ marginTop: "40px" }} >Développeur Fullstack <br />Applications IT - H/F
                    <div class="btnEnd">
                            <Button id="enlargeButton">
                                <ArrowBackIcon />
                            </Button>
                        </div>
                    </h3>


                    <p>CDI - 2 années d’expérience</p>
                    <Button id="referralButton">Recommend</Button>
                    <hr />
                    <span>Imaginez demain...</span>
                    <p>Au sein du département IT, vous rejoignez l’organisation Information Systems for IT, gérant, développant et inventant de nombreuses applications. Vous intervenez dans un contexte international afin de fournir des outils pour l’ensemble de l’entreprise et pour les clients de Dassault Systèmes.
                    Dans une équipe franco-indienne, vous assurez le développement et la maintenance d’applications diverses pour l’ITSM, la communication interne, les process IT. Vous créez de nouvelles possibilités d’améliorer la productivité de vos clients et simplifiez leur quotidien par des outils accessibles. La transversalité des activités vous permet de toucher à de nombreux domaines différents et d’intéragir avec des interlocuteurs.
                    Poste en CDI basé à Vélizy-Villacoublay (78).</p>
                    <span>Votre contribution et vos missions :</span>
                    <p>Dans le cadre de l'amélioration des outils utilisés pour assurer une qualité de services irréprochables pour nos clients internes comme externes, nous vous proposons de travailler sur les sujets suivants:<br /><br />
                    Développement de l’outil de gestion du support dédié aux utilisateurs internes.<br />
                    Développement de l’outil de gestion de la flotte mobile<br />
                    Développement des applications de l’IT, gestion des firewalls, gestion de certificats SSL…<br />
                    Développement d’outil de gestion des évènements internes.<br />
                    Développement de librairies client et serveur pour le développement de widgets sur la 3D EXPERIENCE Platform.<br />
                    Développement d’applications mobiles en JavaScript.<br />
                    Recueil et analyse des besoins.</p>
                    <span id="badge" class="badge" >Published three days ago</span>
                    
               
                
                </Col>

            </Row>



        </Container>
        </div>

    );
}

export default ViewOffer;