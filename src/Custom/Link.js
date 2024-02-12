import React from 'react'
import { motion } from 'framer-motion';

function Link(props) {


    switch (props.dir) {
        case 'E':
            return (
                <motion.div
                    
                    transition={{ duration: 1.2 }}
                    style={{...containerStyles,transform:'rotateZ(0deg)'}}
                >
                    <motion.div style={{...lineStyles,width: props.lineLength?props.lineLength:'15px'}}></motion.div>
                    <motion.div style={{...TriangleStyles}}></motion.div>   
                </motion.div>
            )

        case 'SE':
                return (
                    <motion.div 
                    
                        transition={{ duration: 1.2 }}
                        style={{...containerStyles,transform:'rotateZ(45deg)'}}
                    >
                        <motion.div style={{...lineStyles,width: props.lineLength?props.lineLength:'15px'}}></motion.div>
                        <motion.div style={{...TriangleStyles}}></motion.div>   
                    </motion.div>
                )

        case 'S':
                return (
                    <motion.div 
                    
                        transition={{ duration: 1.2 }}
                        style={{...containerStyles,transform:'rotateZ(90deg)'}}
                    >
                        <motion.div style={{...lineStyles,width: props.lineLength?props.lineLength:'15px'}}></motion.div>
                        <motion.div style={{...TriangleStyles}}></motion.div>   
                    </motion.div>
                )


        case 'SW':
                return (
                    <motion.div
                        transition={{ duration: 1.2 }}
                        style={{...containerStyles,transform:'rotateZ(135deg)'}}
                    >
                        <motion.div style={{...lineStyles,width: props.lineLength?props.lineLength:'15px'}}></motion.div>
                        <motion.div style={{...TriangleStyles}}></motion.div>   
                    </motion.div>
                )

        case 'W':
                return (
                    <motion.div 
                    
                        transition={{ duration: 1.2 }}
                        style={{...containerStyles,transform:'rotateZ(180deg)'}}
                    >
                        <motion.div style={{...lineStyles,width: props.lineLength?props.lineLength:'15px'}}></motion.div>
                        <motion.div style={{...TriangleStyles}}></motion.div>   
                    </motion.div>
                )

        case 'NW':
                return (
                    <motion.div 
                    
                        transition={{ duration: 1.2 }}
                        style={{...containerStyles,transform:'rotateZ(225deg)'}}
                    >
                        <motion.div style={{...lineStyles,width: props.lineLength?props.lineLength:'15px'}}></motion.div>
                        <motion.div style={{...TriangleStyles}}></motion.div>   
                    </motion.div>
                )

        case 'N':
                return (
                    <motion.div 
                    
                        transition={{ duration: 1.2 }}
                        style={{...containerStyles,transform:'rotateZ(270deg)'}}
                    >
                        <motion.div style={{...lineStyles,width: props.lineLength?props.lineLength:'15px'}}></motion.div>
                        <motion.div style={{...TriangleStyles}}></motion.div>   
                    </motion.div>
                )

        case 'NE':
                return (
                    <motion.div 
                    
                        transition={{ duration: 1.2 }}
                        style={{...containerStyles,transform:'rotateZ(315deg)'}}
                    >
                        <motion.div style={{...lineStyles,width: props.lineLength?props.lineLength:'15px'}}></motion.div>
                        <motion.div style={{...TriangleStyles}}></motion.div>   
                    </motion.div>
                )

        default:
            return null;
    }

    
}

const containerStyles={
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}

const TriangleStyles={
    width: 0,
    height: 0,
    borderTop: "10px solid transparent",
    borderLeft: "10px solid #fff",
    borderBottom: "10px solid transparent",
}

const lineStyles={
    width: '15px',
    height: '2px',
    backgroundColor: "#fff",
}




export default Link;