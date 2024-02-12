import React, { Component } from 'react';
import Circle from './Circle';
import LineTo from './LineTo';

class Graph extends Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    componentDidMount(){
        // if(localStorage.length === this.props.graph.length){
        //     console.log('pikachu')
        //     window.localStorage.clear();
        // }
        // if(this.props.data_visualizer){
        //     const visited = this.props.data_visualizer.visited;
        //     console.log('+++++')
        //     console.log('mounted',visited);
        //     visited[this.props.node.id] = true;
        //     this.props.setVisitedValue(visited);
        // }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            // if(localStorage.length === nextProps.graph.length){
            //     console.log('pikachu')
            //     window.localStorage.clear();
            // }
        }
    }

    render() {
        // const visited = this.props.data_visualizer.visited;
        if(window.localStorage.getItem(`${this.props.node.id}`) === null){
            console.log('+++++',this.props.node.id)
            window.localStorage.setItem(`${this.props.node.id}`,true);
            // this.props.setVisitedValue(visited);
        }

        
        
        return (
            <div style={{...styles}}>

                <div className={this.props.node.id.toString()}>
                    <Circle
                        key={this.props.node.id} value={this.props.node.val}
                        nodeColor={this.props.node.nodeColor}
                        x={this.props.node.x} y={this.props.node.y} scale={this.props.node.scale}
                    />
                </div>

                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    {
                    this.props.node.children.map((nd,index)=>{
                        if(window.localStorage.getItem(`${nd}`) === null){
                            return(
                                <div key={`${this.props.node.id.toString()}-${index}`}>
                                    <Graph
                                        graph={this.props.graph} node={this.props.graph[nd]}
                                        // data_visualizer={this.props.data_visualizer}
                                        // setVisitedValue={this.props.setVisitedValue}
                                    />  
                                    <LineTo color={this.props.node.linkColor} from={this.props.node.id.toString()} dx1={this.props.node.x} dy1={this.props.node.y} to={this.props.graph[nd].id.toString()} dx2={this.props.graph[nd].x} dy2={this.props.graph[nd].y} shiftLinkY={0}/>
                                </div>
                            )
                        }

                        return null;
                    })}
                    </div>
            </div>
        )
    }
}


const styles={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
}

export default Graph;