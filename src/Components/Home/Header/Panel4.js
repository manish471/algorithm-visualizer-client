import React from 'react';
import { motion } from 'framer-motion';
import{
    panel__item,panel__item_nav
} from '../css/Header.css';

import {BugReportRounded, DoneAllRounded} from '@material-ui/icons';

export default function Panel4() {
    return (
        <motion.div 
        animate={{  
            y: [0,-10,10,0],
        }}
        transition={{ ease: "linear", duration: 3, loop: Infinity }}
        style={{
            ...panel__item
        }}>
            <div style={{width:'100%',height:'30px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                Debugger
            </div>
            <div style={{...panel__item_nav}}>
                <span style={{display:'flex',justifyContent:'center',alignItems:'center',
                    width:`100%`,borderRadius:'20px',height:'30px',opacity:0.7,
                    backgroundColor:`#00C853`,margin:5,color:'#fff'}}>
                     <DoneAllRounded/>   
                </span>
                <span style={{display:'flex',justifyContent:'center',alignItems:'center',
                    width:`100%`,borderRadius:'20px',height:'30px',opacity:0.7,
                    backgroundColor:`#D50000`,margin:5,color:'#fff'}}>
                      <BugReportRounded/>  
                </span>
                <span style={{display:'flex',justifyContent:'center',alignItems:'center',
                    width:`100%`,borderRadius:'20px',height:'30px',opacity:0.7,
                    backgroundColor:`#00C853`,margin:5,color:'#fff'}}>
                      <DoneAllRounded/>  
                </span>
                <span style={{display:'flex',justifyContent:'center',alignItems:'center',
                    width:`100%`,borderRadius:'20px',height:'30px',opacity:0.7,
                    backgroundColor:`#D50000`,margin:5,color:'#fff'}}>
                      <BugReportRounded/>  
                </span>
            </div>
        </motion.div>
    )
}
