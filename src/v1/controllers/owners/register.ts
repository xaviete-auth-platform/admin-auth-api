import {Request, Response} from "express";
import { HttpStatusCode as status } from "../../config/status";
import {createOwner, saveOwner, validateOwnerRegister} from "../../services/owner";

export default async function (req: Request, res: Response) {

    // * Validate user data
    const validate = await validateOwnerRegister(req.body ? req.body : {});

    if (validate.status !== status.OK) {
        return res.send(validate);
    }

    // * Create object owner
    const owner = createOwner(req.body);

    // * Save owner
    const response = await saveOwner(owner);

    // * Handle response
    if (response.status !== status.CREATED) {
        return res.send(response);
    }

    res.send({ status: status.CREATED, user: response.data });
}