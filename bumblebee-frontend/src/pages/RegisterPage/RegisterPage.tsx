import Input from '../../components/Input/Input';
import Button from "../../components/Button/Button";
import Toast from "../../components/Toast/Toast";
import {isEmpty} from "../../utility/validation";
import { user, register as registerUser } from "../../models/users";
import classes from "./RegisterPage.module.css";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";


const RegisterPage = function(props: {registerUser: (...fields: {name: string, value: any}[]) => void}) {
    const initialUserData = {city: '', state: '', street1: '', street2: '', email: "", password: '', name: ''};
    const initialErrorData = {city: false, state: false, street1: false, email: false, password: false, name: false};
    const [userInfo, setUserInfo] = useState(initialUserData);
    const [errorInfo, setErrorInfo] = useState(initialErrorData);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('Message');
    const [toastType, setToastType] = useState<'success'|'error'>('success');

    const navigate = useNavigate();
    async function register() {
        let hasError = false;
        for (let [key, value] of Object.entries(userInfo)) {
            if (key !== 'street2' && isEmpty(value)) {
                hasError = true;
                setErrorInfo(prevState => {return {...prevState, [key]: true}})
            }
        }
        console.log(errorInfo);
        if (hasError) return;

        const {email, password, street1, street2, city, state, name} = userInfo;
        const user: user = {email, password, name,
            addresses: [{street1, street2, city, state}]};
        if (street2 === '') delete user.addresses[0].street2;
        console.log(user);
        const data = await registerUser(user);
        if (data.message === 'Register successful') {
            props.registerUser({name: 'role', value: data.role}, {name: 'name', value: data.name});
            navigate('/');
        } else {
            setToastMessage(data.error);
            setToastType('error');
            toast();
        }

    }
    async function cancel() {
        setToastMessage('Cancel');
        setToastType('success');
        toast();
    }
    function toast(action?: () => void) {
        setShowToast(true);
        setTimeout(() =>
        {
            setShowToast(false);
            if(action) action();
            }, 4000);
    }
    function updateUser(event: React.ChangeEvent<HTMLInputElement>) {
        setUserInfo(prevState => {return {...prevState, [event.target.name]: event.target.value };})
    }
    return (
        <div className={`narrow-page`}>
            {showToast && <Toast type={toastType} message={toastMessage}/>}
            <h1>Register Page</h1>
            <Input id='email' label='Email' type='email' cssClass={classes['input-item']} value={userInfo.email} name='email' onChange={updateUser}  />
            <Input id='password' label='Password' type='password' cssClass={classes['input-item']} value={userInfo.password} name='password' onChange={updateUser} />
            <Input id='name' label='Name' cssClass={classes['input-item']} name='name' value={userInfo.name} onChange={updateUser} />
            <Input id='street1' label='Street Address 1' cssClass={classes['input-item']} value={userInfo.street1} name='street1' onChange={updateUser} />
            <Input id='street2' label='Street Address 2' cssClass={classes['input-item']} value={userInfo.street2} name='street2' onChange={updateUser} />
            <Input id='city' label='City' cssClass={classes['input-item']} value={userInfo.city} name='city' onChange={updateUser} />
            <Input id='state' label='State' cssClass={classes['input-item']} value={userInfo.state} name='state' onChange={updateUser} />
            <div>
                <Button label='Cancel' buttonType='light' class={classes.button} onClick={cancel} />
                <Button label='Register' buttonType='dark' class={classes.button} onClick={register} />
            </div>
        </div>
    );
}

export default RegisterPage;