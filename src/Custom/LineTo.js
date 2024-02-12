import React,{useEffect,useState} from 'react'
import { motion } from 'framer-motion';
import {connect} from 'react-redux';

function LineTo(props) {

    const [divs,setDivs] = useState(null);

    useEffect(() => {

        if(divs == null){
            let div1 = document.getElementsByClassName(props.from)[0];
            let div2 = document.getElementsByClassName(props.to)[0];
            let divs = {div1:div1,div2:div2};
            console.log('777')
            console.log(divs);
            setDivs(divs);
        }
    },[props.from,props.to,divs]);

    
    function connect(div1, div2, color, thickness,dx1,dy1,dx2,dy2,shiftLinkY) { 
        var coord1 = div1.getBoundingClientRect();
        var coord2 = div2.getBoundingClientRect();

        var offsetLeft = document.getElementById('screen').offsetLeft;
        var offsetTop = document.getElementById('screen').offsetTop;

        console.log('offset',offsetLeft)

        var x1 = coord1.x+(coord1.height/2)+dx1;
        var y1 = coord1.y+(coord1.height/2)+dy1 + props.data_visualizer.scrollTopOffset;
        
        var x2 = coord2.x+(coord2.height/2)+dx2;
        var y2 = coord2.y+(coord2.height/2)+dy2 + props.data_visualizer.scrollTopOffset;
        // distance
        var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)))-50;
        // center
        var cx = ((x1 + x2) / 2) - (length / 2);
        var cy = ((y1 + y2) / 2) - (thickness / 2) + shiftLinkY;
        // angle
        var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);

        return (
        <motion.div 
        initial={{
            rotate: angle,
            padding:'0px', margin:'0px', height:`${thickness}px`,
         lineHeight:'1px', position:'absolute',
          left:`${cx-offsetLeft}px`, top:`${cy-offsetTop}px`, width:`${length}px`,
        }}
        whileHover={{backgroundColor:'#F57F17',cursor:'pointer'}}
        animate={{
            scale:[0,1],
            backgroundColor:color,
            rotate: angle,
            padding:'0px', margin:'0px', height:`${thickness}px`,
         lineHeight:'1px', position:'absolute',
          left:`${cx-offsetLeft}px`, top:`${cy-offsetTop}px`, width:`${length}px`,
        }} 
        transition={{ duration: props.data_visualizer.speed/1000 }} />);

    }


    return (
        <span>
            {divs && connect(divs.div1,divs.div2,props.color,3,props.dx1,props.dy1,props.dx2,props.dy2,props.shiftLinkY)}
        </span>
        
    )
}

const mapStateToProps = (state) => {
    return {
        data_visualizer: state.visualizer_reducer
    }
}

export default connect(mapStateToProps,null)(LineTo);