import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "../App.css";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import NavBar from "./NavBar";
import createPalette from "@material-ui/core/styles/createPalette";

function MyAccount(props) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(props.type);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [listErrorsAccount, setlistErrorsAccount] = useState([]);


  useEffect(() => {
    async function loadUser(){
      var rawResponse = await fetch(`/users/account/?token=${props.token}`);
      var response = await rawResponse.json();
      setAvatarUrl(response.avatarUrl);
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setEmail(response.email);
      setType(response.type);
    };
      loadUser();
  },[]);




  // Gère le  changement de type de user
  const handleTypeChange = (event, i) => {
    setType(event.target.value);
  };


  var handleSubmitAccount = async () => {

    let errorList = [];
    if(!email || !type ) {
      errorList.push("Champs vides");
      setlistErrorsAccount(errorList)
    }

    if (errorList.length == 0){
    const data = await fetch("/users/account", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.token}&avatarUrl=${avatarUrl}&firstName=${firstName}&lastName=${lastName}&email=${email}&type=${type}&oldPassword=${oldPassword}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`,
    });

    const body = await data.json();
    setlistErrorsAccount(body.error);

    if (body.result == true && listErrorsAccount.length == 0) {
      setUserExists(true);
    } 
  }
  };

  let tabErrorsAccount = listErrorsAccount.map((error, i) => {
    return <p>{error}</p>;
  });   

  // redirige le user si son changement de profil est bien enregistré
  if (userExists) {
    return <Redirect to="/jobsavailable" />;
  }

  // uniquement pendant le test, redirect si le  token est null
  if (!props.token) {
    return <Redirect to="/login" />;
  }


  return (
    <div className="section">
      <NavBar />
      <Container>
        <Row
          className="cardBackground"
          style={{ padding: "10px", marginTop: "50px" }}
        >
          <div class="col-12 text-center get_started">
            <h3>Mon compte</h3>
          </div>
          <Col sm="12" md="6">
            <Form>
              <FormGroup>
                <Label for="firstname">Prénom</Label>
                <Input
                  value ={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastname">Nom</Label>
                <Input
                value ={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  name="nom"
                  placeholder="Nom"
                />
              </FormGroup>
              <FormGroup>
                <Label for="avatar">Avatar</Label>
                <Input
                  value ={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  type="text"
                  name="avater"
                  placeholder="Avatar"
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  value ={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </FormGroup>
            </Form>
          </Col>
          <Col sm="12" md="6">
            <FormGroup>
              <Label for="profil">Votre profil</Label>
              <select
                value ={type}
                defaultValue="Sélectionner..."
                class="custom-select"
                id="inputGroupSelect01"
                onChange={(e) => handleTypeChange(e)}
                aria-label="Default select example"
                >
                <option value="Coopteur">Coopteur</option>
                <option value="Recruteur">Recruteur</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="ancien mot de passe">Ancien mot de passe</Label>
              <Input
                onChange={(e) => setOldPassword(e.target.value)}
                type="text"
                name="ancien mot de passe"
                placeholder="Ancien mot de passe"
              />
            </FormGroup>
            <FormGroup>
              <Label for="ancien mot de passe">Nouveau mot de passe</Label>
              <Input
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
                name="nouveau mot de passe"
                placeholder="Nouveau mot de passe"
              />
            </FormGroup>
            <FormGroup>
              <Label for="ancien mot de passe">
                Confirmer nouveau mot de passe
              </Label>
              <Input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="text"
                name="confirmer nouveau mot de passe"
                placeholder="Confirmer nouveau mot de passe"
              />
            </FormGroup>
           
          </Col>
          {tabErrorsAccount}
          <div class="btnEnd1">
            <Button
              onClick={() => handleSubmitAccount()}
              style={{ margin: "10px", backgroundColor: "#254383" }}
            >
              Enregistrer
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

/* recuperation du token depuis redux */
function mapStateToProps(state) {
  return { token: state.token };
}

/* envoi du type de user a redux */
function mapDispatchToProps(dispatch) {
    return {
        addProfileType: function(type) {
        dispatch({type: 'addProfileType', type : type})
      }
    }
  }  

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
