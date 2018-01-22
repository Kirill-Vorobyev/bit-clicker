import React from 'react';
import ReactInterval from 'react-interval';
import Auxilary from '../../../hoc/Auxilary';
import Denom from '../../../hoc/Denom';
import classes from './IdleUpgrade.css';

const idleUpgrade = (props) => {
    let percentFill = (1-((props.nextCost-props.count) / props.nextCost))*100;
    if(percentFill>100){
        percentFill=100;
    }
    const style = {
        'background': 'linear-gradient(90deg, rgb(255, 244, 180) '+percentFill+'%, white '+percentFill+'%)',
        margin: '32px auto',
        paddingLeft: '20px',
        paddingTop: '5px',
        width: '350px',
        height: '110px',
        boxShadow: '3px 5px 5px darkGrey',
        border: '1px solid grey',
    }
    let generating = props.toAdd*(1000/props.interval);
    let nextGenerating = generating * 2;
    if(generating === 0){
        nextGenerating = 1;
    }
    
    let executeInterval = null;
    if(generating>0){
        executeInterval = (
            <ReactInterval timeout={props.interval} enabled={true}
                callback={props.callback} />
            )
    }
    let isOneNG = false;
    let isOneG = false;
    if(nextGenerating === 1){
        isOneNG = true;
    }
    if(generating === 1){
        isOneG = true;
    }
    return (
        <Auxilary>
            <div style={style} onClick={props.clicked}>
                <p className={classes.upgrade}>Generate Bits: <Denom count={nextGenerating} target={props.target}/> {isOneNG ? props.target.slice(0,-1) : props.target} per second</p>
                <p className={classes.cost}>Cost: <Denom count={props.nextCost} target={props.target}/> {props.target} </p>
                <p className={classes.current}>Current: <Denom count={generating} target={props.target}/> {isOneG ? props.target.slice(0,-1) : props.target} per second</p>
            </div>
            {executeInterval}
        </Auxilary>
    );
}

export default idleUpgrade;