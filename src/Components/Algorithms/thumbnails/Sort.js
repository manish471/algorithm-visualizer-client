import React from 'react'

export default function Sort() {

    function getRandomIntArray(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let arr = [];
        for(let i=0;i<10;i++){
          arr[i] = Math.floor(Math.random() * (max - min) + min);
        }
    
        return arr; 
    }
    

    return (
        <div
          style={{backgroundColor:'#54bd68',display:'flex',justifyContent:'center',alignItems:'flex-end',height:140,maxWidth:330}}
        >
          {getRandomIntArray(60,120).map((item,index)=>{
            return(
              <span key={index} style={{width:'20px',height:`${item}px`,backgroundColor:'#fff',margin:'2px'}}></span>
            )
          })

          }    
        </div>
    )
}
