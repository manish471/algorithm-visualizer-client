import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';

import GoogleIcon from '../../../Icons/google.png';
import GithubIcon from '../../../Icons/github.png';
import { navItem1 } from '../css/Header.css';
import {BACKEND_URL} from '../../../config/config';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width:'320px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography style={{fontWeight:'bold',fontSize:'20px',fontFamily:'monospace',display:'flex',justifyContent:'center',alignItems:'center'}}>{children}</Typography>
      {onClose ? (
        <IconButton style={{fontWeight:'bold'}} aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width:'320px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
  },
}))(MuiDialogContent);


export default function LoginPanel() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <motion.span 
      whileHover={{
      scale: 1.1,
      transition: { duration: 0.5 },
      }}
      whileTap={{ scale: 0.9 }}
      style={{...navItem1,width:'20vw',color:'#fff'}}
      onClick={handleClickOpen}
      >
          Login
      </motion.span>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Login to Algorithm Visualizer
        </DialogTitle>
        <DialogContent dividers>
          <div onClick={()=>window.open(`${BACKEND_URL}/api/auth/google`, "_self")} style={{cursor:'pointer',width:'300px',color:'#fff',fontFamily:'monospace',fontSize:'18px',borderRadius:'10px',backgroundColor:'#42A5F5',height:'60px',margin:'10px',display:'flex',justifyContent:'center',alignItems:'center'}}>
             <img alt='.' style={{width:'30px',height:'30px',borderRadius:'50%',marginRight:'10px'}} src={GoogleIcon}/>
             <span>Google</span>
          </div>
          <div onClick={()=>window.open(`${BACKEND_URL}/api/auth/github`, "_self")} style={{cursor:'pointer',width:'300px',color:'#fff',fontFamily:'monospace',fontSize:'18px',borderRadius:'10px',backgroundColor:'#9E9E9E',height:'60px',margin:'10px',display:'flex',justifyContent:'center',alignItems:'center'}}>
             <img alt='.' style={{width:'30px',height:'30px',borderRadius:'50%',marginRight:'10px'}} src={GithubIcon}/>
             <span>Github</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
