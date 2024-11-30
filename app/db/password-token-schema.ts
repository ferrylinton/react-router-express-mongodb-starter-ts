import { Db } from 'mongodb';
import { PASSWORD_TOKEN_COLLECTION } from './db-constant';

export const createPasswordTokenSchema = async (db: Db) => {
	try {
		await db.createCollection(PASSWORD_TOKEN_COLLECTION, {
			validator: {
				$jsonSchema: {
					bsonType: 'object',
					additionalProperties: false,
					properties: {
						_id: {
							bsonType: 'objectId',
						},
						username: {
							bsonType: 'string',
						},
						createdAt: {
							bsonType: 'date',
						},
					},
					required: ['username', 'createdAt'],
				},
			},
			validationLevel: 'strict',
			validationAction: 'error',
		});

		await db
			.collection(PASSWORD_TOKEN_COLLECTION)
			.createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 });
	} catch (error) {
		console.log(error);
	}
};
