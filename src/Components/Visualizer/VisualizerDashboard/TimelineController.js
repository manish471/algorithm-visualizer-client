import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setStepValue} from '../../../Redux Store/Redux Actions/visualizer_action';

const Controller = withStyles({
    root: {
      color: '#15314b',
      height: 8,
      width:'100%'
    },
    thumb: {
      height: 20,
      width: 20,
      backgroundColor: '#4CAF50',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

class TimelineController extends Component {

  constructor(props) {
      super(props);
      this.state={
        metaData:this.props.metaData ? this.props.metaData:null
      }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.metaData != null){
      this.setState({metaData: nextProps.metaData});
    }
  }

  handleChange = (event, newValue) => {

    if(newValue >= this.state.metaData.steps.length)
      return;

    this.props.setStepValue(newValue);
  };

    render() {
      console.log('-------------------')
      console.log(this.state.metaData)
        return (
            <div style={{width:'100%'}}>
                <Controller
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={0}
                    value={this.props.data.step}
                    onChange = {this.handleChange}
                    min={1}
                    max={this.state.metaData && (this.state.metaData.steps.length)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      data: state.visualizer_reducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setStepValue,
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TimelineController);
