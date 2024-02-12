import React, { Component } from 'react';
import Circle from "./Circle";
import LineTo from './LineTo';



class LinkedListNode extends Component {


    render() {

        
        if(this.props.node === null || this.props.node.id === undefined){
            return null;
        }

        return (
                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap'}}>
                    
                    <div className={this.props.node.id.toString()} >
                    <Circle 
                    key={this.props.node.id} value={this.props.node.value}
                    nodeColor={this.props.node.nodeColor}
                    x={this.props.node.x} y={this.props.node.y} scale={this.props.node.scale}
                    />
                    </div>
                    
                    <div>
                       {this.props.node.next && this.props.node.id && this.props.node.next.id &&  <LineTo color={this.props.node.linkColor} from={this.props.node.id.toString()} dx1={this.props.node.x} dy1={this.props.node.y} to={this.props.node.next.id.toString()} dx2={this.props.node.next.x} dy2={this.props.node.next.y} shiftLinkY={0}/>}
                        <LinkedListNode node={this.props.node.next}/>
                    </div>

                
                </div> 
        )
    }
}

export default LinkedListNode;
