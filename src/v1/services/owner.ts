import { HttpStatusCode as status } from "../config/status";
import {ownerLoginValidation, ownerRegisterValidation} from "../validators/ownerValidators";
import Owner from "../models/Owner";
import {hashPassword} from "./auth";

export async function validateOwnerRegister(owner: object) {

    const {error} = await ownerRegisterValidation.validate(owner);

    if (error) {
        return {
            status: status.NOT_ACCEPTABLE,
            message: error.message,
            error: error
        };
    }

    return {
        status: status.OK,
        message: 'Owner validated successfully'
    }

}

export async function validateOwnerLogin(owner: object) {

    const {error} = await ownerLoginValidation.validate(owner);

    if (error) {
        return {
            status: status.NOT_ACCEPTABLE,
            message: error.message,
            error: error
        };
    }

    return {
        status: status.OK,
        message: 'Owner validated successfully'
    }

}

export function createOwner(body: object) {
    const owner = new Owner(body);
    owner.password = hashPassword(owner.password);
    return owner;
}

export async function saveOwner(owner: any) {

    try {

        const { email } = owner;

        if (await ownerExist(email)) {

            return {
                status: status.CONFLICT,
                message: `User already exist with email ${email}`
            };
        }

        // Save user into de database
        const data = await owner.save();

        return { status: status.CREATED, data: data };

    } catch (err) {

        return {
            status: status.INTERNAL_SERVER_ERROR,
            message: err.message,
            error: err
        };
    }

}

export async function ownerExist(email: string) {
    return Owner.findOne({ email: email }).select('+password');
}



