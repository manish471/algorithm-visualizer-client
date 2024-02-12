import React, { Component } from 'react';


class CodeTracer extends Component {

  constructor(props) {
    super(props);
    this.state={
      code:this.props.code,
      currentStep:[],
    }
    this.autoscrolldown = React.createRef();
  }

  componentDidMount () {
    this.scrollTo()
  }
  componentDidUpdate () {
    this.scrollTo()
  }
  scrollTo = () => {
    if(this.autoscrolldown.current)
      this.autoscrolldown.current.scrollIntoView({ behavior: 'smooth' })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps !== null){
      this.setState({code:nextProps.code});
      if(nextProps.metaData){
        let metaData = JSON.parse(nextProps.metaData);
        let currentStep = metaData.steps[nextProps.step];

        if(currentStep && currentStep.name !== undefined){
          this.setState({currentStep:currentStep.name});
        }
      }
    }
  }
  

  render() {

    const {currentStep} = this.state;

    return (
      <p style={{width:'90%',height:'100%',fontFamily:'monospace',fontSize:'15px'}}>
          {currentStep.length  === 0 ? this.state.code :
          this.state.code.map((item,index)=>{
            

            return ((index >= currentStep[0] && index < currentStep[1])?
                    <span ref={this.autoscrolldown} key={index} style={{color:'#1da',textDecoration:'underline'}}>{item}</span>
                    :
                    <span key={index} style={{color:'#fff'}}>{item}</span>
            )


          })}
      </p>
    )
  }
}

export default CodeTracer;
