import classes from './Input.module.css';
import React from 'react';
const Input=React.forwardRef((props,ref)=>{
    return(<div className={classes.input}>
        <label>{props.label}</label>
        <input id={props.input.id} ref = {ref} {...props.input}/>
    </div>)
})
export default Input;