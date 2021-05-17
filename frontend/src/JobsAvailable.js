import React from 'react';
import { Container, Col, Form, FormGroup, Input,  Row, Button } from "reactstrap";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlaceIcon from '@material-ui/icons/Place';
import './App.css';


function JobsAvailable() {
  return (
  <div className="section">
  <Container style={{marginTop: '100px'}}>
  <Container>
    <Row className="mb-4 d.flex">
    <Col className="flex-row mr-1">
        <input className="searchBar" type="search" placeholder="Rechercher un poste.."/>
        <button className="onclickButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tri par date <ExpandMoreIcon/></button>
        <button className="onclickButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tri par bonus <ExpandMoreIcon/></button>
    </Col>
    </Row>
    <Row>
            <div className=" col-md-11 cardBackground mb-2">
            <li className="d-flex flex-column flex-md-row align-items-center justify-content-around">
                <h2>Développeur Fullstack JS.</h2>
                <div className="cardInfoBg">
                    <span className="d-flex justify-content-center">
                        <div className="cardInfoIcons">
                        <CalendarTodayIcon fontSize="large"/>
                            <p>Il y a 12 jours...</p>
                        </div>
                        <div className="cardInfoIcons">
                        <BusinessCenterIcon fontSize="large"/>
                            <p>CDI</p>
                        </div>
                        <div className="cardInfoIcons"> 
                            <PlaceIcon fontSize="large"/>
                            <p>Paris</p>
                        </div>
                    </span>
                </div>
                <h3>150€</h3>
                <Button id="referralButton">Recommander</Button>
                <Button id="enlargeButton">
                    <OpenInNewIcon/>
                </Button>
            </li>
        </div>
    </Row>

    <Row>
            <div className=" col-md-11 cardBackground mb-2">
            <li className="d-flex flex-column flex-md-row align-items-center justify-content-around">
                <h2>Commercial itinérant.</h2>
                <div className="cardInfoBg">
                    <span className="d-flex justify-content-center">
                        <div className="cardInfoIcons">
                        <CalendarTodayIcon fontSize="large"/>
                            <p>Il y a 3 jours...</p>
                        </div>
                        <div className="cardInfoIcons">
                        <BusinessCenterIcon fontSize="large"/>
                            <p>CDD</p>
                        </div>
                        <div className="cardInfoIcons"> 
                            <PlaceIcon fontSize="large"/>
                            <p>Paris</p>
                        </div>
                    </span>
                </div>
                <h3>150€</h3>
                <Button id="referralButton">Recommander</Button>
                <Button id="enlargeButton">
                    <OpenInNewIcon/>
                </Button>
            </li>
        </div>
    </Row>

  </Container>
  </Container>



  </div>
  );
}

export default JobsAvailable;
