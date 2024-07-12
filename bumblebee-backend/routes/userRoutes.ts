import express, {Request, Response} from 'express';
import bcrypt = require('bcryptjs');
import {checkUser} from "../controllers/authController";
const router = express.Router();
const UserModel = require('../models/users');
import {logout} from "../controllers/userControllers";
import {Error} from "mongoose";


const {catchAsync} = require('../utility/error');

router.post('/register', catchAsync (async (req: Request, res: Response) => {
    try {
        const userData = {...req.body};
        if(!userData.password) throw new Error('A password is required');
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        userData.password = hashedPassword;
        const user = new UserModel({...userData});
        await user.save();
        req.session.userEmail = userData.email;
        const role = user.isAdmin ? 'admin' : 'user';
        res.status(200).json({message: 'Register successful', role, name: user.name});
    } catch (err: any) {
        const statusCode = err.name === 'ValidationError' || err.message === 'A password is required' ? 400 : 500;
        res.status(statusCode).json({message: err.message});
    }

}));

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if(!email) throw new Error('No email provided');
        if(!password) throw new Error('No password provided');
        const user = await UserModel.findOne({email}).select('+password');
        console.log(user);
        if (!user) throw new Error('Invalid email or password');
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error('Invalid email or password');
        req.session.userEmail = user.email;
        const role = user.isAdmin ? 'admin' : 'user';
        console.log(email);
        console.log(password);
        res.status(200).json({message: 'Login successful', role, name: user.name});
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }

});

router.post('/logout', checkUser, logout);

module.exports = router;