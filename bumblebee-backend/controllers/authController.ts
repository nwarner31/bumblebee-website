import {NextFunction, Request, Response} from "express";

export async function checkUser(req: Request, res: Response, next: NextFunction) {
    if(!req.session.userEmail) return next(
        {statusCode: 401, status: 'unauthorized', message: 'Not logged in'});
    next();
}