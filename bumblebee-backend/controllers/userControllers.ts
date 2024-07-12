import express, {Request, Response} from 'express';

export async function logout(req: Request, res: Response) {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.status(200).json({message: 'Logout successful'});
    });
}