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
  Col
} from 'reactstrap';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavBar from './NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { FormHelperText } from '@material-ui/core';

// Background image
const backgroundImage = {
  backgroundImage: `url(${'/images/image_1.jpeg'})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minWidth: '70wh',
  minHeight: '70vw'
};

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
 
  const [offer, setOffer] = useState(false)
  const [stringDate, setStringDate] = useState('')
  
  // State for model
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState('')

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
      const rawResponse = await fetch(`/offers/get`);
      const response = await rawResponse.json();
      if(response.result === true) {
        const offer = response.offers.filter(offer => offer._id == id)
        if(offer.length > 0) {
          setTitle(offer[0].title)
          setCity(offer[0].city)
          setCreationDate(offer[0].creationDate)
          setBonusAmount(offer[0].bonusAmount)
          setContract(offer[0].contract)      
          setResume(offer[0].resume)
          if(offer[0].link) {
            setLink(offer[0].link)
          }
          setOffer(true)
        } 
      } else {
        setError(response.error)
        setOpen(!open);
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

  let modalButtonText
  let methodOption
  let pageTitle
  let body
  
  // let stringDate
  if(offer) {
    methodOption = 'PUT' // Fetch method option
    modalButtonText = 'Modifier'
    pageTitle = 'Modifier une offre'
    body = `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&status=${true}&id=${id}&token=${props.token}`
    // let offerDate = new Date(offer.creationDate)
    // stringDate = offerDate.getFullYear() + '-' + ('0' + (offerDate.getMonth()+1)).slice(-2) + '-' + ('0' + offerDate.getDate()).slice(-2);

  } else {
    methodOption = 'POST' // Fetch method option
    modalButtonText = 'Ajouter'
    pageTitle = 'Ajouter une offre'
    body = `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&status=${true}&token=${props.token}`
    // let currentDate = new Date();
    // stringDate = currentDate.toISOString().substr(0,10);

  }

  var saveOffer = async () => {
    const saveReq = await fetch('/offers/add', {
      method: methodOption,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    })
    const response = await saveReq.json()
    if(response.result === false) {
      setError(response.error)
      setOpen(!open);
    } else {
      setSuccess(response.success)
      setOpen(!open)
    }
  }

  /* function to redirect to offersList */
  const toggleRedirect = () => {
    if(success){
      setOpen(!open)
      setOfferModifiee(!offerModifiee)
    } else {
      setOpen(!open)
    }
  };

  let message;
 if(!success) {
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
  } else if (props.typeId !== 'Recruteur') {
    return <Redirect to="/offersList" />;
  }

  return (
    <div className="section" style = {backgroundImage}>
      <NavBar />
      <h1 style={{ display: "flex", justifyContent: 'center', padding: 20 }}>{pageTitle}</h1>
      <Container>
        <Row className="cardBackground" style={{ padding: "10px", marginTop: "20px", marginBottom: "50px" }} >
          <Col sm="12" md={{ size: 6, offset: 3 }} >
            <Form>
              <FormGroup>
                <Label for="title">Job Title</Label>
                <Input defaultValue={title ? title : ''} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Title" />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input defaultValue={city ? city : ''} onChange={(e) => setCity(e.target.value)} type="text" name="city" placeholder="Paris" />
              </FormGroup>
              <FormGroup>
                <Label for="creationDate">Date</Label>
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
                <Label for="link">Lien du contrat</Label>
                <Input defaultValue={link ? link : ''} onChange={(e) => setLink(e.target.value)} type="url" name="link" placeholder="https://" />
              </FormGroup>
              <FormGroup>
                <Label for="resume">Resume</Label>
                <Input defaultValue={resume ? resume : ''} onChange={(e) => setResume(e.target.value)} type="textarea" name="resume" />
              </FormGroup>
              <div class="btnEnd">
                <Button onClick={() => { { saveOffer() } }} style={{ margin: "10px", backgroundColor: '#254383' }}> {modalButtonText} </Button>
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
