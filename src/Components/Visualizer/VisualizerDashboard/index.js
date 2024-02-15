import React, { Component } from 'react';
import {visLayout, verticalSeparator,visLayout__section_tracer_DataAndStack,
horizontalSeparator, visLayout__section_screen, visLayout__section_tracer,visLayout__section_tracer_code,
}
from '../css/visualizerDashboard.css';

import Screen from './Screen';
import StackTrace from './StackTrace';
import CodeTracer from './CodeTracer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getVisualizerMetaData} from '../../../Redux Store/Redux Actions/visualizer_action';
import MetaDataTracer from './MetaDataTracer';



class VisualizerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    componentDidMount(){
        this.props.getVisualizerMetaData(this.props.data_layout.codeLanguage);
    }


    render() {
        return (
            <div style={{...visLayout}}>
                <div style={{...visLayout__section_tracer}}>

                    <div style={{...visLayout__section_tracer_code}} className={this.props.data_layout.scroll__class}>
                        <CodeTracer metaData = {this.props.data_visualizer.metaData} step={this.props.data_visualizer.step}
                         code={this.props.data.code}/>
                    </div>


                    <div style={{...visLayout__section_tracer_DataAndStack}}>

                        <MetaDataTracer metaData = {JSON.parse(this.props.data_visualizer.metaData)} timelineData={this.props.data_visualizer.timelineData} step={this.props.data_visualizer.step} scroll__class={this.props.data_layout.scroll__class}/>

                        <div style={{...verticalSeparator}}/>

                        
                        <StackTrace scroll__class={this.props.data_layout.scroll__class} stackData = {this.props.data_visualizer.stackData} speed = {this.props.data_visualizer.speed} step={this.props.data_visualizer.step}/>

                    </div>

                </div>

                {/* <div style={{...verticalSeparator}}/> */}

                <div style={{...visLayout__section_screen,backgroundColor:this.props.data_layout.theme === 'dark'?'#001528':'#fff'}}>
                    <Screen metaData = {this.props.data_visualizer.metaData}/>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.code_reducer,
        data_visualizer:state.visualizer_reducer,
        data_layout:state.layout_reducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getVisualizerMetaData,
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(VisualizerDashboard);