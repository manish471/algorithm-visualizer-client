import React, { Component } from 'react'
import { motion } from 'framer-motion';

import {connect} from 'react-redux';

class ObjectShape extends Component {
    render() {
        return (
                <motion.span 
                    animate={{
                    x: this.props.node.x,
                    y: this.props.node.y,
                    backgroundColor:this.props.node.nodeColor,
                    scale: this.props.node.scale,
                    rotateX: this.props.node.rotateX,
                    }} 
                    transition={{ duration: 1.2 }}
                    style={{...styles,...this.props.node.styles}}
                >
                    {JSON.stringify(this.props.node.val)}
                </motion.span>
                
        )
    }
}


const styles={
    height: '50px',
    color:'#eee',
    margin:'10px',
    display:'flex',justifyContent:'center',alignItems:'center',
    cursor:'pointer',
}

const mapStateToProps = (state) => {
    return {
        data_visualizer: state.visualizer_reducer
    }
}

export default connect(mapStateToProps,null)(ObjectShape);