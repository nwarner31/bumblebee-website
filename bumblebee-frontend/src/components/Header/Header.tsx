import classes from './Header.module.css';
import {Link} from "react-router-dom";
import {logout as logoutUser} from "../../models/users";
import React from "react";

interface HeaderProps {
    role: string,
    name: string,
    logoutUser: (...fields: {name: string, value: any}[]) => void
}
const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    async function logout() {
        const response = await logoutUser();
        props.logoutUser({name: 'role', value: 'none'}, {name: 'name', value: 'Guest'});
        console.log(response);
    }
    return (
        <header className='full-width primary'>
            <div className={classes.body}>
                <h1 className={`header ${classes.title}`}>Bumblebee</h1>
                <ul className='nav-bar'>
                    {props.role === 'none' &&
                    <>
                        <li className='nav-item'><Link to='/login'>Login</Link></li>
                        <li className='nav-item'><Link to='/register'>Register</Link></li>
                    </>}
                    {props.role !== 'none' &&
                    <>
                        <li className='nav-item'>You are logged in, {props.name}</li>
                        <li className='nav-item' onClick={logout}>Logout</li>
                    </>}


            </ul>
            </div>

        </header>
    );
}

export default Header;