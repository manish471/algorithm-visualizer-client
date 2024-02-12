import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react'

class ConsoleOuput extends Component {

    constructor(props) {
        super(props);
        this.state={
            stdout:[],
            stderr:[],
            isLoading:false,
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps !== null){

            //For Loader
            this.setState({isLoading:nextProps.isLoading});

            if(nextProps.isLoading && nextProps.output.stdout !== undefined && nextProps.output.stderr !== undefined){
                
                console.log('ppppppppppppppppp')
                console.log(nextProps.output);
                //For Output
                let strout = nextProps.output.stdout;
                let stdout = [];
                for(let i=0;i<strout.length;i++){
                    if(strout[i] === '\n'){
                        stdout.push(<br key={i}/>);
                    }else if(strout[i] === ' '){
                        stdout.push(<span key={i}>&nbsp;</span>)
                    }else{
                        stdout.push(strout[i]);
                    }
                }

                //For Error
                let strerr = nextProps.output.stderr;
                let stderr = [];
                for(let i=0;i<strerr.length;i++){
                    if(strerr[i] === '\n'){
                        stderr.push(<br key={i}/>);
                    }else if(strerr[i] === ' '){
                        stderr.push(<span key={i}>&nbsp;</span>)
                    }else{
                        stderr.push(strerr[i]);
                    }
                }

                this.setState({stdout,stderr});
                setTimeout(() => {
                    this.props.toggleLoader(false); 
                }, 1000);
                

            }
        }
    }
    

    render() {
        if(this.state.isLoading){
            return (
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
                    <CircularProgress/>
                </div>
            )
        }

        return (
            <div className={this.props.scroll__class} style={{width:'96%',height:'100%',fontFamily:'monospace',fontSize:'15px',padding:'10px',overflow:'auto'}}>
                <span style={{color:'#1B5E20',wordWrap: 'break-word'}}>{this.state.stdout}</span>
                <span style={{color:'#B71C1C',wordWrap: 'break-word'}}>{this.state.stderr}</span>
            </div>
        )
    }
}

export default ConsoleOuput;
