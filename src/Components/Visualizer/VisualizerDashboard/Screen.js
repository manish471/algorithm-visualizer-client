import React, { Component } from 'react'
import {nav, nav__icon, vis__player, vis__speed, vis__controller
}
from '../css/visualizerDashboard.css';
import {PlayArrow, SkipPrevious, SkipNext, Pause } from '@material-ui/icons';
import SpeedController from './SpeedController';
import TimelineController from './TimelineController';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {startVisualizer,stopVisualizer,setStepValue,getTimelineData,setScrollTopOffsetValue} from '../../../Redux Store/Redux Actions/visualizer_action';

import ArrayNode from '../../../Custom/ArrayNode';
import ObjectShape from '../../../Custom/ObjectShape';
import LinkedListNode from '../../../Custom/LinkedListNode';
import TreeNode from '../../../Custom/TreeNode';
import DoublyLinkedList from '../../../Custom/DoublyLinkedListNode';
// import GraphNode from '../../../Custom/GraphNode';
import Graph1 from '../../../Custom/Graph1';

// const ArrayNodes = [
//     {id:0,val:12,x:0,y:0,nodeColor:"#1da",scale:1},
//     {id:1,val:34,x:0,y:0,nodeColor:"#1da",scale:1},
//     {id:2,val:56,x:0,y:0,nodeColor:"#1da",scale:1},
//     {id:3,val:23,x:0,y:0,nodeColor:"#1da",scale:1},
//     {id:4,val:4,x:0,y:0,nodeColor:"#1da",scale:1},
//     {id:5,val:6,x:0,y:0,nodeColor:"#1da",scale:1},
//     {id:6,val:9,x:0,y:0,nodeColor:"#1da",scale:1},
//     {id:7,val:15,x:0,y:0,nodeColor:"#1da",scale:1},
//     {id:8,val:65,x:0,y:0,nodeColor:"#1da",scale:1},
//     {id:9,val:45,x:0,y:0,nodeColor:"#1da",scale:1},
//     {id:10,val:88,x:0,y:0,nodeColor:"#1da",scale:1},
//     {id:11,val:29,x:0,y:0,nodeColor:"#1da",scale:1},
//   ];

// const LinkedListNodes = 
//   {
//     id:0,
//     value:0,
//     x:0,
//     y:0,
//     nodeColor:"#1da",
//     linkColor:"#fff",
//     scale:1,
//     next:{
//       id:1,
//       value:1,
//       x:0,
//       y:0,
//       nodeColor:"#1da",
//       linkColor:"#fff",
//       scale:1,
//       next:{
//         id:2,
//         value:2,
//         x:0,
//         y:0,
//         nodeColor:"#1da",
//         linkColor:"#fff",
//         scale:1,
//         next:{
//           id:3,
//           value:3,
//           x:0,
//           y:0,
//           nodeColor:"#1da",
//           linkColor:"#fff",
//           scale:1,
//           next:null
//         }
//       }
//     }
//   };


// const TreeNodes = 
//   {
//     id: 0,
//     left: {
//       id: 1,
//       left: {
//         id: 3,
//         left: {
//           id: 7,
//           left: null,
//           right: null,
//           val: 8,
//           x:0,
//           y:0,
//           nodeColor:"#1da",
//           leftLinkColor:"#fff",
//           rightLinkColor:"#fff",
//           scale:1
//         },
//         right: {
//           id: 8,
//           left: null,
//           right: null,
//           val: 9,
//           x:0,
//           y:0,
//           nodeColor:"#1da",
//           leftLinkColor:"#fff",
//           rightLinkColor:"#fff",
//           scale:1
//         },
//         val: 4,
//         x:0,
//         y:0,
//         nodeColor:"#1da",
//         leftLinkColor:"#fff",
//         rightLinkColor:"#fff",
//         scale:1
//       },
//       right: {
//         id: 4,
//         left: null,
//         right: null,
//         val: 5,
//         x:0,
//         y:0,
//         nodeColor:"#1da",
//         leftLinkColor:"#fff",
//         rightLinkColor:"#fff",
//         scale:1
//       },
//       val: 2,
//       x:0,
//       y:0,
//       nodeColor:"#1da",
//       leftLinkColor:"#fff",
//       rightLinkColor:"#fff",
//       scale:1
//     },
//     right: {
//       id: 2,
//       left: {
//         id: 5,
//         left: null,
//         right: null,
//         val: 6,
//         x:0,
//         y:0,
//         nodeColor:"#1da",
//         leftLinkColor:"#fff",
//         rightLinkColor:"#fff",
//         scale:1
//       },
//       right: {
//         id: 6,
//         left: null,
//         right: null,
//         val: 7,
//         x:0,
//         y:0,
//         nodeColor:"#1da",
//         leftLinkColor:"#fff",
//         rightLinkColor:"#fff",
//         scale:1
//       },
//       val: 3,
//       x:0,
//       y:0,
//       nodeColor:"#1da",
//       leftLinkColor:"#fff",
//       rightLinkColor:"#fff",
//       scale:1
//     },
//     val: 1,
//     x:0,
//     y:0,
//     nodeColor:"#1da",
//     leftLinkColor:"#fff",
//     rightLinkColor:"#fff",
//     scale:1
//   };


