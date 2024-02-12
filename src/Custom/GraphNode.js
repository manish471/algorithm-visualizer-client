import React, { Component } from 'react';
import Circle from './Circle';
import LineTo from './LineTo';

class GraphNode extends Component {

    constructor(props) {
        super(props);
        this.state={
            res:[],
            links:[]
        }
    }

    componentDidMount(){
        this.bfs();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            this.bfs();
        }
    }
    
    bfs=()=>{



        let node = this.props.node;
        let node_keys = Object.keys(node);
        let node_values = Object.values(node);
        let mapKeyToIndex ={};

        let arr = [];
        console.log('pika pika piiii',node);
        for(let i=0;i<node_keys.length;i++){
            let children = [];
            for(let j=0;j<node_values[i].length;j++){
                if(node_values[i][j] !== undefined){
                    children.push(node_values[i][j]);
                }
            }
            let ideal_node = {};
            ideal_node.id=i;
            ideal_node.val=node_keys[i];
            ideal_node.children=children;
            ideal_node.x=0;
            ideal_node.y=0;
            ideal_node.nodeColor="#1da";
            ideal_node.linkColor="#fff";
            ideal_node.scale=1;
            mapKeyToIndex[node_keys[i]] = i;
            arr.push(ideal_node);
        }

        console.log('pika pika',arr);
        let graph = arr;
        let startNode = arr[0];
        let queue = [];
        let res = [];
        let visited = {};

        queue.push(startNode);
        // visited[0] = true;
        

        let count = 1;
        let lvl = [];
        while(queue.length !== 0 && arr.length > 0){
            
            let node = queue.shift();

            if(visited[node.id] === undefined){
                lvl.push({
                id:node.id,
                node:<Circle
                    key={node.id} value={node.val}
                    nodeColor={node.nodeColor}
                    x={node.x} y={node.y} scale={node.scale}
                />}
                );
            }
            visited[node.id] = true;

            count--;
            if(count === 0){
                count = node.children.length;
                res.push(lvl);
                lvl = [];
            }

            
            for(let item of node.children){
                if(visited[mapKeyToIndex[item]] === undefined){
                    
                    queue.push(graph[mapKeyToIndex[item]]);
                }
            }
            
        }
        console.log('op',res);
        this.setState({res});
        this.connectLinks(graph,mapKeyToIndex);
    }

    connectLinks=(graph,mapKeyToIndex)=>{

        let links = [];
        
        for(let node of graph){
            for(let item of node.children){
                links.push(
                    <div key={`link-${node.id}-${mapKeyToIndex[item]}`}>
                    <LineTo color={'#fff'} from={`graph-${node.id}`} dx1={node.x} dy1={node.y} to={`graph-${mapKeyToIndex[item]}`} dx2={graph[mapKeyToIndex[item]].x} dy2={graph[mapKeyToIndex[item]].y} shiftLinkY={0}/>
                    </div>
                )
            }
        }

        this.setState({links});


    }

    render() {
        return (
            <div style={{...styles}}>
                {this.state.res.length > 0 &&
                    this.state.res.map((row,index)=>{
                        return(
                            <div key={index} style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',flexWrap:'wrap'}}>
                                
                                {
                                    row.map((col,index)=>{
                                        return(
                                            
                                            <div key={index}>
                                            <div style={{display:'flex',
                                            justifyContent:'center',alignItems:'center',flexWrap:'wrap',width:'120px',height:'60px'}}>
                                              {index%2 === 0 && <span key={index} className={`graph-${col.id}`}>
                                                    {col.node}
                                                </span>
                                            }
                                            </div>
                                            <div style={{display:'flex',
                                            justifyContent:'center',alignItems:'center',flexWrap:'wrap',width:'120px',height:'60px'}}>
                                               {index%2 !== 0 && <span key={index} className={`graph-${col.id}`}>
                                                    {col.node}
                                                </span>
                                               }
                                            </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {this.state.links.length > 0 &&
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
    flexWrap:'wrap'
}


export default GraphNode;