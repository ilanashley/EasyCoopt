import React, { useState } from 'react';
import '../App.css';
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
import NavBar from './NavBar'


const AddCoopte = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');

  return (
    <div className="section">
      <NavBar />

      <Container >

        <Row className="cardBackground" style={{ padding: "10px", marginTop: "50px" }} >
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h3 style={{ margin: "40px" }}>You co-opt for the "job title"</h3>
            <Form>
              <FormGroup>
                <Label for="firstname">Firstname</Label>
                <Input onChange={(e) => setFirstName(e.target.value)} type="text" name="firstname" placeholder="john" />
              </FormGroup>
              <FormGroup>
                <Label for="lastname">Lastname</Label>
                <Input onChange={(e) => setLastName(e.target.value)} type="text" name="lastname" placeholder="Doe" />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="johndoe@gmail.com" />
              </FormGroup>
              <FormGroup>
                <Label for="cv">Curriculum Vitae</Label>
                <Input type="text" name="cv" placeholder="upload cv" />
              </FormGroup>

              <FormGroup>
                <Label for="reason">Reason of cooptation</Label>
                <Input onChange={(e) => setReason(e.target.value)} type="textarea" name="reason" />
              </FormGroup>
              <div class="btnEnd">
                <Button style={{ margin: "10px", backgroundColor: '#254383' }}> Send </Button>
              </div>
            </Form>
          </Col>
        </Row>

      </Container>
    </div>

  );
}

export default AddCoopte;