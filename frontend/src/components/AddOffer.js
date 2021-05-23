import React, { useState, useEffect, useRef } from 'react';
import { Redirect, useParams } from 'react-router-dom';
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
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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

  const [offerModifiee, setOfferModifiee] = useState(false);

  const [error, setError] = useState('')
  const [offer, setOffer] = useState(false)
  const [stringDate, setStringDate] = useState(new Date().toISOString().substr(0,10))

  const [modal, setModal] = useState(false);

  var { id } = useParams();

  useEffect(() => {
    async function loadOffer() {
      const rawResponse = await fetch(`/offers/get`);
      const response = await rawResponse.json();
      if(response.result === true) {
        const offer = response.offers.filter(offer => offer._id == id)
        if(offer.length !== 0) {
          setTitle(offer[0].title)
          setCity(offer[0].city)
          setCreationDate(offer[0].creationDate)
          setBonusAmount(offer[0].bonusAmount)
          setContract(offer[0].contract)      
          setResume(offer[0].resume)
          if(offer[0].link) {
            setLink(offer[0].link)
          }
          setOffer(true)
        } 
      } else {
        setError(response.error)
        setModal(!modal);
      }
      
      // console.log('offerDate --> ',offerDate)
      // if(offer) {
      //   let offerDate = new Date(offer[0].creationDate)
      //   let stringDate = offerDate.getFullYear() + '-' + ('0' + (offerDate.getMonth()+1)).slice(-2) + '-' + ('0' + offerDate.getDate()).slice(-2);
      //   setStringDate(stringDate)
      //   setOffer(...offer)
        
      //   console.log('stringDate --> ',stringDate)
        
      // } else {
      //   let currentDate = new Date();
      //   let stringDate = currentDate.toISOString().substr(0,10);
      //   console.log('stringDateBis --> ',stringDate)
      //   setStringDate(stringDate)
      // }
    };
    loadOffer();
  }, []);

  // const isInitialMount = useRef(true);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     isInitialMount.current = false;
  //   } else {
  //     let offerDate = new Date(offer.creationDate)
  //     let stringDate = offerDate.getFullYear() + '-' + ('0' + (offerDate.getMonth()+1)).slice(-2) + '-' + ('0' + offerDate.getDate()).slice(-2);
  //     setCreationDate(stringDate)
  //   }
  // });

  // useEffect(() => {
  //   let offerDate = new Date(offer.creationDate)
  //   let stringDate = offerDate.getFullYear() + '-' + ('0' + (offerDate.getMonth()+1)).slice(-2) + '-' + ('0' + offerDate.getDate()).slice(-2);
  //   setCreationDate(stringDate)
  // }, [offer]);

  let modalButtonText
  let methodOption
  let pageTitle
  let body
  
  // let stringDate
  if(offer) {
    methodOption = 'PUT' // Fetch method option
    modalButtonText = 'Modifier'
    pageTitle = 'Modifier une offre'
    body = `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&status=${true}&id=${id}&token=${props.token}`
    // let offerDate = new Date(offer.creationDate)
    // stringDate = offerDate.getFullYear() + '-' + ('0' + (offerDate.getMonth()+1)).slice(-2) + '-' + ('0' + offerDate.getDate()).slice(-2);

  } else {
    methodOption = 'POST' // Fetch method option
    modalButtonText = 'Ajouter'
    pageTitle = 'Ajouter une offre'
    body = `title=${title}&city=${city}&creationDate=${creationDate}&bonusAmount=${bonusAmount}&contract=${contract}&link=${link}&resume=${resume}&status=${true}&token=${props.token}`
    // let currentDate = new Date();
    // stringDate = currentDate.toISOString().substr(0,10);

  }

  var saveOffer = async () => {
    const saveReq = await fetch('/offers/add', {
      method: methodOption,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body
    })
    const response = await saveReq.json()
    if(response.result === false) {
      setError(response.error)
      setModal(!modal);
    } else {
      setError(response.message)
      setModal(!modal)
    }
  }
    
  const toggle = () => {
    setModal(!modal);
  };

  const toggleBack = () => {
    setModal(!modal);
    setOfferModifiee(true)
  };

  if (offerModifiee) {
    return <Redirect to='/offerslist' />
  }

  if (!props.token) {
    return <Redirect to="/login" />;
  } else if (props.typeId !== 'Recruteur') {
    return <Redirect to="/offersList" />;
  }

  return (

    <div className="section">
      <NavBar />
      <h1 style={{ display: "flex", justifyContent: 'center', padding: 20 }}>{pageTitle}</h1>

      <Container>
        <Row className="cardBackground" style={{ padding: "10px", marginTop: "20px", marginBottom: "50px" }} >


          <Col sm="12" md={{ size: 6, offset: 3 }} >
            <Form>
              <FormGroup>
                <Label for="title">Job Title</Label>
                <Input defaultValue={title ? title : ''} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Title" />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input defaultValue={city ? city : ''} onChange={(e) => setCity(e.target.value)} type="text" name="city" placeholder="Paris" />
              </FormGroup>
              <FormGroup>
                <Label for="creationDate">Date</Label>
                <Input defaultValue={stringDate}  onChange={(e) => setCreationDate(e.target.value)} type="date" name="creationDate" placeholder="../../...." />
              </FormGroup>
              <FormGroup>
                <Label for="bonusAmount">Bonus</Label>
                <Input defaultValue={bonusAmount ? bonusAmount : ''} onChange={(e) => setBonusAmount(e.target.value)} min={0} max={1000} type="number" step="10" name="bonusAmount" placeholder="400€" />
              </FormGroup>
              <FormGroup>
                <Label for="contract">Type of contract</Label>
                <select defaultValue={contract ? contract : 'CDI'} className="form-select" onChange={(e) => setContract(e.target.value)} aria-label="Default select example" name="contract">
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Stage">Stage</option>
                </select>
              </FormGroup>
              <FormGroup>
                <Label for="link">Link offer</Label>
                <Input defaultValue={link ? link : ''} onChange={(e) => setLink(e.target.value)} type="link" name="link" placeholder="https://" />
              </FormGroup>
              <FormGroup>
                <Label for="resume">Resume</Label>
                <Input defaultValue={resume ? resume : ''} onChange={(e) => setResume(e.target.value)} type="textarea" name="resume" />
              </FormGroup>
              <div class="btnEnd">
                <Button onClick={() => { { toggle() } { saveOffer() } }} style={{ margin: "10px", backgroundColor: '#254383' }}> {modalButtonText} </Button>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalBody>
                    {error}
                  </ModalBody>
                  <ModalFooter>
                  <Button color="secondary" onClick={() => setModal(!modal)}>Rester sur la page</Button>
                    <Button color="secondary" onClick={toggleBack}>Page des offres</Button>
                  </ModalFooter>
                </Modal>
              </div>
            </Form>
          </Col>
        </Row>

      </Container>
    </div>

  );
}

function mapStateToProps(state) {
  return {
    token: state.token,
    typeId: state.typeId
  }
}

export default connect(
  mapStateToProps,
  null
)(AddOffer)
