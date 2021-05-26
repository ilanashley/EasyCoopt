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
  Col
} from "reactstrap";
import NavBar from "./NavBar";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// Background image
const backgroundImage = {
  backgroundImage: `url(${'/images/image_1.jpeg'})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

// Style
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
  btn: {
    display: 'inline-block',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#fff',
    textAlign: 'center',
    textDecoration: 'none',
    verticalAlign: 'middle',
    cursor: 'pointer',
    backgroundColor:    '#78CFCE',
    border: '1px solid transparent',
    padding: '.375rem .75rem',
    fontSize:' 1rem',
    borderRadius: '.75rem',
    '&:hover': {
      border: '1px solid transparent',
      backgroundColor: '#6bbbba'
    }
  }
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

  // Capitalize function
  const capitalize = (arg) => {
    if (typeof arg !== 'string') return ''
    return arg.charAt(0).toUpperCase() + arg.slice(1)
  }

  useEffect(() => {
    async function loadUser() {
      var rawResponse = await fetch(`/users/account?token=${props.token}`);
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
    var data = new FormData();

    data.append("avatar", PictureData);

    var rawResponse = await fetch("/users/upload", {
      method: "POST",
      body: data,
    });
    var newPicture = await rawResponse.json();
    if (newPicture) {
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
      body: `token=${props.token}&avatarUrl=${avatarUrl}&firstName=${firstName ? capitalize(firstName) : ''}&lastName=${lastName ? capitalize(lastName) : ''}&email=${email}&type=${type}&oldPassword=${oldPassword}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`,
    });

    const body = await data.json();    

    if (body.result === true ) {
      props.addProfileType(body.user.group)
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
    <div className="main-container" style={backgroundImage}>
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
          <div className="col-12 text-center get_started pt-4">
            <h3>Mon compte</h3>
          </div>
          <form className="md-form">
            <div className="file-field">
              <div className=" d-flex justify-content-center mb-4 p-4">
                <img
                  src={avatarUrl}
                  className="rounded-circle z-depth-1-half avatar-pic"
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
              <FormGroup>
                <Label for="avatar">Avatar</Label>
                <Input
                    type="file"
                    onChange={(e) => {
                      loadPicture(e.target.files[0])
                    }}
                    accept="image/png, image/jpeg"
                    name="avatar"
                    placeholder="Avatar"
                  />
              </FormGroup>
            </Form>
          </Col>
          <Col sm="12" md="6">
            <FormGroup>
              <Label for="profil">Mon profil d'utilisateur</Label>
              <select
                class="custom-select"
                defaultValue={props.group}
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
          <div className="d-flex justify-content-end py-4">
            <Button
              onClick={() => handleSubmitAccount()}
              className={classes.btn}
            >
              Enregistrer
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  );
}

/* recuperation du token et du group depuis redux */
function mapStateToProps(state) {
  return {
    token: state.token,
    group: state.group
  };
}

/* envoi du type de user a redux */
function mapDispatchToProps(dispatch) {
  return {
    addProfileType: function (group) {
      dispatch({ type: "addProfileGroup", group: group });
    },
  };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MyAccount);
