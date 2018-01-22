import React from 'react';
import ReactInterval from 'react-interval';
import Auxilary from '../../hoc/Auxilary';
import classes from './FlyText.css';

const flyText = (props) => {
    const executeRemove = setTimeout(props.callback,600);
    return(
        <Aux>
            <div className={classes.flyText}>+{props.text}</div>
        </Aux>
    );
};

export default flyText;