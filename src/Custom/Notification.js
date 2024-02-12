import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


class Notification extends Component {

    constructor(props) {
        super(props);
        this.state={
            open:true
        }
    }

    // componentDidMount(){
    //     if(this.props.msg){
    //         this.setState({open:true});
    //     }
    // }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps.msg){
    //         this.setState({open:true});
    //     }
    // }

    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open:false});
    };


    render() {
        return (
            <div>
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="error" >
                        {this.props.msg}
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}

export default Notification;