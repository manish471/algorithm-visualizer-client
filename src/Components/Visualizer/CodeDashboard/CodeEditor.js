import React, { Component } from "react";
import Editor from "@monaco-editor/react";
import DSEditor from "@monaco-editor/react";
import { monaco } from '@monaco-editor/react';
import {CircularProgress} from '@material-ui/core';
import { nav, nav__icon, nav__button, nav_section1, nav_section2, nav__text,codeLayout__section_editor
  }
  from '../css/codeDashboard.css';

import { Done, Refresh } from '@material-ui/icons';


class CodeEditor extends Component {

  constructor(props) {
    super(props);
    this.state={
      isEditorReady:false,
      currentEditor:'1',
      isToggle:false,
    }
    this.valueGetter = React.createRef();
    this.valueGetter_ds = React.createRef();
  }


  updateDimensions = () => {
    this.setState({ windowSizeIsChanged:true });
  };

  handleKeyDown=(event)=>{
    if(event.ctrlKey && event.keyCode === 83){
      event.preventDefault();
      this.props.autoSaveCode(this.valueGetter.current());
    }
  }
  componentDidMount(){
    monaco
    .init()
    .then(monaco => {
      monaco.editor.defineTheme('my-theme', {
        base: 'vs-dark',
        inherit: true,
        rules: [{ background: '001528' }],
        colors: {
          'editor.background': '#001528',
          'editor.lineHighlightBorder':'#15314b'
        },
  });
    })
    .catch(error => console.error('An error occurred during initialization of Monaco: ', error));

    document.addEventListener("keydown", this.handleKeyDown, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  handleEditorDidMount=(editor,model)=> {
    this.setState({isEditorReady:true});
    console.log(model);
    

    // model.onDidChangeModelContent(e=>{

    //   // uncomment this if you want auto-save functionality
    //   // if(!this.state.isToggle && this.state.currentEditor === '1'){
    //   //   console.log('lmao')
    //   //   this.props.autoSaveCode(this.valueGetter.current());
    //   // }
      
    // })

    this.valueGetter.current = editor;
    
  }

  runCode=()=> {
    let str = this.props.dsStringValue + this.valueGetter.current();
    console.log(str);

    let code = [];
    for(let i=0;i<str.length;i++){
      if(str[i] === '\n'){
        code.push(<br key={i}/>);
      }else if(str[i] === ' '){
        code.push(<span key={i}>&nbsp;</span>)
      }else{
        code.push(str[i]);
      }
      
    }

    console.log(code);
    this.props.executeCode(code,str);

  }

 toggleEditor=(val)=>{
   if(val === '2'){
     this.props.setCurrentCode(this.valueGetter.current())
   }
    // this.props.setCurrentCode(this.valueGetter.current());
   this.setState({currentEditor:val,isToggle:true});
   setTimeout(() => {
    this.setState({isToggle:false});
   }, 1000);
 }

  render() {
    return (
      <div style={{...codeLayout__section_editor,backgroundColor:this.props.theme === 'dark'?'#001528':'#fff'}}>
        <div style={{...nav,backgroundColor:this.props.theme === 'dark'?'#15314b':'#fff'}}>

          <div style={{...nav_section1,backgroundColor:this.props.theme === 'dark'?'#15314b':'#fff'}}>
              <span onClick={()=>this.toggleEditor('1')} style={{...nav__text,cursor:'pointer',backgroundColor:this.state.currentEditor === '1'?'#001528':''}}>
                  Your Code
              </span>
              <span onClick={()=>this.toggleEditor('2')} style={{...nav__text,width:'150px',marginLeft:'10px',cursor:'pointer',backgroundColor:this.state.currentEditor === '2'?'#001528':''}}>
                  Your Datastructures
              </span>
          </div>
          <div style={{...nav_section2,backgroundColor:this.props.theme === 'dark'?'#15314b':'#fff'}}>
              {this.props.autoSaveLoader?
              <CircularProgress size={20} style={{fontWeight:'bold',color:'#3D5AFE'}}/>:
              <Done style={{fontWeight:'bold',color:'#00c853'}}/>}
              
              <div style={{...nav__icon,backgroundColor:this.props.theme === 'dark'?'#15314b':'#fff'}}><Refresh style={{fontSize:30}}/></div>
              <div onClick={this.runCode} style={{...nav__button}}><span>Run</span></div>
          </div>

        </div>
        {
          this.state.currentEditor === '1'?
          <Editor
            height="78vh"
            theme={this.props.theme === 'dark'?"my-theme":'light'}
            line={2}
            loading={<CircularProgress/>}
            options={{
                fontSize: 18,
                wordWrap: "on",
                readOnly: false
            }}
            language={this.props.lang?.toLowerCase()}
            value={this.props.defaultCode}
            editorDidMount={this.handleEditorDidMount}
          />:
          <DSEditor
            height="78vh"
            theme="my-theme"
            line={2}
            loading={<CircularProgress/>}
            options={{
                fontSize: 18,
                wordWrap: "on",
                readOnly: true
            }}
            language={this.props.lang?.toLowerCase()}
            value={this.props.dsStringValue?this.props.dsStringValue:''}
          />
        }
        
      </div>
    )
  }
}
export default CodeEditor;