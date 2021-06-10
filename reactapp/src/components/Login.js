import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom'
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

  // Global states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState()

  const [signIn, setSignIn] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [login, setLogin] = useState(false)

  // Modal states
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
      body: `email=${email}&password=${password}`
    })
    const body = await data.json();
    if (body.result === true) {
      props.addToken(body.user.token)
      props.addProfileType(body.user.group)
      props.addUserId(body.user._id)
      props.addUserFirstName(body.user.firstName ? capitalize(body.user.firstName) : null)
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
      body: `email=${email}&password=${password}&confirmPassword=${confirmPassword}`
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

  // Redirections
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

  const toggleSignInSignUp = () => {
    setLogin(!login)
  }

  let loginMessage
  let passwordFormGroup
  let loginButton

  if (!login) {
    loginMessage = <div>Vous n'avez pas encore de compte ? <a onClick={() => toggleSignInSignUp()} style={{ color: '#78CFCE', cursor: 'pointer' }}>S'inscrire</a></div>
    passwordFormGroup = <FormGroup>
      <Input
        onKeyPress={handleKeyPressOnSigninPassword}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        placeholder="Entrez votre mot de passe"
      />
    </FormGroup>
    loginButton = <Button onClick={() => handleSubmitSignin()} className={classes.btn}> Valider </Button>
  } else {
    loginMessage = <div>Vous avez déjà un compte ? <a onClick={() => toggleSignInSignUp()} style={{ color: '#78CFCE', cursor: 'pointer' }}>Connexion</a></div>
    passwordFormGroup = <div>
      <FormGroup>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Créez votre mot de passe"
        />
      </FormGroup>
      <FormGroup>
        <Input
          onKeyPress={handleKeyPressOnSignupConfirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Confirmez votre mot de passe"
        />
      </FormGroup>
    </div>
    loginButton = <Button onClick={() => handleSubmitSignup()} className={classes.btn}>Valider </Button>
  }

  return (
    <div className="mainContainer">
      <NavBar />
      <Container className='d-flex flex-column justify-content-center align-items-center'>
        <Row style={{ width: 750 }} className="cardBackground p-1 m-4">
          <Col sm='12' md='12'>
            <div class="text-center p-4">
              <h3 className="fs-3">Bienvenue !</h3>

              {loginMessage}

            </div>
          </Col>
          <Col sm="12" md="12">
            <Form>
              <FormGroup>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="Votre adresse email"
                />
              </FormGroup>

              {passwordFormGroup}

              <div className="d-flex justify-content-end py-4">

                {loginButton}

              </div>
            </Form>
          </Col>
        </Row>
      </Container>
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
    addUserFirstName: function (userFirstName) {
      dispatch({ type: 'addUserFirstName', userFirstName })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)