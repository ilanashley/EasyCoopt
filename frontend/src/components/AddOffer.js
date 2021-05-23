import React, { useState, useEffect, useRef } from 'react';
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
import NavBar from './NavBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

// Modal style
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function AddOffer(props) {

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [bonusAmount, setBonusAmount] = useState('');
  const [contract, setContract] = useState('');
  const [link, setLink] = useState('');
  const [resume, setResume] = useState('');

  const [offerModifiee, setOfferModifiee] = useState(false);

  const [offer, setOffer] = useState({})
  const [stringDate, setStringDate] = useState(new Date().toISOString().substr(0, 10))
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  var { id } = useParams();

  useEffect(() => {
    async function loadOffer() {
      var rawResponse = await fetch(`/offers/get`);
      var response = await rawResponse.json();
      const offer = response.offers.filter(offer => offer._id === id)
      if (offer) {
        setOffer(...offer)
      }
      // console.log('offerDate --> ',offerDate)
      // if(offer) {
      //   let offerDate = new Date(offer[0].creationDate)
      //   let stringDate = offerDate.getFullYear() + '-' + ('0' + (offerDate.getMonth()+1)).slice(-2) + '-' + ('0' + offerDate.getDate()).slice(-2);
      //   setStringDate(stringDate)
      //   setOffer(...offer)

      //   console.log('stringDate --> ',stringDate)

      // } else {
      //   let currentDate = new Date();
      //   let stringDate = currentDate.toISOString().substr(0,10);
      //   console.log('stringDateBis --> ',stringDate)
      //   setStringDate(stringDate)
      // }
    };
    loadOffer();
  }, []);

  // const isInitialMount = useRef(true);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     let offerDate = new Date(offer.creationDate)
  //     let stringDate = offerDate.getFullYear() + '-' + ('0' + (offerDate.getMonth()+1)).slice(-2) + '-' + ('0' + offerDate.getDate()).slice(-2);
  //     setCreationDate(stringDate)
  //   }
  // });

  // useEffect(() => {
  //   let offerDate = new Date(offer.creationDate)
  //   let stringDate = offerDate.getFullYear() + '-' + ('0' + (offerDate.getMonth()+1)).slice(-2) + '-' + ('0' + offerDate.getDate()).slice(-2);
  //   setCreationDate(stringDate)
  // }, [offer]);

  let modalText
  let modalButtonText
  let methodOption
  let pageTitle

  // let stringDate
  if (offer) {
    methodOption = 'PUT' // Fetch method option
    modalText = 'Votre offre a bien été modifiée !'
    modalButtonText = 'Modifier'
    pageTitle = 'Modifier une offre'
    // let offerDate = new Date(offer.creationDate)
    // stringDate = offerDate.getFullYear() + '-' + ('0' + (offerDate.getMonth()+1)).slice(-2) + '-' + ('0' + offerDate.getDate()).slice(-2);

  } else {
    methodOption = 'POST' // Fetch method option
    modalText = 'Votre offre a bien été ajoutée !'
    modalButtonText = 'Ajouter'
    pageTitle = 'Ajouter une offre'
    // let currentDate = new Date();
    // stringDate = currentDate.toISOString().substr(0,10);

  }

  var saveOffer = async () => {
    const saveReq = await fetch('/offers/add', {
      method: methodOption,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&status=${true}&id=${id}&token=${props.token}`
    })
    await saveReq.json()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOfferModifiee(true)
  };


  if (offerModifiee) {
    return <Redirect to='/offerslist' />
  }

  if (!props.token) {
    return <Redirect to="/login" />;
  } else if (props.typeId !== 'Recruteur') {
    return <Redirect to="/offersList" />;
  }

  return (

    <div className="section">
      <NavBar />
      <h1 style={{ display: "flex", justifyContent: 'center', padding: 20 }}>{pageTitle}</h1>

      <Container>
        <Row className="cardBackground" style={{ padding: "10px", marginTop: "20px", marginBottom: "50px" }} >


          <Col sm="12" md={{ size: 6, offset: 3 }} >
            <Form>
              <FormGroup>
                <Label for="title">Intitulé du poste</Label>
                <Input defaultValue={offer ? offer.title : ''} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Title" />
              </FormGroup>
              <FormGroup>
                <Label for="city">Ville</Label>
                <Input defaultValue={offer ? offer.city : ''} onChange={(e) => setCity(e.target.value)} type="text" name="city" placeholder="Paris" />
              </FormGroup>
              <FormGroup>
                <Label for="creationDate">Date</Label>
                <Input defaultValue={stringDate} onChange={(e) => setCreationDate(e.target.value)} type="date" name="creationDate" placeholder="../../...." />
              </FormGroup>
              <FormGroup>
                <Label for="bonusAmount">Prime</Label>
                <Input defaultValue={offer ? offer.bonusAmount : ''} onChange={(e) => setBonusAmount(e.target.value)} min={0} max={1000} type="number" step="10" name="bonusAmount" placeholder="400€" />
              </FormGroup>
              <FormGroup>
                <Label for="contract">Type du contrat</Label>
                <select defaultValue={offer ? offer.contract : 'CDI'} className="form-select" onChange={(e) => setContract(e.target.value)} aria-label="Default select example" name="contract">
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Stage">Stage</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label for="link">Lien de l'offre</Label>
                <Input defaultValue={offer ? offer.link : ''} onChange={(e) => setLink(e.target.value)} type="link" name="link" placeholder="https://" />
              </FormGroup>
              <FormGroup>
                <Label for="resume">Contenu</Label>
                <Input defaultValue={offer ? offer.resume : ''} onChange={(e) => setResume(e.target.value)} type="textarea" name="resume" />
              </FormGroup>
              <div class="btnEnd">
                <Button onClick={() => { { handleClickOpen() } { saveOffer() } }} style={{ margin: "10px", backgroundColor: '#254383' }}> {modalButtonText} </Button>
                {/* <Modal isOpen={modal} toggle={toggle}>
                  <ModalBody>
                    {modalText}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggleBack}>Page des offres</Button>
                  </ModalFooter>
                </Modal> */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                >
                      <Fade in={open}>
                        <div className={classes.paper}  >
                          {modalText}
                          <br/>
                          <Button style={{ marginTop: 20}} onClick={handleClose}>Page des offres</Button>
                        </div>
                      </Fade>
                </Dialog>
              </div>
            </Form>
          </Col>
        </Row>

      </Container>
    </div>

  );
}

function mapStateToProps(state) {
  return {
    token: state.token,
    typeId: state.typeId
  }
}

export default connect(
  mapStateToProps,
  null
)(AddOffer)
