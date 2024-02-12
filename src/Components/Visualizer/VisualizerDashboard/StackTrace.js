import React, { Component } from 'react';
import {motion} from 'framer-motion';
import {visLayout__section_tracer_Stack} from '../css/visualizerDashboard.css';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


class StackTrace extends Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    useStylesBootstrap = makeStyles((theme) => ({
        arrow: {
          color: theme.palette.common.black,
        },
        tooltip: {
          backgroundColor: theme.palette.common.black,
        },
      }));
      
    BootstrapTooltip=(props)=> {
        const classes = this.useStylesBootstrap();
    
        return <Tooltip arrow classes={classes} {...props} />;
    }

    render() {

        return(
            <div style={{...visLayout__section_tracer_Stack}} className={this.props.scroll__class}>
                {this.props.stackData.length > 0 &&
                    this.props.stackData[this.props.step].map((item,index)=>{
                        return( 
                        
                        <motion.div
                        key={index}
                        initial={{opacity:0,y:-100}}
                        animate={{opacity:1,y:0}} 
                        transition={{ duration: 1}}
                        style={{backgroundColor:'#AB47BC',cursor:'pointer',width:'92%',display:'flex',justifyContent:'center',alignItems:'center',
                        minHeight:'60px',marginBottom:'5px',color:'#fff'}}
                        >
                            <this.BootstrapTooltip style={{backgroundColor:'#fff',color:'#1da'}} title={item.value} arrow>
                                <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',}}>{item.callName}</div>
                            </this.BootstrapTooltip>
                        </motion.div>
                        )
                    })
                }
                <div  style={{backgroundColor:'rgb(0,0,0,0)',width:'92%',minHeight:'70px',marginBottom:'5px'}}/>
            </div>
        )
    }
}


export default StackTrace;