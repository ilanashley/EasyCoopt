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
  Col,

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
}));


const AddCoopte = (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [cv, setCv] = useState('');

  const [offerCompleted, setOfferCompleted] = useState('');
  const [loading, setLoading] = useState(false);
  const [offerTitle, setOfferTitle] = useState('');

  // State for modal
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

  const { offerId } = useParams();

  /* function fetch to add coopte with file to the back */
  var saveCoopte = async () => {
    setOpen(!open)
    setLoading(true)

    var date = new Date()
    date.setHours(0, 0, 0, 0)

    var data = new FormData();

    data.append('firstName', firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : '');
    data.append('lastName', lastName ? lastName.charAt(0).toUpperCase() + lastName.slice(1) : '');
    data.append('email', email);
    data.append('reason', reason);
    data.append('creationDate', date);
    data.append('offerId', offerId);
    data.append('userId', props.userId)

    data.append(
      "cv",
      cv,
      cv.name
    );

    const saveReq = await fetch('/referrals/add', {
      method: 'post',
      body: data
    })
    let response = await saveReq.json();

    if (response) {
      console.log('réponse du back au fetch du coopté')
      setLoading(false)
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

  /* function to redirect to offersList */
  const toggleRedirect = () => {
    setOpen(!open)
    setOfferCompleted(!offerCompleted)
  };

  if (offerCompleted) {
    return <Redirect to='/referralsList' />
  }

  /* conditions for modal */
  if (loading) {
    var contentModal = <p>Loading</p>
  } else {
    contentModal = <p>Votre Cooptation a bien été prise en compte</p>
  }

  if (!props.token) {
    return <Redirect to="/myaccount" />;
  } else if (props.typeId !== 'Coopteur') {
    return <Redirect to="/offersList" />;
  }

  return (
    <div className="section">
      <NavBar />
      <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center',marginTop: 40 }}><h1 style={{fontSize: 40}}> Vous recommandez une personne pour le poste de :</h1><h1 style={{fontSize: 40}}>{offerTitle}</h1></div>

      <Container >
        <Row className="cardBackground" style={{ padding: 20, marginTop: 50, marginBottom: 50 }} >
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form>
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
                <Input onChange={(e) => { console.log(e.target.files); setCv(e.target.files[0]) }} type="file" name="cv" placeholder="upload cv" />
              </FormGroup>

              <FormGroup>
                <Label for="reason">Raison de la cooptation</Label>
                <Input onChange={(e) => setReason(e.target.value)} type="textarea" name="reason" />
              </FormGroup>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} value="end" label="J'accepte de partager les données relatives à cette cooptation" />
              </FormGroup>

              <div class="btnEnd">
                <Button onClick={() => { saveCoopte() }} style={{ margin: "10px", backgroundColor: '#254383' }}> Send </Button>
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
                  {contentModal}
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
  console.log("state", state)
  return {
    token: state.token,
    typeId: state.typeId,
    userId: state.userId
  }
}

export default connect(
  mapStateToProps, null
)(AddCoopte)