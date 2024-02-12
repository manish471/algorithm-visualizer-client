// RECENTLY MERGED WITH VISUALIZER2.0 BRANCH
// Almost Done!!!


import React from 'react';
import './App.css';
import Visualizer from '../Components/Visualizer';
import Home from '../Components/Home';
import Algorithms from '../Components/Algorithms';
import {Switch,Route,BrowserRouter as Router} from 'react-router-dom';

import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'

import reducers from '../Redux Store/Redux Reducers';

const middleware = [thunk]
const store = createStore(reducers,composeWithDevTools(applyMiddleware(...middleware)));


function App() {
  
  return (
    <div>
      <Provider store={store}>
        <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Algorithms" component={Algorithms} />
          <Route exact path="/Visualizer" component={Visualizer} />
        </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
