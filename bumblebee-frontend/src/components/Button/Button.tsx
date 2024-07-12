import classes from './Button.module.css';

interface ButtonProps{
    label: string,
    buttonType: 'light' | 'dark',
    class?: string,
    onClick?: () => void,
}
const Button = function (props: ButtonProps) {
    return (
        <button className={`${classes[props.buttonType]} ${props.class}`} onClick={props.onClick}>
            {props.label}
        </button>
    );
}

export default Button;