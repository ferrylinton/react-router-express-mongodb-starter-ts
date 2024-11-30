import path from 'path';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, errors } = format;

const timestampFormat = timestamp({
	format: new Date().toLocaleString('id-ID', {
		timeZone: 'Asia/Bangkok',
	}),
});

const customFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
	try {
		if (stack) {
			return `${timestamp} [${level}] ${stack}`;
		} else if (
			meta &&
			Object.keys(meta).length &&
			!(meta.server || meta.request || meta.mongodb)
		) {
			return `${timestamp} [${level}] ${message}, ${JSON.stringify(meta)}`;
		} else {
			return `${timestamp} [${level}] ${message}`;
		}
	} catch (error: any) {
		console.error(error);
		return `error on winston, ${error.message}`;
	}
});

const logger = createLogger({
	format: combine(errors({ stack: true })),
	transports: [
		new transports.File({
			level: 'info',
			filename: path.join(process.cwd(), 'logs', 'app.log'),
			handleExceptions: true,
			maxsize: 5242880, // 5MB
			maxFiles: 10,
			format: combine(timestampFormat, customFormat),
		}),
	],
	exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new transports.Console({
			level: 'info',
			format: combine(format.colorize(), timestampFormat, customFormat),
		})
	);
}

export default logger;
