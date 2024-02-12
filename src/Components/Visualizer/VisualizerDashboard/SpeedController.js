import React, { Component } from 'react';
import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setSpeedValue} from '../../../Redux Store/Redux Actions/visualizer_action';

const MySlider = withStyles({
    markLabel:{
      color:"#fff",
      fontSize:'13px'
    },

  })(Slider);
  
  const marks = [
    {
      value: 1,
      label: '1X',
    },
    {
      value: 2,
      label: '2X',
    },
    {
      value: 3,
      label: '3X',
    },
  ];

class SpeedController extends Component {

    valuetext = (value)=> {
        return `${value-1}X`;
    }

    handleSpeed=(event, newValue)=>{

      let speeds = {1:1000,2:500,3:250};
      this.props.setSpeedValue(speeds[newValue]);

    }

    render() {
        return (
            <div style={{width:150,display:'flex',justifyContent:'center',alignItems:'center'}}>
                <MySlider
                defaultValue={1}
                getAriaValueText={this.valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                disabled={this.props.data_visualizer.start}
                onChange={this.handleSpeed}
                marks = {marks}
                min={1}
                max={3}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      data_visualizer: state.visualizer_reducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      setSpeedValue,
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SpeedController);
