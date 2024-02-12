import { motion } from 'framer-motion';
import React, { Component } from 'react';
import {visLayout__section_tracer_Data} from '../css/visualizerDashboard.css';


class MetaDataTracer extends Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    handleObjectEntering=(item)=>{
        let ele = document.getElementsByClassName(item)[0]
        if(ele){
            ele.style.backgroundColor = 'rgba(24, 255, 255,0.3)';
        }
        
    }
      
    handleObjectLeaving=(item)=>{
        let ele = document.getElementsByClassName(item)[0]
        if(ele){
            ele.style.backgroundColor = '';
        }
    }
    render() {
        const {metaData,step,timelineData} = this.props;
        return(
            <div style={{...visLayout__section_tracer_Data}} className={this.props.scroll__class}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:"column",height:'200px'}}>
                    <div style={{fontSize:'18px',fontFamily:'monospace',marginTop:'10px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        {metaData && `${step}/${metaData?.steps.length}\t:\t${metaData?.steps[step].type}`}
                    </div>
                    <div style={{fontSize:'18px',border:'5px solid #E91E63',padding:'5px',fontFamily:'monospace',marginTop:'10px',display:'flex',justifyContent:'center',alignItems:'center',flexWrap:'wrap'}}>
                        <p>
                            {metaData && metaData.steps[step].name && `${metaData?.code.substr(metaData?.steps[step].name[0],metaData?.steps[step].name[1]-metaData?.steps[step].name[0]) }`}
                        </p>
                    </div>
                    <div style={{width:'2px',height:'20px',backgroundColor:'#fff'}}></div>
                    <div style={{fontSize:'18px',border:'solid 5px #EF5350',padding:'5px',fontFamily:'monospace',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        {metaData && metaData.steps[step].value?.toString() && `${metaData.steps[step].value.toString().includes("_")? metaData.types[metaData.steps[step].value]:metaData.steps[step].value}`}
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:"column",marginTop:'10px'}}>
                        {
                            metaData && timelineData[step]?.AllObjects.map((item,index)=>{
                                
                                return (
                                    <motion.div
                                        whileHover={{backgroundColor:'rgba(24, 255, 255,0.3)'}} 
                                        onMouseEnter={()=>this.handleObjectEntering(item)} 
                                        onMouseLeave={()=>this.handleObjectLeaving(item)} 
                                        style={{border:'5px solid #80CBC4',padding:'20px',cursor:'pointer',margin:'5px',display:'flex',justifyContent:'center',alignItems:'center'}}
                                    >
                                        {metaData.types[item]}
                                    </motion.div>
                                )
                                
                            })
                        }
                </div>
            </div>
        )
    }
}


export default MetaDataTracer;