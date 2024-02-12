import { motion } from 'framer-motion';
import React, { Component } from 'react';
import Circle from './Circle';
import LineTo from './LineTo';

class Graph1 extends Component {

    constructor(props) {
        super(props);
        this.state={
            keys:[],
            children:[],
            links:[],
            positions:{},
            currentNode:''
        }
    }

    componentDidMount(){
        let positions = this.state.positions;
        let local_positions = JSON.parse(localStorage.getItem(`positions-${this.props.graphKey}`));

        if(Object.keys(local_positions ?? []).length > 0){
            positions = local_positions;
        }else{
            let keys = Object.keys(this.props.node);
            for(let i=0;i<keys.length;i++){
                positions[keys[i]] = {x:0,y:0};
            }
        }

        
        this.setState({positions});
        this.plotGraph();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            this.plotGraph();
        }
    }

    plotGraph=()=>{
        let keys = Object.keys(this.props.node);
        let values = Object.values(this.props.node);

        let links = [];
        let positions = this.state.positions;

        console.log('onix',this.props.node);
        
        for(let i=0;i<keys.length;i++){
            for(let j=0;j<values[i].length;j++){
                if(values[i][j] !== undefined){
                    links.push(
                        <div key={`link-${keys[i]}-${values[i][j]}`}>
                        <LineTo color={'#fff'} from={`graph-${keys[i]}`} dx1={positions[keys[i]]?.x || 0} dy1={positions[keys[i]]?.y || 0} to={`graph-${values[i][j]}`} dx2={positions[values[i][j]]?.x || 0} dy2={positions[values[i][j]]?.y || 0} shiftLinkY={0}/>
                        </div>
                    )
                }
            }

        }

        this.setState({links});

    }

    handlePanel=(event,info)=>{
        if(this.state.currentNode){
            let id = this.state.currentNode;
            let positions = this.state.positions;
            if(positions[id] === undefined){
                positions[id] = {x:0,y:0};
            }

            positions[id].x += info.delta.x;
            positions[id].y += info.delta.y;

            this.setState({positions});
            window.localStorage.setItem(`positions-${this.props.graphKey}`,JSON.stringify(positions));
            this.plotGraph();
        }
    }

    render() {
        
        return (
            <div style={{...styles}}>
                <motion.div style={{display:'flex',justifyContent:'center',alignItems:'center',border:'1px dashed #D1C4E9',borderRadius:'50%',backgroundColor:'rgba(26, 35, 126,0.3)',width:'100px',height:'100px'}}>
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragConstraints={{ left: 0, right: 0,top:0,bottom:0 }}
                        dragElastic={0.2}
                        onDrag={this.handlePanel}
                        style={{backgroundColor:'#3D5AFE',color:'#fff',cursor:'pointer',width:'50px',height:'50px',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}
                    >
                        {this.state.currentNode}
                    </motion.div>
                </motion.div>
                {
                    Object.keys(this.props.node).map((item,index)=>{
                        return(
                        <div key={item}>
                            <div style={{display:'flex',
                                justifyContent:'center',alignItems:'center',margin:'5px',flexWrap:'wrap',width:'120px',height:'60px'}}>
                                
                                {index%2 === 0 &&( 
                                    <span onClick={()=>this.setState({currentNode:item})} key={index} className={`graph-${item}`}>
                                    <Circle
                                    key={item} value={item}
                                    nodeColor={'#1da'}
                                    x={this.state.positions[item]?.x} y={this.state.positions[item]?.y} scale={1}
                                    // handleDrag = {(event,info,id)=>this.handleDrag(event,info,id)}
                                    />
                                    </span>
                                )}
                                    
                                
                                
                            </div>
                            <div style={{display:'flex',
                                justifyContent:'center',alignItems:'center',margin:'5px',flexWrap:'wrap',width:'120px',height:'60px'}}>
                            </div>
                            <div style={{display:'flex',
                                justifyContent:'center',alignItems:'center',margin:'5px',flexWrap:'wrap',width:'120px',height:'60px'}}>
                                {index%2 !== 0 && 
                                <span onClick={()=>this.setState({currentNode:item})} key={index} className={`graph-${item}`}>
                                    <Circle
                                    key={item} value={item}
                                    nodeColor={'#1da'}
                                    x={this.state.positions[item]?.x} y={this.state.positions[item]?.y} scale={1}
                                    // handleDrag = {(event,info,id)=>this.handleDrag(event,info,id)}
                                    />
                                </span>
                                 
                                }
                            </div>
                        </div>
                    )
                    })
                }
                
                {
                    this.state.links
                }

                
                   
            </div>
        )
    }
}


const styles={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
}

export default Graph1;