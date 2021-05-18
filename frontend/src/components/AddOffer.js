import React, { useState } from 'react';
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


function AddOffer (props) {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [bonus, setBonus] = useState('');
  const [contract, setContract] = useState('');
  const [link, setLink] = useState('');
  const [resume, setResume] = useState('');

  var saveOffer = async offer => {
    props.addToAnounces(offer)

    const saveReq = await fetch('/wishlist-article', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `name=${article.title}&content=${article.content}&desc=${article.description}&lang=${props.selectedLang}&img=${article.urlToImage}&token=${props.token}`
    })
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
                <Input onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Tilte" />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input onChange={(e) => setCity(e.target.value)} type="text" name="city" placeholder="Paris" />
              </FormGroup>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input onChange={(e) => setDate(e.target.value)} type="text" name="date" placeholder="../../...." />
              </FormGroup>
              <FormGroup>
                <Label for="bonus">Bonus</Label>
                <Input onChange={(e) => setBonus(e.target.value)} type="text" name="bonus" placeholder="400€" />
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
                <Button style={{ margin: "10px", backgroundColor: '#254383' }}> Add </Button>
              </div>

            </Form>

          </Col>
        </Row>

      </Container>
    </div>

  );
}

export default AddOffer;