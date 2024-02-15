import React, { Component } from 'react';
import { WbSunny, List, EmojiObjects, Grain, Code, ViewWeek, FiberManualRecord, Brightness2, ContactSupport } from '@material-ui/icons';
import { nav__body, nav__title, nav__icons, link, navItem, navProfilePhoto } from '../css/header.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import js_logo from '../../../Icons/js_logo.png'
import py_logo from '../../../Icons/py_logo.png'
import LoginPanel from '../../Home/LoginPanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser, logoutUser } from '../../../Redux Store/Redux Actions/user_action';
import WavinghandIcon from '../../../Icons/waving-hand.png';
import Instructions from './Instructions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMode: this.props.mode,
            isBar: false,
            showHelpertext:true
        }
    }

    componentDidMount() {
        this.props.getCurrentUser();
        setTimeout(() => {
            this.setState({showHelpertext:false})
        }, 5000);
    }

    logout = () => {
        this.props.logoutUser();
        localStorage.clear();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({ activeMode: nextProps.mode, isBar: nextProps.isBar });
        }
    }

    handleShape = (e, val) => {
        this.setState({ isBar: val })
        this.props.setNodeShape(val)
    }

    setTheme = () => {
        if (this.props.theme === 'dark') {
            this.props.setTheme('light');
        } else {
            this.props.setTheme('dark');
        }
    }

    render() {
        return (
            <div style={{ ...nav__body }}>
                <div style={{ display: 'flex', width: '70%' }}>
                    <div style={{ ...nav__title }}><Link style={{ ...link }} to="/">Algorithms-Visualizer</Link></div>
                    <motion.div onClick={(this.state.activeMode === 'visualize' || !this.props.data.isAuthenticated) ? null : () => this.props.toggleCodeModule(true)} whileHover={{ backgroundColor: '#4CAF50', transition: { duration: 0.6 } }} style={{ ...nav__icons, backgroundColor: !this.props.data.isAuthenticated ? 'grey' : '#15314b' }} animate={{ backgroundColor: (this.state.activeMode === 'visualize' || !this.props.data.isAuthenticated) ? 'grey' : '#15314b' }}><List style={{ fontSize: 30 }} /></motion.div>
                    {/* <motion.div onClick={this.setTheme} whileHover={{ backgroundColor: '#4CAF50', transition: { duration: 0.6 } }} style={{ ...nav__icons }}>{this.props.theme === 'dark' ? <WbSunny /> : <Brightness2 />}</motion.div> */}
                    <motion.div whileHover={{ backgroundColor: '#4CAF50', transition: { duration: 0.6 } }} style={{ ...nav__icons }}><EmojiObjects style={{ fontSize: 30 }} /></motion.div>
                    <motion.div style={{ ...nav__icons }} animate={{ backgroundColor: this.state.activeMode === 'visualize' ? 'grey' : '#15314b' }}>
                        <img alt='lang' src={this.props.lang === 'Javascript' ? js_logo : py_logo} style={{ width: '20px', height: '20px' }} />
                        <span style={{ marginLeft: '10px' }}>
                            {this.props.lang}
                        </span>
                    </motion.div>
                    <motion.div
                        whileHover={{ backgroundColor: '#4CAF50', transition: { duration: 0.6 } }}
                        onClick={() => this.props.setCodelayout('code')}
                        animate={{ backgroundColor: this.state.activeMode === 'code' ? '#4CAF50' : '#15314b' }}
                        style={{ ...nav__icons }}
                    >
                        <Code />
                    </motion.div>
                    <motion.div
                        whileHover={{ backgroundColor: '#4CAF50', transition: { duration: 0.6 } }}
                        animate={{ backgroundColor: this.state.activeMode === 'visualize' ? '#4CAF50' : this.props.isCodeReady ? '#15314b' : 'grey' }}
                        onClick={this.props.isCodeReady ? () => this.props.setVislayout('visualize') : null}
                        style={{ ...nav__icons }}
                    >
                        <Grain />
                    </motion.div>
                    <motion.div whileHover={{ backgroundColor: '#4CAF50', transition: { duration: 0.6 } }} style={{ ...nav__icons }}>
                        <FiberManualRecord onClick={(event) => this.handleShape(event, false)} style={{ fontSize: 30, color: this.state.isBar ? '#fff' : '#00B0FF' }} />
                        <ViewWeek onClick={(event) => this.handleShape(event, true)} style={{ fontSize: 30, color: !this.state.isBar ? '#fff' : '#00B0FF' }} />
                    </motion.div>
                    <motion.div whileHover={{ backgroundColor: '#4CAF50', transition: { duration: 0.6 } }} style={{ ...nav__icons, backgroundColor: '#2a3eb1',position:'relative' }}>
                        <Instructions/>
                        <div class="tooltip" style={{display:this.state.showHelpertext?'flex':'none'}}>
                          <img src={WavinghandIcon} style={{width:'30px',height:'30px',marginRight:'10px'}}/>  See instructions here on how to use visualizer!!!
                        </div>
                    </motion.div>

                </div>
                <motion.div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '30%', }}>
                    {!this.props.data.isAuthenticated ?
                        <LoginPanel />
                        :
                        <motion.span
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.5 },
                            }}
                            whileTap={{ scale: 0.9 }}
                            style={{ ...navItem, width: '20vw', color: '#fff' }}
                            onClick={this.logout}
                        >
                            <img alt='.' style={{ ...navProfilePhoto }} src={this.props.data.user.userPhoto} />
                            <span>{this.props.data.user.name}</span>
                        </motion.span>

                    }
                </motion.div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.user_reducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCurrentUser, logoutUser,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);