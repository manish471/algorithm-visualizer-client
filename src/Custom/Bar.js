import React, { Component } from 'react'
import { motion } from 'framer-motion';

import { connect } from 'react-redux';
import ArrayNode from './ArrayNode';

class Bar extends Component {


    scaleBetween = (unscaledNum, minAllowed, maxAllowed, min, max)=> {
        return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
    }

    render() {

        let value = this.scaleBetween(this.props.value,50,1700,0,1000000000);

        return (
            <div>
                <span>
                    {
                        JSON.parse(this.props.data_visualizer.metaData).types[this.props.value] === 'Array' ?
                            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ fontSize: '25px', color: '#fff' }}>{'['}</span>
                                <ArrayNode nodes={this.props.data_visualizer.timelineData[this.props.data_visualizer.step][this.props.value]} />
                                <span style={{ fontSize: '25px', color: '#fff' }}>{']'}</span>
                            </div>
                            :
                            <motion.div
                                initial={{
                                    width: this.props.value
                                }}
                                animate={{
                                    x: this.props.x,
                                    y: this.props.y,
                                    backgroundColor: this.props.nodeColor,
                                    scale: this.props.scale,
                                    width: value
                                }}
                                whileHover={{ backgroundColor: '#F57F17' }}
                                transition={{ duration: this.props.data_visualizer.speed / 1000, ease: 'easeInOut' }}
                                style={{ ...styles, ...this.props.styles }}
                            >
                                {this.props.value}
                            </motion.div>

                    }
                </span>
            </div>
        )
    }
}


const styles = {
    width: '50px',
    height: '50px',
    color: '#eee',
    margin: '10px',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    cursor: 'pointer',
}

const mapStateToProps = (state) => {
    return {
        data_visualizer: state.visualizer_reducer
    }
}

export default connect(mapStateToProps, null)(Bar);