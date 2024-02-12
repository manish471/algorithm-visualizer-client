import React, { Component } from 'react';
import{
    container,nav,header,title,title__info,title__logo,title__name,navItems,block,block1,block2,panel,navItem,link, navProfilePhoto
} from '../css/Header.css';
import Panel1 from './Panel1';
import Panel2 from './Panel2';
import Panel3 from './Panel3';
import Panel4 from './Panel4';
import LoginPanel from '../LoginPanel';

import { motion } from 'framer-motion';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getCurrentUser,logoutUser} from '../../../Redux Store/Redux Actions/user_action';
import {getTheme,setTheme,getCodeLanguage,setCodeLanguage} from '../../../Redux Store/Redux Actions/layout_action';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state={
          isAuthenticated:false,
          user:null,
        }
    }

    componentDidMount(){

        this.props.getCurrentUser();
        if(window.localStorage.getItem('theme') === null){
            this.props.setTheme('dark');
        }else{
            this.props.getTheme();
        }

        if(window.localStorage.getItem('lang') === null){
            this.props.setCodeLanguage('Javascript');
        }else{
            this.props.getCodeLanguage();
        }
    }

    logout=()=>{

        this.props.logoutUser();
        localStorage.clear();
    }

    render() {
        return (
            <div style={{...container}}>
                <div style={{...nav}}>
                    <div style={{...header}}>
                        <div style={{...title}}>
                            <span style={{...title__logo}}>AV</span>
                            <span style={{...title__name}}>Algorithm-Visualizer</span>
                        </div>
                        <div style={{...title__info}}>Let your code visualized</div>
                    </div>
                    <div style={{...navItems}}>
                        <motion.span 
                            whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.5 },
                            }}
                            whileTap={{ scale: 0.9 }}
                            style={{...navItem}}
                        >
                            <Link style={{...link}} to='/visualizer'>Visualizer</Link>
                        </motion.span>
                        <motion.span 
                            whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.5 },
                            }}
                            whileTap={{ scale: 0.9 }}
                            style={{...navItem}}
                        >
                            <Link style={{...link}} to='/algorithms'>Algorithms</Link>
                        </motion.span>

                        {!this.props.data.isAuthenticated ?
                            <LoginPanel/>
                            :
                            <motion.span 
                            whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.5 },
                            }}
                            whileTap={{ scale: 0.9 }}
                            style={{...navItem,width:'20vw'}}
                            onClick={this.logout}
                            >
                                <img alt='.' style={{...navProfilePhoto}} src={this.props.data.user.userPhoto}/>
                                <span>{this.props.data.user.name}</span>
                            </motion.span>
                    
                        }
                        
                    </div>
                </div>
                <div style={{...block}}>
                    <div style={{...block1,fontFamily:'monospace',fontStyle:'italic'}}>
                        &bull;&nbsp;The ultimate resource to learn Data structures and Algorithms using visualization of your own code.
                        <br/><br/>&bull;&nbsp;Write...Compile...Visualize...Debug...Learn!!!
                        <br/><br/>&bull;&nbsp;Everything you need, in one streamlined platform.
                    </div>
                    <div style={{...block2}}>

                        <div style={{...panel}}>  
                            <Panel1/> <Panel2/>    
                        </div>
                        
                        <div style={{...panel,transform: 'rotateY(15deg)'}}> 
                            <Panel3/> <Panel4/> 
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data:state.user_reducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCurrentUser,logoutUser,
        getTheme,setTheme,
        getCodeLanguage,setCodeLanguage
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
