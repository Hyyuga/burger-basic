import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../NavigationItems/ToggleButton/ToggleButton";

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <ToggleButton clicked={props.opened}>MENU</ToggleButton>
        <div className={`${classes.Logo} ${classes.DesktopOnly}`}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default Toolbar;