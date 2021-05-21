import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

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
  }
}));

export default function TransitionsModal(props) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let modalIcon 
  if(props.modalIcon === 'VisibilityOutlinedIcon') {
    modalIcon = <div><VisibilityOutlinedIcon style={{cursor: 'pointer'}} onClick={handleOpen} /> {props.modalDescription.substring(0,15)}... </div>
  } else if (props.modalIcon === 'AssignmentOutlinedIcon') {
    modalIcon = <div><AssignmentOutlinedIcon style={{cursor: 'pointer'}} onClick={handleOpen} /></div>
  }

  let modalTitle
  if(props.modalTitle) {
    modalTitle = <h2 id="transition-modal-title">{props.modalTitle}</h2>
  }

  let modalDescription
  if(props.modalDescription) {
    modalDescription = <p id="transition-modal-description">{props.modalDescription}</p>
  }

  let resumeImage
  if(props.referralResumeUrl) {
     resumeImage = <div className='d-flex flex-column'>
                      <img src={props.referralResumeUrl} height={600} width={400} alt='Resume'></img>
                      {/* <a href={props.referralResumeUrl} download> Download CV</a>
                      <button onclick={handleDownloadResume}>Télécharger</button> */}
                    </div>                  
  }

  return (
    <div>
      {modalIcon}
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
            {modalTitle}
            {modalDescription}
            {resumeImage}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
