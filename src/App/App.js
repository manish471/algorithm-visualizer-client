import React, { Component } from 'react'
import './App.css';
import Visualizer from '../Components/Visualizer';
import Home from '../Components/Home';
import Algorithms from '../Components/Algorithms';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

import reducers from '../Redux Store/Redux Reducers';
import { Typography } from '@material-ui/core';
import { Error, Warning } from '@material-ui/icons';

const middleware = [thunk]
const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
      <Typography style={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'monospace', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '20px' }}>{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
      width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding:'10px !important'
  },
}))(MuiDialogContent);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideNav: false
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let currentHideNav = (window.innerWidth <= 760);
    if (currentHideNav !== this.state.hideNav) {
      this.setState({ hideNav: currentHideNav });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
  render() {

    return (
      <div>
        <Dialog aria-labelledby="customized-dialog-title" open={this.state.hideNav}>
          <DialogContent>
            <Warning sx={{margin:'10px',marginRight:'20px'}} />
            <p style={{marginRight:'10px',display:'flex',justifyContent:'center',alignItems:'center'}}>Screen size not allowed. Please switch to diffrent sized device.</p>
          </DialogContent>
        </Dialog>
        {
          !this.state.hideNav?
          (
            <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Algorithms" component={Algorithms} />
              <Route exact path="/Visualizer" component={Visualizer} />
            </Switch>
          </Router>
        </Provider>
          )
          :null
        }
        
      </div >
    );
  }

}

export default App;
