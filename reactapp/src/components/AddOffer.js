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

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [bonusAmount, setBonusAmount] = useState('');
  const [contract, setContract] = useState('');
  const [link, setLink] = useState('');
  const [resume, setResume] = useState('');

  const [offer, setOffer] = useState(false)
  const [stringDate, setStringDate] = useState('')

  // State for model
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState('')
  const [offerModifiee, setOfferModifiee] = useState(false);

  var { id } = useParams();

  useEffect(() => {
    async function loadOffer() {
      const rawResponse = await fetch(`/offers/get`);
      const response = await rawResponse.json();
      if (response.result === true) {
        const offer = response.offers.filter(offer => offer._id === id)
        if (offer.length > 0) {
          setTitle(offer[0].title)
          setCity(offer[0].city)
          setCreationDate(offer[0].creationDate)
          setBonusAmount(offer[0].bonusAmount)
          setContract(offer[0].contract)
          setResume(offer[0].resume)
          if (offer[0].link) {
            setLink(offer[0].link)
          }
          setOffer(true)
        }
      } else {
        setError(response.error)
        setOpen(!open);
      }
    };
    loadOffer();
  }, []);

  let modalButtonText
  let methodOption
  let pageTitle
  let body

  if (offer) {
    methodOption = 'PUT' // Fetch method option
    modalButtonText = 'Modifier'
    pageTitle = 'Modifier une offre'
    body = `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&status=${true}&id=${id}&token=${props.token}`
  } else {
    methodOption = 'POST' // Fetch method option
    modalButtonText = 'Ajouter'
    pageTitle = 'Ajouter une offre'
    body = `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&status=${true}&token=${props.token}`
  }

  var saveOffer = async () => {
    const saveReq = await fetch('/offers/add', {
      method: methodOption,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    })
    const response = await saveReq.json()
    if (response.result === false) {
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
      setOfferModifiee(!offerModifiee)
    } else {
      setOpen(!open)
    }
  };

  let message;
  if (!success) {
    message = error;
  }
  else {
    message = success
  }

  if (offerModifiee) {
    return <Redirect to='/referralsList' />
  }

  if (!props.token) {
    return <Redirect to="/login" />;
  } else if (props.group !== 'Recruteur') {
    return <Redirect to="/offersList" />;
  }

  return (
    <div className="section">
      <NavBar />
      <div className="d-flex justify-content-center my-5"><h1>{pageTitle}</h1></div>
      <Container>
        <Row className="d-flex justify-content-center mt-5">
          <Col sm="12" style={{ padding: 40, marginBottom: 50, maxWidth: 750 }} className="cardBackground" >
            
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
              <div className="d-flex justify-content-end">
                <Button onClick={() => saveOffer()} className={classes.btn}> {modalButtonText} </Button>
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
           
          </Col>
        </Row>
      </Container>
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
