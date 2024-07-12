import classes from './Toast.module.css';

interface ToastProps {
    type: 'success' | 'error',
    message: string
}
const Toast = function(props: ToastProps) {
    return (
        <div className={`${classes.toast} ${classes[props.type]}`}>
            {props.message}
        </div>
    );
}

export default Toast;