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
import NavBar from './NavBar'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
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

  var handleSubmitSignin = async () => {

    const data = await fetch('/users/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${signInEmail}&password=${signInPassword}`
    })

    const body = await data.json();

    if (body.result == true) {
      props.addToken(body.user.token)
      props.addProfileType(body.user.groupsId)
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

    if (body.result == true) {
      props.addToken(body.user.token)
      setSignUp(true)
    } else {
      setError(body.error)
      setOpen(true);
    }
  }

  if (signIn) {
    return <Redirect to='/offerslist' />
  } else  if (signUp) {
    return <Redirect to='/myAccount' />
  }

  return (
    <div>
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
      <Container >

        <Row className="cardBackground" style={{ padding: "10px", marginTop: "50px" }} >

          <div class="col-12 text-center get_started">
            <h3>Welcome !</h3>
          </div>

          <Col sm="12" md="6">
            <Form>
              <FormGroup>
                <Label for="email">Your email</Label>
                <Input onChange={(e) => setSignInEmail(e.target.value)} type="email" name="email" placeholder="email" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input onChange={(e) => setSignInPassword(e.target.value)} type="password" name="password" placeholder="password" />
              </FormGroup>
             
              <div class="btnEnd">
                <Button onClick={() => handleSubmitSignin()} style={{ margin: "10px", backgroundColor: '#254383' }}> Sign In </Button>
              </div>
            </Form>
          </Col>

          <Col sm="12" md="6">
            <Form>
              <FormGroup>
                <Label for="email">Your email</Label>
                <Input onChange={(e) => setSignUpEmail(e.target.value)} type="email" name="email" placeholder="email" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input onChange={(e) => setSignUpPassword(e.target.value)} type="password" name="password" placeholder="password" />
              </FormGroup>
              <FormGroup>
                <Label for="email">Confirm password</Label>
                <Input onChange={(e) => setSignUpConfirmationPassword(e.target.value)} type="password" name="password" placeholder="password" />
              </FormGroup>
              
              <div class="btnEnd">
                <Button onClick={() => handleSubmitSignup()} style={{ margin: "10px", backgroundColor: '#254383' }}> Sign Up </Button>
              </div>
            </Form>
          </Col>

          <div class="btnEnd1">
            <Button onClick={() => handleSubmitSignup()} style={{ margin: "10px", backgroundColor: '#254383' }}> Sign Up with Linkedin </Button>
          </div>
          <div class="btnEnd1">
            <Button onClick={() => handleSubmitSignup()} style={{ margin: "10px", backgroundColor: '#254383' }}> Sign Up with Google </Button>
          </div>

        </Row>

      </Container>
    </div>


  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token })
    },
    addProfileType: function (typeId) {
      dispatch({ type: 'addProfileType', typeId: typeId })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)