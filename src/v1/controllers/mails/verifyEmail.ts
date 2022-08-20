import {Response, Request} from "express";
import {createTransport, generateCode, saveCode} from "../../services/email";
import {HttpStatusCode as status} from "../../config/status";
import {ownerExist} from "../../services/owner";

export default async function (req: Request, res: Response) {

    if (!req.body.email) {
        return res.send({
            status: status.NOT_ACCEPTABLE,
            message: "Email is required"
        });
    }

    const {email} = req.body;

    if (await ownerExist(email)) {

        return res.send({
            status: status.CONFLICT,
            message: `User already exist with email ${email}`
        });

    }

    // * Generate a code
    const code = generateCode();

    // * Create a client to send the email
    const transport = createTransport();

    const mailOptions = {
        from: 'xavigrau09@gmail.com',
        to: email,
        subject: 'Verify your email',
        text: 'That was easy!',
        html: `<div>
                    <h1>Enter this code to verify your account</h1>
                    <h2>${code}</h2>
               </div>
        `
    }

    transport.sendMail(mailOptions, async function (err, info) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        const response = await saveCode(code, email);

        if (response.status !== status.CREATED) {
            res.send(response);
            return;
        }

        res.send({
            status: status.OK,
            message: "Email sent successfully"
        });

    });

}