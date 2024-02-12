import React, { Component } from 'react';
import { body, link, nav__body, nav__title } from './css/index.css';
import { Link } from 'react-router-dom';
import Card from './Card';
import { Divider } from '@material-ui/core';

class Algorithms extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            tile_sort : [
                {
                    title:'Bubble Sort',
                    info:'A Sorting Algorithm is used to rearrange a given array or list elements according to a comparison operator on the elements. The comparison operator is used to decide the new order of element in the respective data structure.'
                },
                {
                    title:'Selection Sort',
                    info:'A Sorting Algorithm is used to rearrange a given array or list elements according to a comparison operator on the elements. The comparison operator is used to decide the new order of element in the respective data structure.'
                },
                {
                    title:'Insertion Sort',
                    info:'A Sorting Algorithm is used to rearrange a given array or list elements according to a comparison operator on the elements. The comparison operator is used to decide the new order of element in the respective data structure.'
                },
                {
                    title:'Merge Sort',
                    info:'A Sorting Algorithm is used to rearrange a given array or list elements according to a comparison operator on the elements. The comparison operator is used to decide the new order of element in the respective data structure.'
                },
                {
                    title:'Quick Sort',
                    info:'A Sorting Algorithm is used to rearrange a given array or list elements according to a comparison operator on the elements. The comparison operator is used to decide the new order of element in the respective data structure.'
                },
                {
                    title:'Bucket Sort',
                    info:'A Sorting Algorithm is used to rearrange a given array or list elements according to a comparison operator on the elements. The comparison operator is used to decide the new order of element in the respective data structure.'
                },

            ],

            tile_search:[
                {
                    title:'Linear Search',
                    info:'Searching Algorithms are designed to check for an element or retrieve an element from any data structure where it is stored.'
                },
                {
                    title:'Binary Search',
                    info:'Searching Algorithms are designed to check for an element or retrieve an element from any data structure where it is stored.'
                },
            ]
        }
    }
    

    render() {
        return (
            <div style={{...body}}>
                <div  style={{...nav__body}}>
                    <div  style={{...nav__title}}><Link style={{...link}} to="/">Algorithms-Visualizer</Link></div>
                </div>
                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap',flexDirection:'column',margin:'5px',backgroundColor:'#15314b',marginBottom:'20px',marginTop:'10px'}}>
                   <span style={{color:"#fff",fontSize:'30px',fontWeight:'bolder',marginLeft:'10px',marginBottom:'5px'}}> Sorting Algorithms </span>
                   <Divider style={{backgroundColor:'#02203c',height:'3px',width:'100%'}}/>
                   <p style={{color:"#fff",fontSize:'17px',marginLeft:'10px',fontFamily: 'Lucida Sans',textIndent:'20px',lineHeight:'20px'}}>
                    A Sorting Algorithm is used to rearrange a given array or list elements according to a comparison operator on the elements. 
                    The comparison operator is used to decide the new order of element in the respective data structure.
                   </p>
                </div>
                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexWrap:'wrap'}}>
                    {
                        this.state.tile_sort.map((item,index)=>{
                            return(
                                <Card
                                    key={index}
                                    title={item.title}
                                    info={item.info}
                                />
                            )
                        })
                    }
                    

                </div>

                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap',flexDirection:'column',margin:'5px',backgroundColor:'#15314b',marginBottom:'20px',marginTop:'10px'}}>
                    <span style={{color:"#fff",fontSize:'30px',fontWeight:'bolder',marginLeft:'10px',marginBottom:'5px'}}>
                        Searching Algorithms 
                    </span>
                   <Divider style={{backgroundColor:'#02203c',height:'3px',width:'100%'}}/>
                   <p style={{color:"#fff",fontSize:'17px',marginLeft:'10px',fontFamily: 'Lucida Sans',textIndent:'20px',lineHeight:'20px'}}>
                        Searching Algorithms are designed to check for an element or retrieve an element from any data structure where it is stored.
                   </p>
                </div>
                <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexWrap:'wrap'}}>
                    {
                        this.state.tile_search.map((item,index)=>{
                            return(
                                <Card
                                    key={index}
                                    title={item.title}
                                    info={item.info}
                                />
                            )
                        })
                    }
                    

                </div>
            </div>
        )
    }
}

export default Algorithms;