import {Request, Response} from "express";
import { HttpStatusCode as status } from "../../config/status";
import {verifyEmailCode} from "../../services/owner";

export default async function (req: Request, res: Response) {

    if (!req.body.email) {
        return res.send({
            status: status.NOT_ACCEPTABLE,
            message: 'Email is required'
        });
    }

    if (!req.body.code) {
        return res.send({
            status: status.NOT_ACCEPTABLE,
            message: 'Code is required'
        });
    }

    const { email, code } = req.body;

    const response = await verifyEmailCode(email, code);

    if (response.status !== status.OK) {
        return res.send(response);
    }

    res.send(response);

}