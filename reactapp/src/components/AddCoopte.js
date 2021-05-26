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
    backgroundColor:    '#78CFCE',
    border: '1px solid transparent',
    padding: '.375rem .75rem',
    fontSize:' 1rem',
    borderRadius: '.75rem',
    '&:hover': {
      border: '1px solid transparent',
      backgroundColor: '#6bbbba'
    }
  }
}));


const AddCoopte = (props) => {

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [reason, setReason] = useState();
  const [cv, setCv] = useState();

 
  const [offerTitle, setOfferTitle] = useState();

  // State for modal
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [offerCompleted, setOfferCompleted] = useState();

  // State for checkbox
  const [isAgree, setIsAgree] = useState(false);

  const { offerId } = useParams();

  /* function fetch to add coopte with file to the back */
  var saveCoopte = async () => {

    var date = new Date()
    date.setHours(0, 0, 0, 0)

    var data = new FormData();
    if (!cv) {
      setError('Vous devez joindre un Cv')
      setOpen(true)
    } else if (isAgree === false){
      setError("Vous devez avoir l'accord préalable du coopté afin de transmettre cette candidature")
      setOpen(true)
    } else {
      data.append('firstName', firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : '');
      data.append('lastName', lastName ? lastName.charAt(0).toUpperCase() + lastName.slice(1) : '');
      data.append('email', email);
      data.append('reason', reason);
      data.append('creationDate', date);
      data.append('offerId', offerId);
      data.append('userId', props.userId);
      data.append('isAgree', isAgree)
      data.append("cv", cv, cv.name );

      const saveReq = await fetch('/referrals/add', {
        method: 'post',
        body: data
      })
      let response = await saveReq.json();
      if (response.result === false) {
        setError(response.error)
        setOpen(!open);
      } else {
        setSuccess(response.success)
        setOpen(!open)
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

  // Function checkbox
  const handleChange = (event) => {
    setIsAgree(event.target.checked);
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
    return <Redirect to="/login" />;
  } else if (props.typeId !== 'Coopteur') {
    return <Redirect to="/offersList" />;
  }

  return (
    <div className="section backgroundImageAddCoopte">
      <NavBar />
      <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', marginTop: 40 }}><h1 style={{ fontSize: 40 }}> Vous recommandez pour le poste de :</h1><h1 style={{ fontSize: 40 }}>{offerTitle}</h1></div>

      <Container   >
        <Row style={{ marginTop: 50 }} >
          <Col sm="12" md={{ size: 10, offset: 1 }} style={{ padding: 40, marginBottom: 50 }} className="cardBackground" >
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAgree}
                      onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Je certifie sur l'honneur avoir l'accord préalable du coopté afin de transmettre cette candidature"
                />
              </FormGroup>

              <div className="d-flex justify-content-end">
                <Button onClick={() => saveCoopte()} className={classes.btn} > Envoyer </Button>
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
  mapStateToProps,
  null
)(AddCoopte)