// const GraphNodes = [
//   {children: [1, 2, 3, 9], id: 0, val: "A",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [0, 2, 8], id: 1, val: "B",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [0,1,3,4,5,6], id: 2, val: "C",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [0,2,5,7,9,10], id: 3, val: "D",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [2,6,8], id: 4, val: "E",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [2,3,6,7], id: 5, val: "F",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [2,4,5], id: 6, val: "G",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [3,5,10], id: 7, val: "H",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [1,4], id: 8, val: "I",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [0,3,10], id: 9, val: "J",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [3,7,9], id: 10, val: "K",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1}
// ]

// const GraphNodes = [
//   {children: [1,2,3], id: 0, val: "A",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [0,2,3], id: 1, val: "B",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [0,1,3], id: 2, val: "C",x:50,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
//   {children: [0,1,2], id: 3, val: "D",x:0,y:0,nodeColor:"#1da",linkColor:"#fff",scale:1},
// ]

class Screen extends Component {

    constructor(props) {
        super(props);
        this.state={
          windowSizeIsChanged:false,
          nodes:null,
          isUpdating:false,
          metaData:null,
        }
        this.tree = React.createRef();
        this.scrollRef = React.createRef();
        this.timeline = null;
    }

    updateDimensions = () => {
      this.setState({ windowSizeIsChanged:true });
    };

