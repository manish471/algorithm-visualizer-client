import axios from 'axios';
import _ from 'lodash';


export function startVisualizer(){
    return{
        type:'START_VISUALIZATION',
        payload:true
    }
}

export function stopVisualizer(){
    return{
        type:'STOP_VISUALIZATION',
        payload:false
    }
}

export function setStepValue(val){
    return{
        type:'SET_STEP_VALUE',
        payload:val
    }
}

export function setScrollTopOffsetValue(val){
    return{
        type:'SET_SCROLL_TOP_OFFSET_VALUE',
        payload:val
    }
}

export function setSpeedValue(val){
    return{
        type:'SET_SPEED_VALUE',
        payload:val
    }
}

export function getTimelineData(metaData){

    let steps = metaData.steps;

    var timelineData = [];
    var stackData = [];

    var Arrays = {};
    var Objects = {};
    var LinkedLists = {};
    var DoublyLinkedLists = {};
    var BinaryTrees = {};
    var Graphs = {};
    let inMatrix = {};
    let AllObjects = [];

    let meta_objects_values = Object.values(metaData.objects);
    let meta_types = metaData.types;

    //mapping all arrays which are in matrix
    for(let i=0;i<meta_objects_values.length;i++){
        if(  meta_types[meta_objects_values[i][0]] === 'Array'){
            for(let j=0;j<meta_objects_values[i].length;j++){
                inMatrix[meta_objects_values[i][j]] = true;
            }
        }
    }

    //creating timeline array for metadata
    for(let step=0;step<steps.length;step++){
        
        let currentLine = steps[step];
        let stack = step === 0?[]:stackData[step-1];

        if(metaData.objectIndex[step]){
            AllObjects = [...AllObjects,...metaData.objectIndex[step]];
        }


        if(currentLine.type === 'EXPRESSION'){
            if(metaData.types[currentLine.value] === 'Array' || metaData.types[currentLine.value] === "list"){
                let array = [];
                let arrayObject = metaData.objects[currentLine.value];
                let length = arrayObject.length;

                for(let i=0;i<length;i++){
                    let node = {};
                    node.id = i;
                    node.val = arrayObject[i.toString()];
                    node.x = 0;
                    node.y = 0;
                    node.scale = 1;
                    node.rotateX = 0;
                    node.nodeColor = "#1da";

                    array.push(node);
                }

                Arrays[currentLine.value] = array;


            }else if(metaData.types[currentLine.value] === 'Object'){
                let nodeObject = metaData.objects[currentLine.value];
                let nodeObject_values = Object.values(nodeObject);
                let nodeObject_keys = Object.keys(nodeObject);
                
                let node = {};
                node.id = currentLine.value;
                node.val = [];
                for(let i=0;i<nodeObject_keys.length;i++){
                    let k = nodeObject_keys[i];
                    let v = nodeObject_values[i];
                    let o = {};
                    o[k] = v;
                    node.val.push(o);
                }
                node.x = 0;
                node.y = 0;
                node.scale = 1;
                node.rotateX = 0;
                node.nodeColor = "#1da";

                Objects[currentLine.value] = node;



            }
        }else if(currentLine.type === 'GET'){

            if(metaData.types[currentLine.object] === "Array" || metaData.types[currentLine.object] === "list"){

                var TempArrays_get = Arrays;
                var tempObject_get = TempArrays_get[currentLine.object];
                var tempNode_get = tempObject_get[currentLine.access];
                tempNode_get.nodeColor = ['#FFEB3B','#1da'];

                tempObject_get[currentLine.access] = tempNode_get;

                TempArrays_get[currentLine.object] = tempObject_get;

                Arrays = TempArrays_get;

            }
            else if(metaData.types[currentLine.object] === "LLNode"){
            
                metaData.objects[currentLine.object].nodeColor = ['#FFEB3B','#1da'];
                metaData.objects[currentLine.object].linkColor = ['#3D5AFE','#fff'];
            }else if(metaData.types[currentLine.object] === "DLLNode"){
            
                if(currentLine.access === 'value'){
                    metaData.objects[currentLine.object].nodeColor = ['#FFEB3B','#1da'];
                }else if(currentLine.access === 'next'){
                    metaData.objects[currentLine.object].linkColor = ['#3D5AFE','#fff'];
                }else if(currentLine.access === 'prev'){
                    metaData.objects[currentLine.object].prevLinkColor = ['#3D5AFE','#fff'];
                }
                
                
                
            }
            else if(metaData.types[currentLine.object] === "BTNode"){
            
                if(currentLine.access === 'value'){
                    metaData.objects[currentLine.object].nodeColor = ['#FFEB3B','#1da'];
                }else if(currentLine.access === 'left'){
                    metaData.objects[currentLine.object].leftLinkColor = ['#3D5AFE','#fff'];
                }else if(currentLine.access === 'right'){
                    metaData.objects[currentLine.object].rightLinkColor = ['#3D5AFE','#fff'];
                }
                
                
                
            }
        }else if(currentLine.type === 'SET'){
            
            if(metaData.types[currentLine.object] === "Array" || metaData.types[currentLine.object] === "list"){

                if(currentLine.access === 'length'){
                    let arrayObject = metaData.objects[currentLine.object];
                    arrayObject.length = currentLine.value;
                }else{
                    var TempArrays = Arrays;
                    var tempObject = TempArrays[currentLine.object];
                    if(tempObject.length === currentLine.access){
                        let node = {};
                        node.id = currentLine.access;
                        node.val = currentLine.value;
                        node.x = 0;
                        node.y = 0;
                        node.scale = 1;
                        node.rotateX = 0;
                        node.nodeColor = ['#AB47BC','#1da'];

                        metaData.objects[currentLine.object][currentLine.access] = currentLine.value;
                        tempObject.push(node);
                    }else{
                        var tempNode = tempObject[currentLine.access];
                        tempNode.nodeColor = ['#AB47BC','#1da'];
                        tempNode.val = currentLine.value;
                        tempNode.rotateX = tempNode.rotateX === 0 ? 360 : 0;

                        tempObject[currentLine.access] = tempNode;

                    }

                    TempArrays[currentLine.object] = tempObject;

                    Arrays = TempArrays;

                }
            }else if(metaData.types[currentLine.object] === "LinkedList"){
                let LL = metaData.objects[currentLine.object];
                if(metaData.objects[currentLine.value] !== undefined){
                    LL[currentLine.access] = metaData.objects[currentLine.value];
                }else{
                    LL[currentLine.access] = metaData.types[currentLine.value] === 'null'?null:currentLine.value;
                }


                LinkedLists[currentLine.object] =   LL;
                
 

            }else if(metaData.types[currentLine.object] === "LLNode"){
                let LLNode = metaData.objects[currentLine.object];
                if(metaData.objects[currentLine.value] !== undefined){
                    LLNode[currentLine.access] = metaData.objects[currentLine.value];
                }else{
                    LLNode[currentLine.access] = metaData.types[currentLine.value] === 'null'?null:currentLine.value;
                }


                
                
                LLNode.id=currentLine.object;
                LLNode.val=LLNode.value;
                LLNode.x=0;
                LLNode.y=0;
                LLNode.nodeColor="#1da";
                LLNode.linkColor="#fff";
                LLNode.scale=1;
                metaData.objects[currentLine.object] = LLNode;
            }else if(metaData.types[currentLine.object] === "DoublyLinkedList"){
                let DLL = metaData.objects[currentLine.object];
                if(metaData.objects[currentLine.value] !== undefined){
                    DLL[currentLine.access] = metaData.objects[currentLine.value];
                }else{
                    DLL[currentLine.access] = metaData.types[currentLine.value] === 'null'?null:currentLine.value;
                }


                DoublyLinkedLists[currentLine.object] =   DLL;
                
 

            }else if(metaData.types[currentLine.object] === "DLLNode"){
                let DLLNode = metaData.objects[currentLine.object];
                if(metaData.objects[currentLine.value] !== undefined){
                    DLLNode[currentLine.access] = metaData.objects[currentLine.value];
                }else{
                    DLLNode[currentLine.access] = metaData.types[currentLine.value] === 'null'?null:currentLine.value;
                }


                
                
                DLLNode.id=currentLine.object;
                DLLNode.val=DLLNode.value;
                DLLNode.x=0;
                DLLNode.y=0;
                DLLNode.nodeColor="#1da";
                DLLNode.linkColor="#fff";
                DLLNode.prevLinkColor="#fff";
                DLLNode.scale=1;
                metaData.objects[currentLine.object] = DLLNode;
            }
            else if(metaData.types[currentLine.object] === "BinaryTree"){
                let BT = metaData.objects[currentLine.object];
                if(metaData.objects[currentLine.value] !== undefined){
                    BT[currentLine.access] = metaData.objects[currentLine.value];
                }else{
                    BT[currentLine.access] = metaData.types[currentLine.value] === 'null'?null:currentLine.value;
                }


                BinaryTrees[currentLine.object] =   BT;
                
 

            }else if(metaData.types[currentLine.object] === "BTNode"){
                let BTNode = metaData.objects[currentLine.object];
                if(metaData.objects[currentLine.value] !== undefined){
                    BTNode[currentLine.access] = metaData.objects[currentLine.value];
                }else{
                    BTNode[currentLine.access] = metaData.types[currentLine.value] === 'null'?null:currentLine.value;
                }


                
                
                BTNode.id=currentLine.object;
                BTNode.val=BTNode.value;
                BTNode.x=0;
                BTNode.y=0;
                BTNode.nodeColor="#1da";
                BTNode.leftLinkColor="#fff";
                BTNode.rightLinkColor="#fff";
                BTNode.scale=1;
                metaData.objects[currentLine.object] = BTNode;
            }else if(metaData.types[currentLine.object] === "Graph"){
                let G = metaData.objects[currentLine.object];
                if(metaData.objects[currentLine.value] !== undefined){
                    G[currentLine.access] = metaData.objects[currentLine.value];
                }else{
                    G[currentLine.access] = metaData.types[currentLine.value] === 'null'?null:currentLine.value;
                }


                Graphs[currentLine.object] =   G;
                
 

            }else if(metaData.types[currentLine.object] === "Object"){

                let ObjNode = metaData.objects[currentLine.object];
                if(metaData.objects[currentLine.value] !== undefined){
                    ObjNode[currentLine.access] = metaData.objects[currentLine.value];
                }else{
                    ObjNode[currentLine.access] = currentLine.value;
                }
                
                metaData.objects[currentLine.object] =ObjNode;
                Objects[currentLine.object] = ObjNode;
                

            }

            
        }else if(currentLine.type === "DELETE"){
            if(metaData.types[currentLine.object] === "Array" || metaData.types[currentLine.object] === "list"){
                let arrayObject = metaData.objects[currentLine.object];
                
                delete arrayObject[currentLine.access.toString()];

                let tempArrays = Arrays;
                var tempObj = tempArrays[currentLine.object];
                console.log('deleted',tempObj[currentLine.access]);
                tempObj.splice(currentLine.access,1);
                console.log('deleted 1',_.cloneDeep(tempObj));
                tempArrays[currentLine.object] = tempObj;

            }
        }else if(currentLine.type === "CALL"){

            let start = currentLine.name[0];
            let end = currentLine.name[1];
            let callName = metaData.code.substr(start,end-start);
            let value = metaData.types[currentLine.value] === undefined ? currentLine.value:metaData.types[currentLine.value];
            
            stack.push({callName,value});


        }

        timelineData.push({
        'Arrays':_.cloneDeep(Arrays),
        'Objects':_.cloneDeep(Objects),
        'LinkedLists':_.cloneDeep(LinkedLists),
        'BinaryTrees':_.cloneDeep(BinaryTrees),
        'DoublyLinkedLists':_.cloneDeep(DoublyLinkedLists),
        'Graphs':_.cloneDeep(Graphs),
        'AllObjects':AllObjects
        });

        stackData.push(_.cloneDeep(stack));
    }

    console.log("fff")
    console.log(timelineData);
    console.log(metaData);

    return{
        type:'GET_TIMELINE_DATA',
        payload:{timelineData,inMatrix,stackData}
    }
}

export function getVisualizerMetaData(lang){
    
    return (dispatch) => {     

        return axios.get(`/api/transpile/${lang === 'Javascript'?'js':'py'}`).then(  
          res => dispatch( {type: 'GET_VISUALIZER_METADATA',payload: res.data.metaData}),
          err => dispatch({ type: 'GET_VISUALIZER_METADATA', payload: null })
        );
    };
}