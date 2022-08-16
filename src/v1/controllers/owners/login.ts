import {Request, Response} from "express";
import {ownerExist, validateOwnerLogin} from "../../services/owner";
import {HttpStatusCode as status} from "../../config/status";
import {validatePassword} from "../../services/auth";

export default async function(req: Request, res: Response) {

    // * Validate user data
    const validate = await validateOwnerLogin(req.body ? req.body : {});

    if (validate.status !== status.OK) {
        return res.status(validate.status).json(validate);
    }

    const { email, password } = req.body;

    const owner = await ownerExist(email);

    if (!owner) {

        return res.status(status.NOT_ACCEPTABLE).send({
            status: status.NOT_ACCEPTABLE,
            message: 'Invalid credentials. Owner no exist'
        });
    }

    // Validate if password is correct
    if (!validatePassword(password, owner.password.toString())) {

        return res.status(status.NOT_ACCEPTABLE).send({
            status: status.NOT_ACCEPTABLE,
            message: 'Invalid credentials'
        });
    }

    res.status(status.OK).send({
        status: status.OK,
        message: 'Login successfully',
        owner: owner
    });

}