    handleKeyDown=(event)=>{
      // handling space key
      if(event.keyCode === 32){
        if(!this.props.data_visualizer.start)
          this.startVisualization();
        else
          this.stopVisualization();
      }
      if(event.ctrlKey && event.keyCode === 83){
        event.preventDefault();
      }
    }
    componentDidMount(){
      document.addEventListener("keydown", this.handleKeyDown, false);
      window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount(){
      document.removeEventListener("keydown", this.handleKeyDown, false);
      window.removeEventListener('resize', this.updateDimensions);
      this.setState({ windowSizeIsChanged:false });
    }


    componentWillReceiveProps(nextProps){
      if(nextProps != null){
        console.log(nextProps)
        if(nextProps.metaData && this.state.metaData === null){
          this.setState({metaData:JSON.parse(nextProps.metaData)});
          this.props.getTimelineData(JSON.parse(nextProps.metaData));
        }
      }
    }

    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    
    startVisualization=()=>{
        console.log("start");

        this.props.startVisualizer();
    
        let step = this.props.data_visualizer.step;
        let metaData = this.state.metaData;
        this.timeline = setInterval(() => {
     

          this.props.setStepValue(step++);

          if(step === metaData.steps.length){
            this.stopVisualization();
          }
          
          
        }, this.props.data_visualizer.speed);

      }
    
      stopVisualization=()=>{
        this.props.stopVisualizer();
        clearInterval(this.timeline);
    }

    handleKeyPress=(e)=>{
      console.log(e.key);
    }

    handleScroll=(e)=>{
      this.props.setScrollTopOffsetValue(this.scrollRef.current.scrollTop);
    }

    render() {
      console.log(')))))))))))')
      console.log(this.props.data_visualizer.timelineData);
        return (
            <div style={{width:'100%',height:'100%'}} onKeyPress={this.handleKeyPress}>
                <div style={{...nav}}>
                        <div style={{...vis__speed}}>
                            <SpeedController/>
                        </div>
                        <div style={{...vis__controller}}>
                            <TimelineController metaData={this.state.metaData}/>
                        </div>
                        <div style={{...vis__player}}>
                            <div style={{...nav__icon}}>
                                <SkipPrevious style={{fontSize:30,cursor:'pointer'}}/>
                            </div>
                            <div style={{...nav__icon}}>
                            {!this.props.data_visualizer.start ?
                                <PlayArrow onClick={this.startVisualization} style={{fontSize:30,cursor:'pointer'}}/>
                                :<Pause onClick={this.stopVisualization} style={{fontSize:30,cursor:'pointer'}}/>
                            }
                            </div>
                            <div style={{...nav__icon}}>
                                <SkipNext style={{fontSize:30,cursor:'pointer'}}/>
                            </div>
                            
                        </div>
                </div>

                <div id="screen" className={this.props.data_layout.scroll__class} ref={this.scrollRef} onScroll={this.handleScroll} style={{width:`100%`,height:'75%',overflowY:'scroll',display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexDirection:'column',position:'absolute'}}>

                        {/* For LinkedList */}
                        {/* {
                          this.state.nodes && (
                            <LinkedListNode node={this.state.nodes}/>
                          )
                        } */}

                        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start'}}>
                        {
                            
                            this.props.data_visualizer.timelineData.length > 0 && Object.values(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].LinkedLists).map((node,index)=>{
                              return (
                              <div key={index} className={Object.keys(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].LinkedLists)[index]}>
                                <LinkedListNode node={node.head}/> 
                              </div>)
                            })
                          }
                        </div>


                        {/* For DoublyLinkedList */}
                        {/* {
                          this.state.nodes && (
                            <DoublyLinkedListNode node={this.state.nodes}/>
                          )
                        } */}

                        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start'}}>
                        {
                            
                            this.props.data_visualizer.timelineData.length > 0 && Object.values(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].DoublyLinkedLists).map((node,index)=>{
                              return (
                              <div key={index} className={Object.keys(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].DoublyLinkedLists)[index]}>
                                <DoublyLinkedList headKey = {Object.keys(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].DoublyLinkedLists)[index]}   node={node.head}/> 
                                </div>)
                            })
                          }
                        </div>


                        {/* For Tree */}

                        {
                            
                            this.props.data_visualizer.timelineData.length > 0 && Object.values(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].BinaryTrees).map((node,index)=>{
                              return (
                              <div key={index} className={Object.keys(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].BinaryTrees)[index]}>
                                <TreeNode  node={node.root}/> 
                                </div>
                              )
                            })
                        }
                        

                        {/* {
                        this.state.nodes &&(
                            <TreeNode node={this.state.nodes}/>
                        )
                        } */}

                        {/* Graph */}
                        {/* {
                           this.props.data_visualizer.timelineData.length > 0 && this.state.nodes && (
                            <GraphNode graph={this.state.nodes} node={this.state.nodes[0]}/>
                          )
                        } */}
                        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',margin:'50px'}}>
                        {
                            
                            this.props.data_visualizer.timelineData.length > 0 && Object.values(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].Graphs).map((node,index)=>{
                              return (
                              <div key={index} >
                                {/* <GraphNode  node={node.adjList}/>  */}
                                <Graph1 graphKey={Object.keys(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].Graphs)[index]} node={node.adjList}/>
                              </div>
                              )
                            })
                        }
                        </div>


                        {/* ForArrays */}
                        {/* {
                          this.state.nodes && (
                            <ArrayNode nodes={this.state.nodes}/>
                          )
                        } */}
                          
                          {
                            this.props.data_visualizer.timelineData.length > 0 && Object.values(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].Arrays).map((node,index)=>{
                              return (
                              this.props.data_visualizer.inMatrix[Object.keys(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].Arrays)[index]] === undefined?
                              <div className={Object.keys(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].Arrays)[index]} key={index} style={this.props.data_layout.isBar?{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignContent:'flex-start',justifyItems:'flex-start',alignItems:'flex-start'}:{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <span style={{fontSize:'30px',color:'#fff',transform:this.props.data_layout.isBar?'rotate(90deg)':'rotate(0deg)'}}>{'['}</span>
                                <ArrayNode isBar={this.props.data_layout.isBar}  nodes={node}/> 
                                <span style={{fontSize:'30px',color:'#fff',transform:this.props.data_layout.isBar?'rotate(90deg)':'rotate(0deg)'}}>{']'}</span>
                              </div> : null)
                            })
                          }

                          {
                            this.props.data_visualizer.timelineData.length > 0 && Object.values(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].Objects).map((node,index)=>{
                              return (
                              this.props.data_visualizer.inMatrix[Object.keys(this.props.data_visualizer.timelineData[this.props.data_visualizer.step].Objects)[index]] === undefined?
                              <div key={index} style={{width:'100%',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
                                <span style={{fontSize:'30px',color:'#fff'}}>{'{'}</span>
                                <ObjectShape  node={node}/> 
                                <span style={{fontSize:'30px',color:'#fff'}}>{'}'}</span>
                              </div> : null)
                            })
                          }
                          


                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      data_visualizer: state.visualizer_reducer,
      data_layout:state.layout_reducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      startVisualizer,
      stopVisualizer,
      setStepValue,
      getTimelineData,
      setScrollTopOffsetValue,
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Screen);
