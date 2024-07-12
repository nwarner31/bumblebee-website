import Input from '../../components/Input/Input';
import Button from "../../components/Button/Button";
import Toast from "../../components/Toast/Toast";
import classes from "./LoginPage.module.css";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {login as userLogin} from "../../models/users";

const LoginPage = function(props: {loginUser: (...fields: {name: string, value: any}[]) => void}) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('Message');
    const [toastType, setToastType] = useState<'success'|'error'>('success');

    const navigate = useNavigate();

    async function login() {
        let hasError = false;
        if (email.trim() === '' || password.trim() === '') {
            hasError = true;
        }
        if (hasError) {
            toast();
            return;
        }
        const data = await userLogin(email, password);
        if(data.message === 'Login successful') {
            props.loginUser({name: 'role', value: data.role}, {name: 'name', value: data.name});
            setToastMessage('Login successful');
            setToastType('success');
            toast(() => navigate('/'));

        } else {
            setToastMessage(data.error);
            setToastType('error');
            toast();
        }
        console.log(data);
        navigate('/');
    }

    function cancel() {

    }

    function toast(action?: () => void) {
        setShowToast(true);
        setTimeout(() =>
        {
            setShowToast(false);
            if(action) action();
            }, 2500);
    }
    return (
            <div className={` narrow-page`}>
                {showToast && <Toast type={toastType} message={toastMessage} />}
                <h1>Login Page</h1>
                <Input id='email' label='Email' value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <Input id='password' name='password' label='Password' type='password' value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <div>
                    <Button label='Cancel' buttonType='light' class={classes.button} />
                    <Button label='Login' buttonType='dark' class={classes.button} onClick={login} />
                </div>
            </div>

    );
}

export default LoginPage;