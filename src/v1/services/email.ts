import nodemailer from 'nodemailer';
import Code from "../models/VerificationCode";
import {HttpStatusCode as status} from "../config/status";

export async function saveCode(code: number, email: string) {

    try {

        if (await codeExist(email)) {

            const data = await Code.findOneAndUpdate({email: email}, {$set: {code: code}});

            return {
                status: status.CREATED,
                data: data
            }
        }

        const verificationCode = new Code({
            email: email,
            code: code
        });

        const data = await verificationCode.save();

        return {
            status: status.CREATED,
            data: data
        }

    } catch (e) {

        return{
            status: status.INTERNAL_SERVER_ERROR,
            message: e.message,
            error: e
        }
    }
}

export function generateCode() {
    return Math.floor(Math.floor(100000 + Math.random() * 900000));
}

export function createTransport() {

    return nodemailer.createTransport({
        host: 'smtp.ionos.es',
        port: 587,
        auth: {
            user: 'instant-grau@xaviete.com',
            pass: 'RICTIpTAnter'
        }
    });

}

export async function codeExist(email: string) {

    console.log(await Code.findOne({email: email}))

    return Code.findOne({email: email});
}