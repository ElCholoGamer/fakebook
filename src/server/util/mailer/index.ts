import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { resolve } from 'path';

dotenv.config();

const mail = readFileSync(resolve(__dirname, 'template.html')).toString();
const { MAILER_EMAIL = '', MAILER_PASSWORD = '' } = process.env;

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: MAILER_EMAIL,
		pass: MAILER_PASSWORD,
	},
});

const sendCode = (to: string, code: string) =>
	new Promise<any>((resolve, reject) => {
		const options: Mail.Options = {
			from: MAILER_EMAIL,
			to,
			subject: 'Your Coolness100 code',
			html: mail.replace(/%CODE%/g, code),
		};

		transporter.sendMail(options, (err, info) => {
			if (err) reject(err.message);
			else resolve(info);
		});
	});

export default sendCode;
