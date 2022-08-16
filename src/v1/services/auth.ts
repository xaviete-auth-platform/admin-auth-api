import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import {now} from "mongoose";
import jwt from 'jsonwebtoken';
import {auth} from "../config/auth";
import {HttpStatusCode as status} from "../config/status";

export function hashPassword(password: string) {
    return hashSync(password, genSaltSync(8));
}

export function validatePassword(password: string, hash: string) {
    return compareSync(password, hash);
}

export function createToken(data: any) {

    const payload = {
        id: data._id,
        date: now()
    };

    return jwt.sign(payload, auth.secret);

}