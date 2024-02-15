import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';

import CodeIcon from '../../../Icons/edit-code.png';
import OutputIcon from '../../../Icons/output.png';
import VisualizeIcon from '../../../Icons/data-analytics.png';
import { navItem } from '../../Home/css/Header.css';
import { BACKEND_URL } from '../../../config/config';
import { ContactSupport, Grain } from '@material-ui/icons';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        width: '320px',
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
            <Typography style={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'monospace', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>{children}</Typography>
            {onClose ? (
                <IconButton style={{ fontWeight: 'bold' }} aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
}))(MuiDialogContent);


export default function Instructions() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <ContactSupport style={{ fontSize: 30 }} onClick={handleClickOpen} />

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Instructions
                </DialogTitle>
                <DialogContent dividers>
                    <div style={{ cursor: 'pointer', width: '88%', color: '#fff', fontFamily: 'monospace', fontSize: '18px', borderRadius: '10px', backgroundColor: '#42A5F5', height: '60px', margin: '10px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '10px' }}>
                        <div style={{ fontWeight: 'bold', margin: '10px', color: '#2c387e' }}>1.</div>
                        <img alt='.' style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '20px' }} src={CodeIcon} />
                        <span>Write your own code in the given code editor. Only <b>Javascript</b> language is supported.</span>
                    </div>

                    <div style={{ cursor: 'pointer', width: '88%', color: '#fff', fontFamily: 'monospace', fontSize: '18px', borderRadius: '10px', backgroundColor: '#42A5F5', height: '60px', margin: '10px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '10px' }}>
                        <div style={{ fontWeight: 'bold', margin: '10px', color: '#2c387e' }}>2.</div>
                        <img alt='.' style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '20px' }} src={OutputIcon} />
                        <span>Click on <b>Run</b> button and get yout output of written code <b>Output Console</b>. It also shows syntax errors in your code.</span>
                    </div>

                    <div style={{ cursor: 'pointer', width: '88%', color: '#fff', fontFamily: 'monospace', fontSize: '18px', borderRadius: '10px', backgroundColor: '#42A5F5', height: '120px', margin: '10px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '10px' }}>
                        <div style={{ fontWeight: 'bold', margin: '10px', color: '#2c387e' }}>3.</div>
                        <img alt='.' style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '20px' }} src={VisualizeIcon} />
                        <span>Click on <b><Grain /></b> button to trace your code line by line, to know what datastructures are involved, your function callstack and more interestingly the visualization of your own code. Happy Coding!!!!</span>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
