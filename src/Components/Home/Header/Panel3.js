import React from 'react';
import { motion } from 'framer-motion';
import{
    panel__item,panel__item_nav
} from '../css/Header.css';


export default function Panel3() {
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
                Algorithms
            </div>
            <div style={{...panel__item_nav}}>
                {
                [{color:'#5a395a',name:'Sorting'},
                {color:'#be8a28',name:'Searching'},
                {color:'#5e5efb',name:'Hashing'},
                {color:'#48aca2',name:'Graphs'},
                {color:'#BA68C8',name:'Trees'},
                {color:'#FF5722',name:'Heap'}].map(item=>{
                    return (
                    <span key={item.name} style={{display:'flex',justifyContent:'center',alignItems:'center',
                    width:`40%`,borderRadius:'10px',height:'40px',
                    backgroundColor:`${item.color}`,margin:5,color:'#fff'}}>
                        {item.name}
                    </span>
                    )
                })
                }
            </div>
        </motion.div>
    )
}
