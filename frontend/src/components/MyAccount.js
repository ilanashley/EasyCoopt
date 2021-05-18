import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import '../App.css';
import {Form,FormGroup, Label, Input, Button, Container, Row, Col} from 'reactstrap';
import NavBar from './NavBar'

const MyAccount = (props) => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userExists, setUserExists] = useState(false)
    const [listErrorsAccount, setlistErrorsAccount] = useState([])

    var handleSubmitAccount = async () => {

        const data = await fetch('/account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `token=${props.token}&avatarUrl=${avatarUrl}&firstName=${firstName}&lastName=${lastName}&email=${email}&type=${type}&oldPassword=${oldPassword}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`
        })
    

        const body = await data.json();
    
         if (body.result == true) {
           setUserExists(true)
    
         } else {
            setlistErrorsAccount(body.error)
         }
      }

      let tabErrorsAccount = listErrorsAccount.map((error, i) => {
        return (<p>{error}</p>)
      })
    
      if (userExists) {
        return <Redirect to='/jobsavailable' />
      }

    return (
        <div className="section">
          <NavBar />
          <Container>
                <Row className="cardBackground" style={{ padding: "10px", marginTop: "50px" }} >
                <div class="col-12 text-center get_started">
                            <h3>Mon compte</h3>
                </div>
                <Col sm="12" md="6">
                    <Form>
                        <FormGroup>
                            <Label for="firstname">Prénom</Label>
                            <Input onChange={(e) => setFirstName(e.target.value)} type="text" name="prenom" placeholder="Prénom" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastname">Nom</Label>
                            <Input onChange={(e) => setLastName(e.target.value)} type="text" name="nom" placeholder="Nom" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="avatar">Avatar</Label>
                            <Input onChange={(e) => setAvatarUrl(e.target.value)} type="text" name="avater" placeholder="Avatar" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email" />
                        </FormGroup>
                    </Form>
                </Col>
                <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="profil">Votre profil</Label>
                            <select class="custom-select" id="inputGroupSelect01">
                                <option selected>Sélectionner...</option>
                                <option value="Coopteur">Coopteur</option>
                                <option value="Recruteur">Recruteur</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="ancien mot de passe">Ancien mot de passe</Label>
                            <Input onChange={(e) => setOldPassword(e.target.value)} type="text" name="ancien mot de passe" placeholder="Ancien mot de passe" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ancien mot de passe">Nouveau mot de passe</Label>
                            <Input onChange={(e) => setNewPassword(e.target.value)} type="text" name="nouveau mot de passe" placeholder="Nouveau mot de passe" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ancien mot de passe">Confirmer nouveau mot de passe</Label>
                            <Input onChange={(e) => setConfirmPassword(e.target.value)} type="text" name="confirmer nouveau mot de passe" placeholder="Confirmer nouveau mot de passe" />
                        </FormGroup>
                        {tabErrorsAccount}
                </Col>
                <div class="btnEnd1">
                <Button onClick={() => handleSubmitAccount()} style={{ margin: "10px", backgroundColor: '#254383' }}>Enregistrer</Button>
                </div>
                </Row>
          
          </Container>
          </div>
    );
    }



function mapStateToProps(state) {
    return { token: state.token};
  }
   
export default connect(mapStateToProps,null)(MyAccount);
  
  