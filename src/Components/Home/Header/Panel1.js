import React from 'react';
import { motion } from 'framer-motion';
import{
    panel__item,panel__item_nav
} from '../css/Header.css';


export default function Panel1() {
    return (
        <motion.div
            animate={{ 
                y: [0,-10,10,0],
            }}
            transition={{ ease: "linear", duration: 3, loop: Infinity }}
            
            style={{
                ...panel__item
            }}
        >
            <div style={{width:'100%',height:'30px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                Code Editor
            </div>
            <div style={{...panel__item_nav}}>
                {
                [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((item,index)=>{
                    return <span key={index} style={{width:`${item+20}%`,borderRadius:'10px',height:'10px',backgroundColor:'rgb(255,255,255,0.3)',margin:5}}></span>
                })
                }
            </div>
        </motion.div>
    )
}
