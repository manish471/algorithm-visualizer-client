import React, { Component } from 'react';
import { WbSunny,List, EmojiObjects,Grain,Code, ViewWeek, FiberManualRecord, Brightness2 } from '@material-ui/icons';
import {nav__body,nav__title,nav__icons,link} from '../css/header.css';
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';
import js_logo from '../../../Icons/js_logo.png'
import py_logo from '../../../Icons/py_logo.png'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeMode:this.props.mode,
            isBar:false,
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            this.setState({activeMode:nextProps.mode,isBar:nextProps.isBar});
        }
    }

    handleShape=(e,val)=>{
        this.setState({isBar:val})
        this.props.setNodeShape(val)
    }

    setTheme=()=>{
        if(this.props.theme === 'dark'){
            this.props.setTheme('light');
        }else{
            this.props.setTheme('dark');
        }
    }

    render() {
        return (
            <div  style={{...nav__body}}>
                <div  style={{...nav__title}}><Link style={{...link}} to="/">Algorithms-Visualizer</Link></div>
                <motion.div onClick={this.state.activeMode === 'visualize'?null:()=>this.props.toggleCodeModule(true)} whileHover={{backgroundColor:'#4CAF50',transition:{duration:0.6}}} style={{...nav__icons}} animate={{backgroundColor:this.state.activeMode === 'visualize'?'grey':'#15314b'}}><List style={{fontSize:30}}/></motion.div>
                <motion.div onClick={this.setTheme} whileHover={{backgroundColor:'#4CAF50',transition:{duration:0.6}}} style={{...nav__icons}}>{this.props.theme === 'dark'? <WbSunny/>: <Brightness2/>}</motion.div>
                <motion.div whileHover={{backgroundColor:'#4CAF50',transition:{duration:0.6}}} style={{...nav__icons}}><EmojiObjects style={{fontSize:30}}/></motion.div>
                <motion.div onClick={this.state.activeMode === 'visualize'?null:()=>this.props.toggleCodeLangModule(true)} whileHover={{backgroundColor:'#4CAF50',transition:{duration:0.6}}} style={{...nav__icons}} animate={{backgroundColor:this.state.activeMode === 'visualize'?'grey':'#15314b'}}>
                    <img alt='lang' src={this.props.lang === 'Javascript'?js_logo:py_logo} style={{width:'20px',height:'20px'}}/>
                    <span style={{marginLeft:'10px'}}>
                        {this.props.lang}  
                    </span>
                </motion.div>
                <motion.div
                 whileHover={{backgroundColor:'#4CAF50',transition:{duration:0.6}}}
                  onClick={()=>this.props.setCodelayout('code')}
                  animate={{backgroundColor:this.state.activeMode === 'code'?'#4CAF50':'#15314b'}}
                  style={{...nav__icons}}
                 >
                    <Code />
                </motion.div>
                <motion.div
                 whileHover={{backgroundColor:'#4CAF50',transition:{duration:0.6}}}
                 animate={{backgroundColor:this.state.activeMode === 'visualize'?'#4CAF50':this.props.isCodeReady?'#15314b':'grey'}}
                 onClick={this.props.isCodeReady?()=>this.props.setVislayout('visualize'):null}
                  style={{...nav__icons}}
                 >
                    <Grain />
                </motion.div>
                <motion.div whileHover={{backgroundColor:'#4CAF50',transition:{duration:0.6}}} style={{...nav__icons}}>
                    <FiberManualRecord onClick={(event)=>this.handleShape(event,false)} style={{fontSize:30,color:this.state.isBar?'#fff':'#00B0FF'}}/>
                    <ViewWeek onClick={(event)=>this.handleShape(event,true)} style={{fontSize:30,color:!this.state.isBar?'#fff':'#00B0FF'}}/>
                </motion.div>
            </div>
        )
    }
}

export default Header;