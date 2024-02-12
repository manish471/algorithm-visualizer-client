import React, { Component } from 'react';
import Circle from "./Circle";
import LineTo from './LineTo';



class DoublyLinkedList extends Component {


    render() {

        
        if(this.props.node === null){
            return null;
        }

        return (
                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap'}}>
                    
                    <div className={this.props.headKey + this.props.node.id.toString()} >
                    <Circle 
                    key={this.props.node.id} value={this.props.node.value}
                    nodeColor={this.props.node.nodeColor}
                    x={this.props.node.x} y={this.props.node.y} scale={this.props.node.scale}
                    />
                    </div>
                     
                    <div>
                        {this.props.node.next &&  <LineTo color={this.props.node.linkColor} from={this.props.headKey+this.props.node.id.toString()} dx1={this.props.node.x} dy1={this.props.node.y} to={this.props.headKey+this.props.node.next.id.toString()} dx2={this.props.node.next.x} dy2={this.props.node.next.y} shiftLinkY={-5}/>}
                        {this.props.node.prev &&  <LineTo color={this.props.node.prevLinkColor} from={this.props.headKey+this.props.node.id.toString()} dx1={this.props.node.x} dy1={this.props.node.y} to={this.props.headKey+this.props.node.prev.id.toString()} dx2={this.props.node.prev.x} dy2={this.props.node.prev.y} shiftLinkY={5}/>}
                        
                    </div>

                    <DoublyLinkedList headKey={this.props.headKey} node={this.props.node.next}/>
                </div> 
        )
    }
}

export default DoublyLinkedList;
