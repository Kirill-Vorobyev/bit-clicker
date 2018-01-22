import React from 'react';
import Auxilary from '../../../hoc/Auxilary';
import Denom from '../../../hoc/Denom';
import classes from './ActiveUpgrade.css';

const activeUpgrade = (props) => {
    let percentFill = (1-((props.nextCost-props.count) / props.nextCost))*100;
    if(percentFill>100){
        percentFill=100;
    }
    const style = {
        'background': 'linear-gradient(90deg, rgb(255, 244, 180) '+percentFill+'%, white '+percentFill+'%)',
        margin: '0px auto',
        paddingLeft: '20px',
        paddingTop: '5px',
        width: '350px',
        height: '110px',
        boxShadow: '3px 5px 5px darkGrey',
        border: '1px solid grey',
    }
    let isOne = false;
    if(props.toAdd === 1){
        isOne = true;
    }
    return (
        <Auxilary>
            <div style={style} onClick={props.clicked}>
                <p className={classes.upgrade}>Improve Button: <Denom count={props.toAdd * 2} target={props.target}/> {props.target} per tap</p>
                <p className={classes.cost}>Cost: <Denom count={props.nextCost} target={props.target}/> {props.target} </p>
                <p className={classes.current}>Current: <Denom count={props.toAdd} target={props.target}/> {isOne ? props.target.slice(0,-1) : props.target} per tap</p>
            </div>
        </Auxilary>
    );
}

export default activeUpgrade;