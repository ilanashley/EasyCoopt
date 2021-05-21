import React, { useState, useEffect, Text } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import '../App.css';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavBar from './NavBar'


function AddOffer(props) {

  const [offerList, setOfferList] = useState([])

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [creationDate, setCreationDate] = useState(new Date());
  const [bonusAmount, setBonusAmount] = useState('');
  const [contract, setContract] = useState('');
  const [link, setLink] = useState('');
  const [resume, setResume] = useState('');

  const [offerModifiee, setOfferModifiee] = useState(false);
  const [offerExist, setOfferExist] = useState(false);

  const [modal, setModal] = useState(false);

  var { id } = useParams();

  useEffect(() => {
    async function loadOffer() {
      var rawResponse = await fetch(`/offers/get`);
      var response = await rawResponse.json();
      const offer = response.offers.filter(offer => offer._id == id)
      if (offer.length > 0) {
        setTitle(offer[0].title);
        setCity(offer[0].city);
        setCreationDate(offer[0].creationDate);
        setBonusAmount(offer[0].bonusAmount);
        setContract(offer[0].contract);
        setLink(offer[0].link);
        setResume(offer[0].resume);
        setOfferList(response.offers)
        setOfferExist(true)
      }
    };
    loadOffer();
  }, []);

  if (!offerExist) {

    var saveOffer = async () => {

      const saveReq = await fetch('/offers/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&status=${true}&token=${props.token}`
      })
      const body = await saveReq.json()

      props.addToOfferList(body.offer)
    }
  }

  else if (offerExist) {

    var saveOffer = async () => {

      const saveReq = await fetch('/offers/add', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&status=${true}&id=${id}&token=${props.token}`
      })
      const body = await saveReq.json()

      props.addToOfferList(body.offer)
    }
  }

  const toggle = () => {
    setModal(!modal);
  };
  const toggleBack = () => {
    setModal(!modal);
    setOfferModifiee(true)
  };


  if (offerExist) {

    var affichageTexteModal = <ModalBody>
      Votre offre a bien été prise en compte !
    </ModalBody>
    var modification = <Button onClick={() => { { toggle() } { saveOffer() } }} style={{ margin: "10px", backgroundColor: '#254383' }}> Modifier </Button>
  }
  else if (!offerExist) {

    var affichageTexteModal = <ModalBody>
      Votre offre a bien été ajoutée !
      </ModalBody>
    var modification = <Button onClick={() => { { toggle() } { saveOffer() } }} style={{ margin: "10px", backgroundColor: '#254383' }}> Add </Button>

  }


  if (offerModifiee) {
    return <Redirect to='/offerslist' />
  }

  if (!props.token) {
    return <Redirect to="/login" />;
  }

  return (

    <div className="section">
      <NavBar />

      <Container>
        <Row className="cardBackground" style={{ padding: "10px", marginTop: "50px" }} >


          <Col sm="12" md={{ size: 6, offset: 3 }} >
            <h3 style={{ margin: "40px" }}>Add Offer</h3>
            <Form>
              <FormGroup>
                <Label for="title">Job Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Title" />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} type="text" name="city" placeholder="Paris" />
              </FormGroup>
              <FormGroup>
                <Label for="creationDate">Date</Label>
                <Input value={creationDate} onChange={(e) => setCreationDate(e.target.value)} type="date" name="creationDate" placeholder="../../...." />
              </FormGroup>
              <FormGroup>
                <Label for="bonusAmount">Bonus</Label>
                <Input value={bonusAmount} onChange={(e) => setBonusAmount(e.target.value)} type="text" name="bonusAmount" placeholder="400€" />
              </FormGroup>
              <FormGroup>
                <Label for="contract">Type of contract</Label>
                <Input value={contract} onChange={(e) => setContract(e.target.value)} type="text" name="contract" placeholder="CDI" />
              </FormGroup>
              <FormGroup>
                <Label for="link">Link offer</Label>
                <Input value={link} onChange={(e) => setLink(e.target.value)} type="link" name="link" placeholder="https://" />
              </FormGroup>
              <FormGroup>
                <Label for="resume">Resume</Label>
                <Input value={resume} onChange={(e) => setResume(e.target.value)} type="textarea" name="resume" />
              </FormGroup>
              <div class="btnEnd">
                {modification}
                <Modal isOpen={modal} toggle={toggle}>
                  {affichageTexteModal}
                  <ModalFooter>
                    <Button color="secondary" onClick={toggleBack}>Page des offres</Button>
                  </ModalFooter>
                </Modal>
              </div>
            </Form>
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
)(AddOffer)
