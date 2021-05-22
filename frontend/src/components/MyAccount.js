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
  Alert,
} from "reactstrap";
import NavBar from "./NavBar";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// Modal style
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function MyAccount(props) {

  const [avatarUrl, setAvatarUrl] = useState(
    "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg "
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState('')
  const [uploadPicture, setUploadPicture] = useState('')

  // Modal state
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // Modal function
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function loadUser() {
      var rawResponse = await fetch(`/users/account/?token=${props.token}`);
      var response = await rawResponse.json();
      if (response.avatarUrl) {
        setAvatarUrl(response.avatarUrl);
      }
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setEmail(response.email);
      setType(response.type);
    }
    loadUser();
  }, []);

// UseEffect afin d'afficher l'avatar de cloudinary
useEffect(() => {
  setAvatarUrl(uploadPicture)
}, [uploadPicture]);

  async function loadPicture (PictureData) {
    console.log("le fichier arrive dans loadPicture-->", avatarUrl);
    var data = new FormData();

    data.append("avatar", PictureData);

    var rawResponse = await fetch("/users/upload", {
      method: "POST",
      body: data,
    });
    var newPicture = await rawResponse.json();
    if (newPicture) {
      // console.log("new picture OK", newPicture.secure_url);
      setUploadPicture(newPicture.secure_url);
    }
  };

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

    if (body.result === true ) {
      // console.log(body.user.groupsId)
      props.addProfileType(body.user.groupsId)
      setUserExists(true);
    } else {
      setError(body.error)
      setOpen(true)
    }
  };

  // redirige le user si son changement de profil est bien enregistré
  if (userExists) {
    return <Redirect to="/offersList" />;
  }

  // redirect si le  token est null
  if (!props.token) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="main-container">
      <div className='d-flex justify-content-center'>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              {error}
            </div>
          </Fade>
        </Modal>
      </div>
      <NavBar />
      <Container className='pb-5'>
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
                <img
                  src={avatarUrl}
                  class="rounded-circle z-depth-1-half avatar-pic"
                  alt="Cliquez sur Sauvegarder afin d'enregistrer votre photo"
                  height="130px"
                  width="130px"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";
                  }}
                />
              </div>
              <div class="d-flex justify-content-center">
                <div class="btn btn-mdb-color btn-rounded float-left">
                  <Input
                    type="file"
                    onChange={(e) => {
                      // console.log(
                      //   "Le fichier est bien envoye tout contenu-->",
                      //   e.target.files[0]
                      // );
                      setAvatarUrl(e.target.files[0]);  loadPicture(e.target.files[0])
                    }}
                    accept="image/png, image/jpeg"
                    name="avatar"
                    placeholder="Avatar"
                  />
                  {/* <Button
                    onClick={() => {
                      console.log(
                        "L avatar url arrive bien dans ce bouton-->",
                        avatarUrl
                      );
                      ;
                    }}
                    style={{ margin: "10px" }}
                  >
                    Sauvegarder votre portrait
                  </Button> */}
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
                class="custom-select"
                defaultValue={props.typeId}
                onChange={(e) => handleTypeChange(e.target.value)}
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
                type="password"
                name="ancien mot de passe"
                placeholder="Ancien mot de passe"
              />
            </FormGroup>
            <FormGroup>
              <Label for="ancien mot de passe">Nouveau mot de passe</Label>
              <Input
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
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
                type="password"
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
}

/* recuperation du token et du typeID depuis redux */
function mapStateToProps(state) {
  return {
    token: state.token,
    typeId: state.typeId
  };
}

/* envoi du type de user a redux */
function mapDispatchToProps(dispatch) {
  return {
    addProfileType: function (typeId) {
      dispatch({ type: "addProfileType", typeId: typeId });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
