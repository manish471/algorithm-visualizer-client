import React, { Component } from 'react'
import { motion } from 'framer-motion';

import {connect} from 'react-redux';
import ArrayNode from './ArrayNode';
import { Tooltip } from '@material-ui/core';

class Circle extends Component {
    render() {
        return (
            <div>
                <span>
                {
                    this.props.data_visualizer.metaData && JSON.parse(this.props.data_visualizer.metaData).types[this.props.value] === 'Array'?
                    <div style={{width:'100%',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
                        <span style={{fontSize:'25px',color:'#fff'}}>{'['}</span>
                            <ArrayNode nodes = {this.props.data_visualizer.timelineData[this.props.data_visualizer.step].Arrays[this.props.value]}/> 
                        <span style={{fontSize:'25px',color:'#fff'}}>{']'}</span>
                    </div>
                    :
                    <Tooltip arrow={true} title={this.props.value}>
                    <motion.div 
                        animate={{
                        x: this.props.x,
                        y: this.props.y,
                        backgroundColor:this.props.nodeColor,
                        scale: this.props.scale,
                        rotateX: this.props.rotateX,
                        }} 
                        // drag 
                        // layout
                        // dragMomentum={false}
                        whileHover={{backgroundColor:'#F57F17'}}
                        transition={{ duration: this.props.data_visualizer.speed/1000 }}
                        style={{...styles,...this.props.styles}}
                        // onDrag={(event,info)=>this.props.handleDrag(event,info,this.props.value)}
                    >   
                        
                        {this.props.value>999?'{...}':this.props.value}

                    </motion.div>
                    </Tooltip>
                
                }
                </span>
            </div>
        )
    }
}


const styles={
    width: '50px',
    height: '50px',
    color:'#eee',
    borderRadius: '50%',
    margin:'10px',
    display:'flex',justifyContent:'center',alignItems:'center',
    cursor:'pointer',
}

const mapStateToProps = (state) => {
    return {
        data_visualizer: state.visualizer_reducer
    }
}

export default connect(mapStateToProps,null)(Circle);