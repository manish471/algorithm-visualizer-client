import React, { Component } from 'react'

import {codeLayout,
codeLayout__section_console,verticalSeparator, nav,nav__text,nav_section1, horizontalSeparator, codeLayout__section_datastructure
}
from '../css/codeDashboard.css';
import CodeEditor from './CodeEditor';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {executeCode,toggleLoader,getCurrentCode,setCurrentCode,autoSaveCode,startAutoSaveLoader,getCodeList} from '../../../Redux Store/Redux Actions/code_action';
import {getCurrentUser} from '../../../Redux Store/Redux Actions/user_action';


import ConsoleOuput from './ConsoleOuput';
import DatastructurePanel from './DatastructurePanel';
import { Info } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import Notification from '../../../Custom/Notification';


class CodeDashboard extends Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    componentDidMount(){
        if(!this.props.user_data.user){
            this.props.getCurrentUser();
        }
        setTimeout(() => {
            this.props.getCurrentCode(this.props.data_layout.codeLanguage);
        }, 500);
        
    }


    executeCode=(code,codeString)=>{
        this.props.toggleLoader(true);
        this.props.executeCode(code,codeString,this.props.data_layout.codeLanguage);
    }

    autoSaveCode=(code)=>{
        this.props.startAutoSaveLoader();
        setTimeout(() => {
            this.props.autoSaveCode(code,this.props.data_layout.codeLanguage);
        }, 2000);
        
    }

    setCurrentCode=(val)=>{
        this.props.setCurrentCode(this.props.data.currentCodeData,val);
    }

    render() {
        console.log(this.props.data);
        return (
            <div style={{...codeLayout}}>
                
                <CodeEditor 
                    defaultCode = {this.props.data.currentCodeData && this.props.data.currentCodeData.code}
                    dsStringValue = {this.props.data.currentCodeData && this.props.data.currentCodeData.dsStringValue}
                    executeCode={(code,codeString)=>this.executeCode(code,codeString)}
                    setCurrentCode={(val)=>this.setCurrentCode(val)}
                    autoSaveCode={(code)=>this.autoSaveCode(code)}
                    autoSaveLoader={this.props.data.autoSaveLoader}
                    theme = {this.props.data_layout.theme}
                    lang = {this.props.data_layout.codeLanguage}
                    isAuthenticated={this.props.user_data.isAuthenticated}
                />

                <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',width:'100%'}}>
                    <div style={{...codeLayout__section_console,color:'#fff',backgroundColor:'#001528'}}>
                        <div style={{...nav,backgroundColor:'#15314b'}}>
                            <div style={{...nav_section1}}>
                                <span style={{...nav__text}}>
                                    Output
                                </span>
                            </div>
                        </div>
                        <ConsoleOuput scroll__class={this.props.data_layout.scroll__class} output={this.props.data.output} toggleLoader={(val)=>this.props.toggleLoader(val)} isLoading={this.props.data.isLoading}/>
                    </div>

                    <div style={{...horizontalSeparator}}></div>

                    {/* <div style={{...codeLayout__section_datastructure,color:'#fff',backgroundColor:'#001528'}}>
                        <div style={{...nav,backgroundColor:'#15314b'}}>
                            <div style={{...nav_section1}}>
                                <span style={{...nav__text}}>
                                    Datastructures
                                    
                                </span>
                                <Tooltip title="....">
                                    <Info style={{margin:'5px',cursor:'pointer'}}/>
                                </Tooltip>
                            </div>
                        </div>
                        <DatastructurePanel scroll__class={this.props.data_layout.scroll__class} lang = {this.props.data_layout.codeLanguage} defaultCode = {this.props.data.currentCodeData && this.props.data.currentCodeData.code}/>
                    </div> */}
                </div>
                
                {
                    
                    this.props.data.error.map((msg,index)=>{
                        return <Notification msg={msg} key={index}/>
                    })
                    
                }
                
                

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.code_reducer,
        user_data:state.user_reducer,
        data_layout:state.layout_reducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        executeCode,
        toggleLoader,
        getCurrentUser,
        getCurrentCode,
        setCurrentCode,
        autoSaveCode,
        startAutoSaveLoader,
        getCodeList
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CodeDashboard);