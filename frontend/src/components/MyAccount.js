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
  Alert
} from "reactstrap";
import NavBar from "./NavBar";
import ErrorIcon from '@material-ui/icons/Error';

function MyAccount(props) {

  const [avatarUrl, setAvatarUrl] = useState('https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg ');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [listErrorsAccount, setlistErrorsAccount] = useState([]);


  useEffect(() => {
    async function loadUser() {
      var rawResponse = await fetch(`/users/account/?token=${props.token}`);
      var response = await rawResponse.json();
      if (response.avatarUrl){
      setAvatarUrl(response.avatarUrl);
      }
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setEmail(response.email);
      setType(response.type);
    };
    loadUser();
  }, []);

  let loadPicture = async () => {
    console.log('le fichier arrive dans loadPicture-->', avatarUrl)
    var data = new FormData();

    data.append(
      'avatar',
      avatarUrl,
    );

    var rawResponse = await fetch("/users/upload", {
      method: 'POST',
      body: data
    });
    var newPicture = await rawResponse.json();
    if (newPicture) {
      console.log('new picture OK', newPicture.secure_url)
     setAvatarUrl(newPicture.secure_url)
    }
  }
  

  // Gère le  changement de type de profil du user
  const handleTypeChange = (event) => {
    setType(event);
  };

  var handleSubmitAccount = async () => {
    const data = await fetch("/users/account", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${props.token}&avatarUrl=${avatarUrl}&firstName=${firstName}&lastName=${lastName}&email=${email}&type=${type}&oldPassword=${oldPassword}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`,
    });

    const body = await data.json();
    setlistErrorsAccount(body.error);
    props.addProfileType(type)
    console.log(type)

    if (body.result == true && listErrorsAccount.length == 0) {
      setUserExists(true);
    }

  };

  let tabErrorsAccount = listErrorsAccount.map((error, i) => {
    return <Alert color="warning"><ErrorIcon style={{color: "#f78400"}} fontSize="medium" />{error}</Alert>;   
  });

  // redirige le user si son changement de profil est bien enregistré
  if (userExists) {
    return <Redirect to="/offersList" />;
  }

  // redirect si le  token est null
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
          <form class="md-form">
            <div class="file-field">
              <div class=" d-flex justify-content-center mb-4">
                <img src={avatarUrl}
                  class="rounded-circle z-depth-1-half avatar-pic" alt="Chargement de l'avatar en cours" height="130px" width="130px" />
              </div>
              <div class="d-flex justify-content-center">
                <div class="btn btn-mdb-color btn-rounded float-left">
                  <Input
                    type="file"
                    onChange={(e) => { console.log('Le fichier est bien envoye tout contenu-->',e.target.files[0]); setAvatarUrl(e.target.files[0])}}

                    accept="image/png, image/jpeg"
                    name="avatar"
                    placeholder="Avatar"
                  />
                  <Button
                    onClick={() => {console.log('L avatar url arrive bien dans ce bouton-->',avatarUrl);loadPicture()}}
                    style={{ margin: "10px" }}
                  >
                    Sauvegarder votre portrait
                  </Button>
                  {tabErrorsAccount}
                </div>
              </div>
            </div>
          </form>
            <Col sm="12" md="6">
              <Form>
                <FormGroup>
                  <Label for="firstname">Prénom</Label>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="lastname">Nom</Label>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    name="nom"
                    placeholder="Nom"
                  />
                </FormGroup>
                {/* <FormGroup>
                <Label for="avatar">Avatar</Label>
                <Input
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  type="text"
                  name="avater"
                  placeholder="Avatar"
                />
              </FormGroup> */}
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    value={email}
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
                <Label for="profil">Mon profil d'utilisateur</Label>
                <select
                  // defaultValue ={type}
                  class="custom-select"
                  defaultValue={props.typeId}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  // onChange={handleTypeChange}
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

/* recuperation du token et du typeID depuis redux */
function mapStateToProps(state) {
  return { 
    token: state.token, 
    typeId: state.typeId,
    isLogin: state.isLogin 
  };
}

/* envoi du type de user a redux */
function mapDispatchToProps(dispatch) {
  return {
      addProfileType: function(typeId) {
      dispatch({ type: 'addProfileType', typeId: typeId })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
