import classes from "./Input.module.css";
import React from "react";

interface inputProps extends React.HTMLProps<HTMLInputElement> {
    label: string,
    cssClass?: string
}
export default function input({label, className, cssClass, ...rest}: inputProps) {
    return (
        <div className={cssClass}>
            <label htmlFor={rest.id} className={classes.label}>{label}</label>
            <input id={rest.id} {...rest} className={`${classes.input} ${className}`} />
        </div>
    );
}