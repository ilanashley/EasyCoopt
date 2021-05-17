import React, { useState } from 'react';
import './App.css';
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

const AddOffer = (props) => {
  const [title, setTitle ]= useState('');
  const [city, setCity] = useState('');
  const [bonus, setBonus] = useState('');
  const [contract, setContract] = useState('');
  const [link, setLink] = useState('');
  const [resume, setResume] = useState('');
  

  return (
    <div className="section">
       <div className='navbarContainer'>
                <nav className="navbar navbar-light bg-white">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><img src='./logo.png' height="40px"/></a>
                        <div className="d-flex">
                            <a className="navbar-brand" href="#">Announces</a>
                            <a className="navbar-brand" href="#">History</a>
                            <Button id="largeButton" style={{margin:"10px"}}>  <PersonOutlineIcon fontSize="medium" /></Button>
                            <Button id="largeButton" style={{margin:"10px"}}>  <ExitToAppIcon fontSize="medium" /></Button>
                        </div>
                    </div>
                </nav>
            </div>
  <Container>
           

      <Row className="cardBackground" style={{ padding: "10px", marginTop:"50px" }} >
        <Col  sm="12" md={{ size: 6, offset: 3 }} >
          <h3 style={{margin:"40px"}}>Add Offer</h3>
        <Form>
          <FormGroup>
            <Label for="title">Job Title</Label>
            <Input onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Title" />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input onChange={(e) => setCity(e.target.value)}type="text" name="city"  placeholder="Paris" />
          </FormGroup>
          <FormGroup>
            <Label for="bonus">Bonus</Label>
            <Input onChange={(e) => setBonus(e.target.value)} type="text" name="bonus"  placeholder="400€" />
          </FormGroup>
          <FormGroup>
            <Label for="contract">Type of contract</Label>
            <Input onChange={(e) => setContract(e.target.value)} type="text" name="contract" placeholder="CDI" />
          </FormGroup>
          <FormGroup>
            <Label for="link">Link offer</Label>
            <Input onChange={(e) => setLink(e.target.value)} type="link" name="link"  placeholder="https://" />
          </FormGroup>

          <FormGroup>
            <Label for="resume">Resume</Label>
            <Input onChange={(e) => setResume(e.target.value)} type="textarea" name="resume" />
          </FormGroup>

          <div class="btnEnd">
          <Button style={{margin:"10px", backgroundColor: '#254383'}}> Add </Button>
         </div>
         
        </Form>
       
        </Col>
      </Row>

    </Container>
    </div>

  );
}

export default AddOffer;