import React from 'react'
import classes from './Input.module.css';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  let validationError = null;

  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
  }

  switch (props.inputtype) {
    case "input":
      inputElement = <input 
                        className={inputClasses.join(" ")} 
                        {...props.elementConfig} 
                        value={props.value}
                        onChange={props.changeHandler}
                        />
      break;
    case "textarea":
      inputElement = <textarea 
                        className={inputClasses.join(" ")} 
                        {...props.elementConfig} 
                        value={props.value}
                        onChange={props.changeHandler}
                        />
      break;
    case "select":
      inputElement = (<select 
                        onChange={props.changeHandler}
                        className={inputClasses.join(" ")} 
                        value={props.value}>
                        {props.elementConfig.options.map(option => (
                          <option key={option.value} value={option.value}>
                              {option.displayValue}
                          </option>
                        ))}
                      </select>)
      break;
  
    default:
      inputElement = <input 
                        onChange={props.changeHandler}
                        className={inputClasses.join(" ")} 
                        {...props.elementConfig} 
                        value={props.value}
                        />
                      
      break;
  }
  
  return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {validationError}
    </div>
  )
}

export default Input
