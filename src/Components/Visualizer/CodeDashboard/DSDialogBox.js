import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { motion } from 'framer-motion';
import Editor1 from "@monaco-editor/react";
import Editor2 from "@monaco-editor/react";
import {Button, CircularProgress} from '@material-ui/core';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setDSInfo} from '../../../Redux Store/Redux Actions/code_action';

const styles = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor:'#15314b'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




class DSDialogBox extends Component {

    constructor(props) {
        super(props);
        this.state={
            open : false,
            code:this.props.item.node.code,
            endLineForEditor1:this.props.item.node.endLineForEditor,
            editableLineStart1:this.props.item.node.editableLineStart,
            code_struct:this.props.item.structure.code,
            endLineForEditor2:this.props.item.structure.endLineForEditor,
            editableLineStart2:this.props.item.structure.editableLineStart,
        }
        this.valueGetter1 = React.createRef();
        this.valueGetter2 = React.createRef();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            open : false,
            code:nextProps.item.node.code,
            endLineForEditor1:nextProps.item.node.endLineForEditor,
            editableLineStart1:nextProps.item.node.editableLineStart,
            code_struct:nextProps.item.structure.code,
            endLineForEditor2:nextProps.item.structure.endLineForEditor,
            editableLineStart2:nextProps.item.structure.editableLineStart, 
        })
    }
    
    handleClickOpen = () => {
        this.setState({open:true});
    };
    
    handleClose = () => {
        this.setState({open:false});
    };

    handleEditorDidMountEditor1=(editor,model)=> {
        this.setState({isEditorReady:true});
        console.log(model);
        
        model.onKeyDown(e=>{
            if(e.keyCode === 3){
                this.setState({endLineForEditor1:this.state.endLineForEditor1+1});
            }


            if(e.keyCode === 1 && model.getPosition().lineNumber === this.state.editableLineStart1 && model.getPosition().column === 1){
                if(this.state.endLineForEditor1 - 1 === this.state.editableLineStart1){
                    this.setState({code:'',})
                    setTimeout(() => {
                    this.setState({code:this.props.item.node.code})

                    }, 0);
                }else{
                    this.setState({endLineForEditor1:this.state.endLineForEditor1-1}); 
                }
            }else if(e.keyCode === 1 && model.getPosition().column === 1){
                this.setState({endLineForEditor1:this.state.endLineForEditor1-1});
            }
                
        })

    
        model.onDidChangeCursorPosition((e)=> {
            
            if ((e.position.lineNumber <= this.state.editableLineStart1-1) || (e.position.lineNumber >= this.state.endLineForEditor1)) {
                model.setPosition({
                    lineNumber:this.state.editableLineStart1,
                    column: 5
                });
            }
        });


        this.valueGetter1.current = editor;
        
    }

    handleEditorDidMountEditor2=(editor,model)=> {
        this.setState({isEditorReady:true});
        console.log(model);
        
        model.onKeyDown(e=>{
            if(e.keyCode === 3){
                this.setState({endLineForEditor2:this.state.endLineForEditor2+1});
            }


            if(e.keyCode === 1 && model.getPosition().lineNumber === this.state.editableLineStart2 && model.getPosition().column === 1){
                if(this.state.endLineForEditor2 - 1 === this.state.editableLineStart2){
                    this.setState({code_struct:'',})
                    setTimeout(() => {
                    this.setState({code_struct:this.props.item.structure.code})

                    }, 0);
                }else{
                    this.setState({endLineForEditor2:this.state.endLineForEditor2-1}); 
                }
            }else if(e.keyCode === 1 && model.getPosition().column === 1){
                this.setState({endLineForEditor2:this.state.endLineForEditor2-1});
            }
                
        })

    
        model.onDidChangeCursorPosition((e)=> {
            
            if ((e.position.lineNumber <= this.state.editableLineStart2-1) || (e.position.lineNumber >= this.state.endLineForEditor2)) {
                model.setPosition({
                    lineNumber:this.state.editableLineStart2,
                    column: 5
                });
            }
        });


        this.valueGetter2.current = editor;
        
    }

    addDataStructure=()=>{
        let code = '//========'+this.props.item.title+'========\n\n'+this.valueGetter1.current() + '\n\n' + this.valueGetter2.current() + '\n\n//==========================\n\n';

        if(this.props.data_layout.codeLanguage === "Python"){
            code = '##========'+this.props.item.title+'========\n\n'+this.valueGetter1.current() + '\n\n' + this.valueGetter2.current() + '\n\n##==========================\n\n';
        }
        this.props.setDSInfo(code,this.props.item.title,this.props.data.currentCodeData,this.props.data_layout.codeLanguage);
        this.setState({open:false});
    }

    removeDataStructure=()=>{
        this.props.setDSInfo('',this.props.item.title,this.props.data.currentCodeData,this.props.data_layout.codeLanguage);
        this.setState({open:false});
    }

    render() {
        const { classes } = this.props;
        const {open} = this.state;
        return (
            <div>
                <motion.div 
                    initial={{width:'100px',margin:'10px',cursor:'pointer',height:'20px',backgroundColor:'#78909C',color:'#fff',padding:'30px',borderRadius:'20px'}}
                    style={{display:'flex',justifyContent:'center',alignItems:'center'}}
                    whileHover={{backgroundColor:'#3d5afe'}}
                    onClick={this.handleClickOpen}
                >
                    {this.props.item.title}
                </motion.div>
                <Dialog fullScreen open={open} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {this.props.item.title}
                        </Typography>
                        <Button style={{width:'100px'}}  autoFocus color="inherit" onClick={this.addDataStructure}>
                            Save
                        </Button>
                        <Button style={{width:'100px'}} color="inherit" onClick={this.removeDataStructure}>
                            Remove
                        </Button>
                    </Toolbar>
                    </AppBar>
                    <List style={{backgroundColor:'#001528',color:'#fff',height:'100%'}}>
                    <ListItem button>
                        <ListItemText primary={`${this.props.item.title} Node Structure`}/>
                    </ListItem>
                        <div style={{marginLeft:'15px'}}>
                            <Editor1
                                height="40vh"
                                theme="my-theme"
                                line={2}
                                loading={<CircularProgress/>}
                                options={{
                                    fontSize: 18,
                                    wordWrap: "on",
                                    readOnly:this.props.item.node.readOnly?true:false
                                }}
                                language={this.props.data_layout.codeLanguage && this.props.data_layout.codeLanguage.toLowerCase()}
                                value={this.state.code}
                                editorDidMount={this.handleEditorDidMountEditor1}
                            />
                        </div>
                    <Divider style={{color:'#02203c',height:'10px'}}/>
                    <ListItem button>
                        <ListItemText primary={`${this.props.item.title} Structure`} />
                    </ListItem>
                    <div style={{marginLeft:'15px'}}>
                            <Editor2
                                height="30vh"
                                theme="my-theme"
                                line={2}
                                loading={<CircularProgress/>}
                                options={{
                                    fontSize: 18,
                                    wordWrap: "on",
                                }}
                                language={this.props.data_layout.codeLanguage && this.props.data_layout.codeLanguage.toLowerCase()}
                                value={this.state.code_struct}
                                editorDidMount={this.handleEditorDidMountEditor2}
                            />
                        </div>
                    </List>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.code_reducer,
        data_layout:state.layout_reducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setDSInfo,
    },dispatch);
}

export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(DSDialogBox));