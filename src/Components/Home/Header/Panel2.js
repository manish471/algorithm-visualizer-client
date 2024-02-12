import React from 'react';
import { motion } from 'framer-motion';
import{
    panel__item,panel__item_nav
} from '../css/Header.css';


export default function Panel2() {
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
                Visualizer
            </div>
            <div style={{...panel__item_nav}}>
                <motion.span animate={{backgroundColor:['#1da','#80DEEA','#1da']}} transition={{duration: 3,delay:1, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                <motion.span animate={{backgroundColor:['#1da','#E1BEE7','#1da']}} transition={{duration: 3,delay:2, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                <motion.span animate={{backgroundColor:['#1da','#DCEDC8','#1da']}} transition={{duration: 3,delay:3, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                <motion.span animate={{backgroundColor:['#1da','#FFF9C4','#1da']}} transition={{duration: 3,delay:4, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                <motion.span animate={{backgroundColor:['#1da','#FFCCBC','#1da']}} transition={{duration: 3,delay:5, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                <motion.span animate={{backgroundColor:['#1da','#BCAAA4','#1da']}} transition={{duration: 3,delay:5, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                <motion.span animate={{backgroundColor:['#1da','#F48FB1','#1da']}} transition={{duration: 3,delay:5, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                <div>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',}}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                            <motion.span animate={{backgroundColor:['#1da','#80DEEA','#1da']}} transition={{duration: 3,delay:1, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <span style={{transform:'rotate(135deg)',width:'15px',marginRight:5,height:'2px',backgroundColor:'#eee'}}></span>
                            <span style={{transform:'rotate(45deg)',width:'15px',marginLeft:5,height:'2px',backgroundColor:'#eee'}}></span>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',}}>
                    <motion.span animate={{backgroundColor:['#1da','#E1BEE7','#1da']}} transition={{duration: 3,delay:1, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                    <motion.span animate={{backgroundColor:['#1da','#FFF9C4','#1da']}} transition={{duration: 3,delay:1, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <motion.span animate={{backgroundColor:['#1da','#80DEEA','#1da']}} transition={{duration: 3,delay:1, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                    <span style={{width:'15px',height:'2px',backgroundColor:'#eee'}}></span>
                </div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <motion.span animate={{backgroundColor:['#1da','#BCAAA4','#1da']}} transition={{duration: 3,delay:1, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                    <span style={{width:'15px',height:'2px',backgroundColor:'#eee'}}></span>
                </div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <motion.span animate={{backgroundColor:['#1da','#F48FB1','#1da']}} transition={{duration: 3,delay:1, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                    <span style={{width:'15px',height:'2px',backgroundColor:'#eee'}}></span>
                </div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <motion.span animate={{backgroundColor:['#1da','#DCEDC8','#1da']}} transition={{duration: 3,delay:1, loop: Infinity }} style={{width:`30px`,borderRadius:'50%',height:'30px',margin:5}}></motion.span>
                </div>
                <div style={{display:'flex',flexFlow:'wrap',justifyContent:'flex-start',alignItems:'flex-start',width:'60%',height:'30px'}}>
                    {[0,0,1,0,2,1,1,1,0,0,0,2,3,0,5,1,2,2].map((item,index)=>{
                        return <span key={index} style={{width:'10%',display:'flex',justifyContent:'center',alignitems:'center',height:'15px',border:'solid 1px #1Da',fontSize:'10px'}}>{item}</span>
                    })}
                </div>
            </div>
        </motion.div>
    )
}
