import React, { Component } from 'react';
import Bar from './Bar';
import Circle from "./Circle";


class ArrayNode extends Component {

    constructor(props) {
        super(props);
        this.state={
            nodes:[]
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            this.setState({nodes:nextProps.nodes});
        }
    }
    

    render() {
        return (
            <>
                {
                    this.state.nodes.map((item) => {
                        return ( 
                        this.props.isBar?
                        <Bar
                            key={item.id} value={item.val}
                            nodeColor={item.nodeColor}
                            x={item.x} y={item.y} scale={item.scale}
                            rotateX = {item.rotateX}
                        />:
                        <Circle 
                            key={item.id} value={item.val}
                            nodeColor={item.nodeColor}
                            x={item.x} y={item.y} scale={item.scale}
                            rotateX = {item.rotateX}
                        /> 
                        
                        )
                    })
                }
            </>
        )
    }
}

export default ArrayNode;
