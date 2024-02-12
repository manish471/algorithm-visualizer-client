import React from 'react'
import Circle from './Circle';
import LineTo from './LineTo';

function TreeNode(props) {

    if(props.node == null)
        return (
            <Circle 
                    value={''}
                    nodeColor={'rgb(0,0,0,0)'}
                    x={0} y={0} scale={0}
            />
        );

    return (
        <div key={`${props.node.id}-${props.linkKey}`} style={{...styles}}>

            <div className={props.node.id.toString()} >
            <Circle
            key={props.node.id} value={props.node.val}
            nodeColor={props.node.nodeColor}
            linkColor={props.node.linkColor}
            x={props.node.x} y={props.node.y} scale={props.node.scale}
            />
            </div>

                
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                
                <TreeNode  node={props.node.left}/>
                {props.node && props.node.left && <LineTo color={props.node.leftLinkColor} from={props.node.id.toString()} dx1={props.node.x} dy1={props.node.y} to={props.node.left.id.toString()} dx2={props.node.left.x} dy2={props.node.left.y} shiftLinkY={0}/>}
                <TreeNode  node={props.node.right}/> 
                {props.node && props.node.right && <LineTo color={props.node.rightLinkColor} from={props.node.id.toString()} dx1={props.node.x} dy1={props.node.y} to={props.node.right.id.toString()} dx2={props.node.right.x} dy2={props.node.right.y} shiftLinkY={0}/>}
                  
            </div>
            
        </div>
    )
}

const styles={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexFlow:'column',
}


export default TreeNode;