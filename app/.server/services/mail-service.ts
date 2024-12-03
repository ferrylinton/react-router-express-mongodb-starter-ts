import fs from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';
import {
	MAIL_HOST,
	MAIL_PASSWORD,
	MAIL_PORT,
	MAIL_USERNAME
} from '../config/constant';
import logger from '../config/winston';

let mailContent: string;

const transporter = nodemailer.createTransport({
	host: MAIL_HOST,
	port: parseInt(MAIL_PORT as string),
	secure: false,
	auth: {
		user: MAIL_USERNAME,
		pass: MAIL_PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export const generateMail = (url: string) => {
	if (!mailContent) {
		const mailFile = path.join(process.cwd(), "templates", "mail.html");
		if (fs.existsSync(mailFile)) {
			mailContent = fs.readFileSync(mailFile, 'utf8');
		} else {
			mailContent = fs.readFileSync(path.join(__dirname, '../templates/mail.html'), 'utf8');
		}

	}

	return mailContent.replace('###url###', url);
};

export const sendMail = async (to: string, html: string) => {
	try {
		const info = await transporter.sendMail({
			from: MAIL_USERNAME,
			to,
			subject: 'Reset Password',
			html,
		});

		logger.info(info);
	} catch (error) {
		logger.error(error);
	}
};
