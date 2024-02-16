import React, { Component } from 'react';
import Header from './Header';
import { body, loader } from './css/index.css'
import { motion } from 'framer-motion';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveMode, toggleLoader, setNodeShape, toggleCodeModule, toggleCodeLangModule, setTheme, getTheme, setCodeLanguage, getCodeLanguage } from '../../Redux Store/Redux Actions/layout_action';
import { addNewCode, updateCurrentCode, deleteCode, getCodeList, getCurrentCode } from '../../Redux Store/Redux Actions/code_action';
import CodeDashboard from './CodeDashboard';
import VisualizerDashboard from './VisualizerDashboard';

import { Backdrop, Button, CircularProgress, Paper, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Add, Cancel, Delete, Edit } from '@material-ui/icons';

import js_logo from '../../Icons/js_logo.png'
import py_logo from '../../Icons/py_logo.png'

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        padding: '3px',
        color: '#fff',
        '& label': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: '#3f51b5',
        },
        '& .MuiOutlinedInput-root': {

            '& fieldset': {
                borderColor: '#3f51b5',
            },
            '&:hover fieldset': {
                borderColor: '#3f51b5',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#3f51b5',
            },
        }
    },
    input: {
        color: '#fff',
    },
});




class Visualizer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            codeTitle: "",
            deletedKey: '',
            deleteLoader: false
        }
    }

    componentDidMount() {
        this.props.getTheme();
        this.props.getCodeLanguage();
    }

    setMode = (mode) => {
        this.props.toggleLoader(true);
        this.props.setActiveMode(mode);
        setTimeout(() => {
            this.props.toggleLoader(false);
        }, 1000);
    }

    handleChangeOnTitle = (event) => {
        this.setState({ codeTitle: event.target.value });
    }

    addNewCode = () => {
        if (this.state.codeTitle) {
            this.setState({ deleteLoader: true });
            this.props.addNewCode(this.state.codeTitle, this.props.data.codeLanguage);
            this.setState({ codeTitle: '' });
            setTimeout(() => {
                this.setState({ deleteLoader: false })
            }, 1000);
        }
    }

    updateCurrentCode = (event, _id) => {
        this.props.updateCurrentCode(_id, this.props.data.codeLanguage);
        this.props.toggleCodeModule(false)
    }

    deleteSelectedCode = (event, code_id) => {
        this.setState({ deletedKey: code_id, deleteLoader: true });
        setTimeout(() => {
            this.props.deleteCode(code_id, this.props.data_code.codeList, this.props.data.codeLanguage);
            this.setState({ deleteLoader: false });
        }, 1000);
    }

    toggleCodeModule(val) {
        this.props.getCodeList(this.props.data.codeLanguage);
        this.props.toggleCodeModule(val);
    }

    setCodeLanguage = (lang) => {
        this.props.setCodeLanguage(lang);
        this.props.getCurrentCode(lang)
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ ...body, overflow: 'auto' }} className={this.props.data.scroll__class}>
                <Header
                    mode={this.props.data.activeMode}
                    isBar={this.props.data.isBar}
                    setCodelayout={(mode) => this.setMode(mode)}
                    setVislayout={(mode) => this.setMode(mode)}
                    isCodeReady={this.props.data_code.code.length > 0}
                    setNodeShape={(val) => this.props.setNodeShape(val)}
                    toggleCodeModule={(val) => this.toggleCodeModule(val)}
                    toggleCodeLangModule={(val) => this.props.toggleCodeLangModule(val)}
                    theme={this.props.data.theme}
                    setTheme={(theme) => this.props.setTheme(theme)}
                    lang={this.props.data.codeLanguage}
                />
                {this.props.data.activeMode === 'visualize' ?
                    this.props.data.isLoading ? <div style={{ ...loader }}><CircularProgress /></div> : <VisualizerDashboard />
                    :
                    this.props.data.isLoading ? <div style={{ ...loader }}><CircularProgress /></div> : <CodeDashboard />
                }

                {/* ============================== CODES LIST MODULE =========================================== */}
                <Backdrop
                    open={this.props.data.isCodeModuleVisible}
                    className={classes.backdrop}
                >
                    <Paper style={{ width: '400px', height: '450px', backgroundColor: '#001528', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ width: '100%', height: '50px', color: '#fff', fontWeight: 'bold', fontSize: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ marginLeft: '10px' }}>Codes</span>
                            <motion.span initial={{ color: '#fff' }} whileHover={{ color: '#C62828' }}>
                                <Cancel onClick={() => this.props.toggleCodeModule(false)} style={{ fontSize: '30px', marginRight: '10px', cursor: 'pointer' }} />
                            </motion.span>
                        </div>
                        <div className={this.props.data.scroll__class} style={{ width: '100%', height: '400px', overflowY: 'scroll', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                            {
                                !this.state.deleteLoader ? this.props.data_code.codeList.map(item => {
                                    return (
                                        <motion.div initial={{ opacity: 0, y: 100, x: 0 }} animate={{ opacity: 1, y: 0, x: this.state.deletedKey === item._id ? 800 : 0 }} transition={{ duration: 1 }} whileHover={{ backgroundColor: 'rgba(38, 198, 218,0.3)' }} key={item._id} style={{ backgroundColor: 'rgba(21,49,75,0.3)', border: item._id === this.props.data_code.currentCodeData._id ? 'solid 2px #66BB6A' : "", cursor: 'pointer', color: '#fff', width: '90%', minHeight: '200px', margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                                            <div onClick={(event) => this.updateCurrentCode(event, item._id)} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', fontFamily: 'monospace', padding: '3px', color: '#eee', opacity: '0.3', width: '100%', minHeight: '150px', backgroundColor: 'rgba(120, 144, 156,0.3)', textAlign: 'left' }}>
                                                {item.code.substr(0, 500)}
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', minHeight: '50px' }}>
                                                <span style={{ flexGrow: 1, marginLeft: '10px' }}>{item.title}</span>
                                                {!item.defaultCode && <motion.span onClick={(event) => this.deleteSelectedCode(event, item._id)} initial={{ color: '#fff', fontSize: '30px' }} whileHover={{ color: '#C62828' }}><Delete /></motion.span>}
                                            </div>
                                        </motion.div>
                                    )
                                }) : <CircularProgress />
                            }
                            {
                                !this.state.deleteLoader ?
                                    (
                                        <div style={{ backgroundColor: 'rgba(21,49,75,0.3)', border: '1px dashed #3f51b5', color: '#fff', width: '90%', minHeight: '220px', margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace', padding: '3px', color: '#fff', opacity: '0.3', width: '100%', minHeight: '150px', backgroundColor: 'rgba(120, 144, 156,0.3)' }}>
                                                <Add style={{ color: '#eee', fontSize: '50px' }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '70px' }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Title"
                                                    variant="outlined"
                                                    className={classes.root}
                                                    value={this.state.codeTitle}
                                                    onChange={this.handleChangeOnTitle}
                                                    InputProps={{
                                                        classes: { input: classes.input },

                                                    }}
                                                />
                                                <Button onClick={this.addNewCode} variant="contained" color="primary">
                                                    ADD
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                    : null
                            }


                        </div>
                    </Paper>
                </Backdrop>

                {/* ========================================================================================= */}

                {/* ============================== CODE LANGUAGE MODULE =========================================== */}

                <Backdrop
                    open={this.props.data.isCodeLangModuleVisible}
                    className={classes.backdrop}
                >
                    <Paper style={{ width: '400px', height: '300px', backgroundColor: '#001528', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ width: '100%', height: '50px', marginTop: '10px', color: '#fff', fontWeight: 'bold', fontSize: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ marginLeft: '10px' }}>Languages</span>
                            <motion.span initial={{ color: '#fff' }} whileHover={{ color: '#C62828' }}>
                                <Cancel onClick={() => this.props.toggleCodeLangModule(false)} style={{ fontSize: '30px', marginRight: '10px', cursor: 'pointer' }} />
                            </motion.span>
                        </div>
                        <div className={this.props.data.scroll__class} style={{ width: '100%', height: '400px', overflowY: 'scroll', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                            <motion.div onClick={() => this.setCodeLanguage('Javascript')} animate={{ backgroundColor: this.props.data.codeLanguage === 'Javascript' ? '#3f51b5' : 'rgba(21,49,75,0.3)' }} whileHover={{ border: 'solid 2px #66BB6A', cursor: 'pointer' }} style={{ width: '90%', borderRadius: '20px', marginTop: '20px', minHeight: '100px', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img alt='lang' src={js_logo} style={{ width: '50px', height: '50px' }} />
                                <span style={{ marginLeft: '15px' }}>
                                    Javascript
                                </span>
                            </motion.div>
                            <motion.div onClick={() => this.setCodeLanguage('Python')} animate={{ backgroundColor: this.props.data.codeLanguage === 'Python' ? '#3f51b5' : 'rgba(21,49,75,0.3)' }} whileHover={{ border: 'solid 2px #66BB6A', cursor: 'pointer' }} style={{ width: '90%', borderRadius: '20px', minHeight: '100px', marginTop: '20px', color: '#fff', backgroundColor: 'rgba(21,49,75,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img alt='lang' src={py_logo} style={{ width: '50px', height: '50px' }} />
                                <span style={{ marginLeft: '15px' }}>
                                    Python
                                </span>
                            </motion.div>
                        </div>
                    </Paper>
                </Backdrop>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.layout_reducer,
        data_code: state.code_reducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setActiveMode,
        toggleLoader,
        setNodeShape,
        toggleCodeModule,
        toggleCodeLangModule,
        addNewCode,
        updateCurrentCode,
        deleteCode,
        getCodeList,
        getCurrentCode,
        setTheme,
        getTheme,
        setCodeLanguage,
        getCodeLanguage
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Visualizer));