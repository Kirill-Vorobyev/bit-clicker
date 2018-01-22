import React,{Component} from 'react';
import classes from './TheButton.css';

class TheButton extends Component {
    render(){
        return (
            <input 
            onClick={this.props.clicked}
            className={classes.button} 
            type="button" 
            value="Mine Bit!" />
        );
    }
}

export default TheButton;