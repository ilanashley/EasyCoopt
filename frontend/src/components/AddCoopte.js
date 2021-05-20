import React, { useState } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavBar from './NavBar';
import { useParams, Redirect } from "react-router-dom";




const AddCoopte = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [cv, setCv] = useState('');
  const [modal, setModal] = useState(false);

  const {offerId} = useParams();



  var saveCoopte = async () => {

    var data = new FormData();

    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('email', email);
    data.append('reason', reason);
    data.append('creationDate', creationDate);
    data.append('offerId', offerId);


    data.append(
      "cv",
      cv,
      cv.name


    );
    console.log('cv', cv);


    const saveReq = await fetch('/referrals/add', {
      method: 'post',
      body: data
    })
    var response = await saveReq.json();
   console.log("modal", modal)
    setModal(!modal)
  }
  const toggleRedirect = () => {
    setModal(!modal)
    if(modal == false) {
      return <Redirect to={'/referralsList'}/>
    }
  };

 if(!props.token){
            return <Redirect to="/myaccount" />;
        } else{return (
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
                      <Label for="creationDate">Date</Label>
                      <Input onChange={(e) => setCreationDate(e.target.value)} type="date" name="creationDate" placeholder="../../...." />
                    </FormGroup>
                    <FormGroup>
                      <Label for="cv">Curriculum Vitae</Label>
                      <Input onChange={(e) => { console.log(e.target.files); setCv(e.target.files[0]) }} type="file" name="cv" placeholder="upload cv" />
                    </FormGroup>
      
                    <FormGroup>
                      <Label for="reason">Reason of cooptation</Label>
                      <Input onChange={(e) => setReason(e.target.value)} type="textarea" name="reason" />
                    </FormGroup>
      
                    <div class="btnEnd">
                      <Button onClick={() => { saveCoopte() }} style={{ margin: "10px", backgroundColor: '#254383' }}> Send </Button>
                    </div>
                  </Form>
                  <Modal isOpen={modal} >
                    <ModalBody>
                      Votre cooptation a bien été prise en compte!
                  </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={() => {toggleRedirect()}}>Close</Button>
                    </ModalFooter>
                  </Modal>
                </Col>
              </Row>
      
            </Container>
          </div>
      
        );
          
        }
  
}

function mapStateToProps(state) {
  console.log("state", state)
  return {
    token: state.token,
  }
}

export default connect(
  mapStateToProps, null
)(AddCoopte)