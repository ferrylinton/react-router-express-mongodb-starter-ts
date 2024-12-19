import logger from '../config/winston';
import * as userService from '../services/user-service';
import { faker } from '@faker-js/faker';

// use development => select db
// db.users.remove({}) => delete all record

const main = async () => {
	logger.info('[MONGODB] create collection');

	try {
		const admin: CreateUser = {
			username: 'ferrylinton',
			email: 'ferrylinton@gmail.com',
			password: 'password',
			role: 'ADMIN',
		};
		logger.info(JSON.stringify(await userService.createUser(admin)));

		const user: CreateUser = {
			username: 'user',
			email: 'user@gmail.com',
			password: 'password',
			role: 'USER',
		};
		logger.info(JSON.stringify(await userService.createUser(user)));

		for (let i = 0; i < 100; i++) {
			try {
				const user: CreateUser = {
					username: faker.internet.username(),
					email: faker.internet.email(),
					password: faker.internet.password(),
					role: i % 2 === 0 ? 'ADMIN' : 'USER',
				};

				const result = await userService.createUser(user);
				logger.info(JSON.stringify(result));
			} catch (error) {
				console.log(error);
			}
		}
	} catch (error) {
		logger.error(error);
	} finally {
		setTimeout(function () {
			process.exit();
		}, 1000);
	}
};

main();
