import { readFileSync } from 'fs';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const template = readFileSync('./assets/template.html').toString();
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
			subject: 'Verify your Fakebook account',
			html: template.replace(
				/%URL%/g,
				`http${
					process.env.TS_NODE_DEV
						? '://localhost:5000'
						: 's://elchologamer-fakebook.herokuapp.com'
				}/api/verify?code=${code}`
			),
		};

		transporter.sendMail(options, (err, info) => {
			if (err) reject(err.message);
			else resolve(info);
		});
	});

export default sendCode;
