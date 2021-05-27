import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

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

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import NavBar from './NavBar'


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


function Login(props) {

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpConfirmationPassword, setSignUpConfirmationPassword] = useState('')

  const [error, setError] = useState()

  const [signIn, setSignIn] = useState(false)
  const [signUp, setSignUp] = useState(false)

  // Modal state
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Modal function
  const handleClose = () => {
    setOpen(false);
  };

  // Capitalize function
  const capitalize = (arg) => {
    if (typeof arg !== 'string') return ''
    return arg.charAt(0).toUpperCase() + arg.slice(1)
  }

  var handleSubmitSignin = async () => {
    const data = await fetch('/users/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${signInEmail}&password=${signInPassword}`
    })
    const body = await data.json();
    if (body.result === true) {
      props.addToken(body.user.token)
      props.addProfileType(body.user.group)
      props.addUserId(body.user._id)
      props.addUserLastName(body.user.lastName ? capitalize(body.user.lastName) : null)
      setSignIn(true)
    } else {
      setError(body.error)
      setOpen(true);
    }
  }

  var handleSubmitSignup = async () => {
    const data = await fetch('/users/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${signUpEmail}&password=${signUpPassword}&confirmPassword=${signUpConfirmationPassword}`
    })
    const body = await data.json()
    if (body.result === true) {
      props.addToken(body.user.token)
      props.addUserId(body.user._id)
      setSignUp(true)
    } else {
      setError(body.error)
      setOpen(true);
    }
  }

  if (signIn) {
    return <Redirect to='/offerslist' />
  } else if (signUp) {
    return <Redirect to='/myAccount' />
  }

  // On Key Press Enter...
  const handleKeyPressOnSigninPassword = (event) => {
    if (event.key === 'Enter') {
      handleSubmitSignin()
    }
  }

  const handleKeyPressOnSignupConfirmPassword = (event) => {
    if (event.key === 'Enter') {
      handleSubmitSignup()
    }
  }

  return (
    <div className="mainContainer">
      <div className='d-flex justify-content-center'>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              {error}
            </div>
          </Fade>
        </Modal>
      </div>
      <NavBar />
      <Container className='d-flex justify-content-center align-items-center '>
        <Row style={{ maxWidth: 750 }} className="cardBackground p-1 m-4">
          <Col sm='12' md='12'>
            <div class="col-12 text-center get_started p-4">
              <h3>Bienvenue !</h3>
            </div>
          </Col>
          <Col sm="6" md="6">
            <Form>
              <h4>Connexion</h4>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  onChange={(e) => setSignInEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Mot de passe</Label>
                <Input
                  onKeyPress={handleKeyPressOnSigninPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="mot de passe"
                />
              </FormGroup>
              <div className="d-flex justify-content-end py-4">
                <Button onClick={() => handleSubmitSignin()} className={classes.btn}> Valider </Button>
              </div>
            </Form>
          </Col>
          <Col sm="6" md="6">
            <Form>
            <h4>Inscription</h4>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Mot de passe</Label>
                <Input
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="mot de passe"
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Confirmer mot de passe</Label>
                <Input
                  onKeyPress={handleKeyPressOnSignupConfirmPassword}
                  onChange={(e) => setSignUpConfirmationPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="mot de passe"
                />
              </FormGroup>
              <div className="d-flex justify-content-end py-4">
                <Button onClick={() => handleSubmitSignup()} className={classes.btn}>Valider </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token })
    },
    addProfileType: function (group) {
      dispatch({ type: 'addProfileGroup', group })
    },
    addUserId: function (userId) {
      dispatch({ type: 'addUserId', userId })
    },
    addUserLastName: function (userLastName) {
      dispatch({ type: 'addUserLastName', userLastName })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)