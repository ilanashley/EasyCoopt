import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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
import NavBar from './NavBar'


function AddOffer(props) {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [bonusAmount, setBonusAmount] = useState('');
  const [contract, setContract] = useState('');
  const [link, setLink] = useState('');
  const [resume, setResume] = useState('');


console.log('TEST', props.token)

  var saveOffer = async () => {

    const saveReq = await fetch('/offers/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&status=${true}&token=${props.token}`
    })
    const body = await saveReq.json()
  }

  if (!props.token) {
    return <Redirect to="/login" />;
  }

  return (

    <div className="section">
      <NavBar />

      <Container>
        <Row className="cardBackground" style={{ padding: "10px", marginTop: "50px" }} >
          <Col sm="12" md={{ size: 6, offset: 3 }} >
            <h3 style={{ margin: "40px" }}>Add Offer</h3>
            <Form>
              <FormGroup>
                <Label for="title">Job Title</Label>
                <Input onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Title" />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input onChange={(e) => setCity(e.target.value)} type="text" name="city" placeholder="Paris" />
              </FormGroup>
              <FormGroup>
                <Label for="creationDate">Date</Label>
                <Input onChange={(e) => setCreationDate(e.target.value)} type="text" name="creationDate" placeholder="../../...." />
              </FormGroup>
              <FormGroup>
                <Label for="bonusAmount">Bonus</Label>
                <Input onChange={(e) => setBonusAmount(e.target.value)} type="text" name="bonusAmount" placeholder="400€" />
              </FormGroup>
              <FormGroup>
                <Label for="contract">Type of contract</Label>
                <Input onChange={(e) => setContract(e.target.value)} type="text" name="contract" placeholder="CDI" />
              </FormGroup>
              <FormGroup>
                <Label for="link">Link offer</Label>
                <Input onChange={(e) => setLink(e.target.value)} type="link" name="link" placeholder="https://" />
              </FormGroup>
              <FormGroup>
                <Label for="resume">Resume</Label>
                <Input onChange={(e) => setResume(e.target.value)} type="textarea" name="resume" />
              </FormGroup>

              <div class="btnEnd">
                <Button onClick={() => { saveOffer() }} style={{ margin: "10px", backgroundColor: '#254383' }}> Add </Button>
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
    addOffer: function (offer) {
      dispatch({ type: 'addOffer', addOffer: offer })
    }
  }
}

function mapStateToProps(state) {
  console.log('STATE', state)
  return { token: state.token }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOffer)
