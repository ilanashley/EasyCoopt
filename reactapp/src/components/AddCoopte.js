import React, { useState, useEffect } from 'react';
import '../App.css';
import { connect } from 'react-redux';
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
import NavBar from './NavBar';
import { useParams, Redirect } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';


import { makeStyles } from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// Background image
const backgroundImage = {
  backgroundImage: `url(${'/images/image_1.jpeg'})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  minWidth: '60wh',
  minHeight: '60vw'
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


const AddCoopte = (props) => {

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [reason, setReason] = useState();
  const [cv, setCv] = useState();

  const [offerCompleted, setOfferCompleted] = useState();
  const [offerTitle, setOfferTitle] = useState();

  // State for modal
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  // State for checkbox
  const [isAgree, setIsAgree] = useState(false);

  const { offerId } = useParams();

  /* function fetch to add coopte with file to the back */
  var saveCoopte = async () => {

    var date = new Date()
    date.setHours(0, 0, 0, 0)

    var data = new FormData();
    if (!cv) {
      setError('oubli de cv')
      setOpen(true)
    } else {
      data.append('firstName', firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : '');
      data.append('lastName', lastName ? lastName.charAt(0).toUpperCase() + lastName.slice(1) : '');
      data.append('email', email);
      data.append('reason', reason);
      data.append('creationDate', date);
      data.append('offerId', offerId);
      data.append('userId', props.userId);
      // data.append('isAgree', isAgree)

      data.append(
        "cv",
        cv,
        cv.name

      );
      console.log("cv", cv)

      const saveReq = await fetch('/referrals/add', {
        method: 'post',
        body: data
      })
      let response = await saveReq.json();
      if (response.result === false) {
        setError(response.error)
        setOpen(!open);
        console.log("messageError", error)
      } else {
        setSuccess(response.success)
        setOpen(!open)
        console.log("messageSuccess", success)
      }
    }
  }

  useEffect(() => {
    const getTitle = async () => {
      let rawResponse = await fetch(`/offers/findById/${offerId}`);
      let response = await rawResponse.json();
      setOfferTitle(response.offer.title)
    };
    getTitle();
  }, []);

  const handleChange = (event) => {
    setIsAgree(event.target.isAgree);
  };

  /* function to redirect to offersList */
  const toggleRedirect = () => {
    if (success) {
      setOpen(!open)
      setOfferCompleted(!offerCompleted)
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

  if (offerCompleted) {
    return <Redirect to='/referralsList' />
  }

  if (!props.token) {
    return <Redirect to="/myaccount" />;
  } else if (props.typeId !== 'Coopteur') {
    return <Redirect to="/offersList" />;
  }

  return (
      <div className="section" style={backgroundImage}>
        <NavBar />
        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', marginTop: 40 }}><h1 style={{ fontSize: 40 }}> Vous recommandez pour le poste de :</h1><h1 style={{ fontSize: 40 }}>{offerTitle}</h1></div>

        <Container   >
          <Row style={{  marginTop: 50, marginBottom: 50}} >
            <Col sm="12" md={{ size: 10, offset: 1 }} style={{padding: 40}} className="cardBackground" >
              <Form >
                <FormGroup>
                  <Label for="firstname">Nom</Label>
                  <Input onChange={(e) => setFirstName(e.target.value)} type="text" name="firstname" placeholder="john" />
                </FormGroup>
                <FormGroup>
                  <Label for="lastname">Prénom</Label>
                  <Input onChange={(e) => setLastName(e.target.value)} type="text" name="lastname" placeholder="Doe" />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="johndoe@gmail.com" />
                </FormGroup>
                <FormGroup>
                  <Label for="cv">Curriculum Vitae</Label>
                  <Input onChange={(e) => { setCv(e.target.files[0]) }} type="file" name="cv" placeholder="upload cv" />
                </FormGroup>

                <FormGroup>
                  <Label for="reason">Raison de la cooptation</Label>
                  <Input onChange={(e) => setReason(e.target.value)} type="textarea" name="reason" />
                </FormGroup>
                <FormGroup>
                <FormControlLabel control={<Checkbox />} /><span style={{fontSize: 15}}>J'accepte de partager les données relatives à cette cooptation</span>
                <p></p>
              </FormGroup>


              <div class="btnEnd mt-5">
                <button onClick={() => { saveCoopte() }} className="custom-btn-style"> Send </button>
              </div>
            </Form>
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
          </Col>
        </Row>
      </Container>
    </div>

  );
}

function mapStateToProps(state) {
  return {
    token: state.token,
    typeId: state.typeId,
    userId: state.userId
  }
}

export default connect(
  mapStateToProps, null
)(AddCoopte)