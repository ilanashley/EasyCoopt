import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import '../App.css';
import {
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';
import NavBar from './NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
  btn: {
    display: 'inline-block',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#fff',
    textAlign: 'center',
    textDecoration: 'none',
    verticalAlign: 'middle',
    cursor: 'pointer',
    backgroundColor: '#78CFCE',
    border: '1px solid transparent',
    padding: '.375rem .75rem',
    fontSize: ' 1rem',
    borderRadius: '.75rem',
    '&:hover': {
      border: '1px solid transparent',
      backgroundColor: '#6bbbba'
    }
  }
}));

function AddOffer(props) {

  const [offer, setOffer] = useState(false)

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [bonusAmount, setBonusAmount] = useState('');
  const [contract, setContract] = useState('');
  const [link, setLink] = useState('');
  const [resume, setResume] = useState('');
  const [isActive, setIsActive] = useState(true)
  const [isRedirectToOffersList, setIsRedirectToOffersList] = useState(false)
  const [stringDate, setStringDate] = useState('')

  // State for model
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState('')
  
  // Params
  const { offerId } = useParams();

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  useEffect(() => {
    async function loadOffer() {
      if(offerId) {
        const rawResponse = await fetch(`/offers/findById/${offerId}`);
        const response = await rawResponse.json();
        if (response.result) {
          const offer = response.offer
          if (offer) {
            setTitle(offer.title)
            setCity(offer.city)
            setCreationDate(offer.creationDate)
            setStringDate(formatDate(offer.creationDate))
            setBonusAmount(offer.bonusAmount)
            setContract(offer.contract)
            setResume(offer.resume)
            if (offer.link) {
              setLink(offer.link)
            }
            setIsActive(offer.isActive)
            setOffer(true)
          }
        } else {
          setError(response.error)
          setOpen(!open);
        }
      }
      
    };
    loadOffer();
  }, []);

  let modalButtonText
  let methodOption
  let pageTitle
  let body

  if (offerId) {
    methodOption = 'PUT' // Fetch method option
    modalButtonText = 'Modifier'
    pageTitle = 'Modifier une offre'
    body = `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&isActive=${isActive}&offerId=${offerId}&token=${props.token}`
  } else {
    methodOption = 'POST' // Fetch method option
    modalButtonText = 'Ajouter'
    pageTitle = 'Ajouter une offre'
    body = `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&isActive=${isActive}&token=${props.token}`
  }

  var saveOffer = async () => {
    const saveReq = await fetch('/offers/add', {
      method: methodOption,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    })
    const response = await saveReq.json()
    if (!response.result) {
      setError(response.error)
      setOpen(!open);
    } else {
      setSuccess(response.success)
      setOpen(!open)
    }
  }

  /* function to redirect to offersList */
  const toggleRedirect = () => {
    if (success) {
      setOpen(!open)
      setIsRedirectToOffersList(true)
      // setOfferModifiee(!offerModifiee)
    } else {
      setOpen(!open)
    }
  };

  // Functions de redirection
  const redirectionToOffersList = () => {
    setIsRedirectToOffersList(true)
  }

  if (isRedirectToOffersList) {
    return <Redirect to="/offersList" />;
  }

  let message;
  if (!success) {
    message = error;
  } else {
    message = success
  }

  if (!props.token) {
    return <Redirect to="/login" />;
  } else if (props.group !== 'Recruteur') {
    return <Redirect to="/offersList" />;
  }

  return (
    <div className="mainContainer">
      <NavBar />
      <div className="d-flex justify-content-center my-5"><h1 className="fs-1">{pageTitle}</h1></div>
      <Container>
        <Row className="d-flex justify-content-center mt-5">
          <Col sm="12" style={{ padding: 40, marginBottom: 50, maxWidth: 750 }} className="cardBackground" >
            <div className="mb-5">
              <button className="custom-btn-style" onClick={redirectionToOffersList}><ArrowBackIcon /></button>
            </div>
            <FormGroup>
              <Label for="title">Intitulé du poste</Label>
              <Input defaultValue={title ? title : ''} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Marketing Client Manager..." />
            </FormGroup>
            <FormGroup>
              <Label for="city">Ville</Label>
              <Input defaultValue={city ? city : ''} onChange={(e) => setCity(e.target.value)} type="text" name="city" placeholder="Paris, Lyon, Marseilles..." />
            </FormGroup>
            <FormGroup>
              <Label for="creationDate">Date de publication</Label>
              <Input defaultValue={stringDate} onChange={(e) => setCreationDate(e.target.value)} type="date" name="creationDate" placeholder="../../...." />
            </FormGroup>
            <FormGroup>
              <Label for="bonusAmount">Bonus</Label>
              <Input defaultValue={bonusAmount ? bonusAmount : ''} onChange={(e) => setBonusAmount(e.target.value)} min={0} max={1000} type="number" step="10" name="bonusAmount" placeholder="400€" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Type de contrat</Label>
              <Input type="select" name="select" id="exampleSelect" value={contract} onChange={(e) => setContract(e.target.value)}>
                <option >Choisir une option</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="STAGE">STAGE</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="link">Lien de l'offre</Label>
              <Input defaultValue={link ? link : ''} onChange={(e) => setLink(e.target.value)} type="url" name="link" placeholder="https://" />
            </FormGroup>
            <FormGroup>
              <Label for="resume">Description de l'offre</Label>
              <Input defaultValue={resume ? resume : ''} onChange={(e) => setResume(e.target.value)} type="textarea" name="resume" />
            </FormGroup>
            <div className="d-flex justify-content-end py-4">
              <Button onClick={() => saveOffer()} className={classes.btn}> {modalButtonText} </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={toggleRedirect}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {message}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    token: state.token,
    group: state.group
  }
}

export default connect(
  mapStateToProps,
  null
)(AddOffer)
