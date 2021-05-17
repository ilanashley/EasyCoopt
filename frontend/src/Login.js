import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import './App.css';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Login = (props) => {

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpConfirmationPassword, setSignUpConfirmationPassword] = useState('')

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [listErrorsSignup, setErrorsSignup] = useState([])

  var handleSubmitSignin = async () => {

    const data = await fetch('/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${signInEmail}&password=${signInPassword}`
    })

    const body = await data.json()

    if (body.result == true) {
      props.addToken(body.token)
      setUserExists(true)

    } else {
      setErrorsSignin(body.error)
    }
  }

  var handleSubmitSignup = async () => {

    const data = await fetch('/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${signUpEmail}&password=${signUpPassword}&confirmPassword=${signUpConfirmationPassword}`
    })

    const body = await data.json()

    if (body.result == true) {
      props.addToken(body.token)
      setUserExists(true)

    } else {
      setErrorsSignup(body.error)
    }
  }

  if (userExists) {
    return <Redirect to='/addcoopte' />
  }

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return (<p>{error}</p>)
  })

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return (<p>{error}</p>)
  })



  return (
    <div className="section">
      <div className='navbarContainer'>
        <nav className="navbar navbar-light bg-white">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><img src='./logo.png' height="40px" /></a>
            <div className="d-flex">
              <a className="navbar-brand" href="#">Announces</a>
              <a className="navbar-brand" href="#">History</a>
              <Button id="largeButton" style={{ margin: "10px" }}>  <PersonOutlineIcon fontSize="medium" /></Button>
              <Button id="largeButton" style={{ margin: "10px" }}>  <ExitToAppIcon fontSize="medium" /></Button>
            </div>
          </div>
        </nav>
      </div>

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
              {tabErrorsSignin}
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
              {tabErrorsSignup}
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

export default Login;