import React, { Component } from 'react'
import DSDialogBox from './DSDialogBox';

class DatastructurePanel extends Component {

    constructor(props) {
        super(props);
        this.state={
            data_py:[
                {
                    title:'LinkedList',
                    node:{
                        code:`class LLNode:\n\tdef __init__(self,val):\n\t\tself.value = val\n\t\tself.next = None\n\t\n\t\n`,
                        endLineForEditor:6,
                        editableLineStart:5
                    },
                    structure:{
                        code:`class LinkedList:\n\tdef __init__(self):\n\t\tself.head = None\n\t\n\t\n`,
                        endLineForEditor:5,
                        editableLineStart:4
                    }
                },
                {
                    title:'DoublyLinkedList',
                    node:{
                        code:`class DLLNode:\n\tdef __init__(self,val):\n\t\tself.value = val\n\t\tself.next = None\n\t\tself.prev = None\n\t\n\t\n`,
                        endLineForEditor:7,
                        editableLineStart:6
                    },
                    structure:{
                        code:`class DoublyLinkedList:\n\tdef __init__(self):\n\t\tself.head = None\n\t\n\t\n`,
                        endLineForEditor:5,
                        editableLineStart:4
                    }
                },
                {
                    title:'BinaryTree',
                    node:{
                        code:`class BTNode:\n\tdef __init__(self,val):\n\t\tself.value = val\n\t\tself.left = None\n\t\tself.right = None;\n\t\n\t\n`,
                        endLineForEditor:7,
                        editableLineStart:6
                    },
                    structure:{
                        code:`class BinaryTree:\n\tdef __init__(self):\n\t\tself.root = None\n\t\n\t\n`,
                        endLineForEditor:5,
                        editableLineStart:4
                    }
                },
                {
                    title:'Graph',
                    node:{
                        code:``,
                        endLineForEditor:0,
                        editableLineStart:0,
                        readOnly:true
                    },
                    structure:{
                        code:`class Graph:\n\tdef __init__(self):\n\t\tself.adjList = {}\n\t\n\t\n`,
                        endLineForEditor:5,
                        editableLineStart:4
                    }
                }

            ],
            data:[
                {
                    title:'LinkedList',
                    node:{
                        code:`class LLNode{\n\tconstructor(val){\n\t\tthis.value = val;\n\t\tthis.next = null;\n\t\n\t}\n}`,
                        endLineForEditor:6,
                        editableLineStart:5
                    },
                    structure:{
                        code:`class LinkedList{\n\tconstructor(){\n\t\tthis.head = null;\n\t\n\t}\n}`,
                        endLineForEditor:5,
                        editableLineStart:4
                    }
                },
                {
                    title:'DoublyLinkedList',
                    node:{
                        code:`class DLLNode{\n\tconstructor(val){\n\t\tthis.value = val;\n\t\tthis.next = null;\n\t\tthis.prev = null;\n\t\n\t}\n}`,
                        endLineForEditor:7,
                        editableLineStart:6
                    },
                    structure:{
                        code:`class DoublyLinkedList{\n\tconstructor(){\n\t\tthis.head = null;\n\t\n\t}\n}`,
                        endLineForEditor:5,
                        editableLineStart:4
                    }
                },
                {
                    title:'BinaryTree',
                    node:{
                        code:`class BTNode{\n\tconstructor(val){\n\t\tthis.value = val;\n\t\tthis.left = null;\n\t\tthis.right = null;\n\t\n\t}\n}`,
                        endLineForEditor:7,
                        editableLineStart:6
                    },
                    structure:{
                        code:`class BinaryTree{\n\tconstructor(){\n\t\tthis.root = null;\n\t\n\t}\n}`,
                        endLineForEditor:5,
                        editableLineStart:4
                    }
                },
                {
                    title:'Graph',
                    node:{
                        code:``,
                        endLineForEditor:0,
                        editableLineStart:0,
                        readOnly:true
                    },
                    structure:{
                        code:`class Graph{\n\tconstructor(){\n\t\tthis.adjList = {};\n\t\n\t}\n}`,
                        endLineForEditor:5,
                        editableLineStart:4
                    }
                }

            ]
        }
    }


    render() {
        return (
            <div className={this.props.scroll__class} style={{width:'100%',height:'315px',display:'flex',justifyContent:'center',alignItems:'center',flexWrap:'wrap',overflowY:'auto'}}>
                {
                    this.props.lang === "Javascript"?this.state.data.map((item,index)=>{
                        return(
                            <DSDialogBox defaultCode={this.props.defaultCode} key={index} item={item}/>
                        )
                    }):
                    this.state.data_py.map((item,index)=>{
                        return(
                            <DSDialogBox defaultCode={this.props.defaultCode} key={index} item={item}/>
                        )
                    })

                }
            </div>
        )
    }
}

export default DatastructurePanel;
