import React from 'react'
import classes from "./ToggleButton.module.css";
import burgerLogo from "../../../../assets/images/burger-logo.png";

const ToggleButton = (props) => {
  return (
    // <>
    //     <button
    //         className={classes.ToggleButton} 
    //         onClick={props.clicked}>
    //          <img src={burgerLogo} alt="MyBurger"/>
    //     </button>
    // </>

    <div className={classes.ToggleButton} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>

  )
}

export default ToggleButton;
