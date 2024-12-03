import { Db } from 'mongodb';
import { USER_COLLECTION } from './db-constant';

export const createUserSchema = async (db: Db) => {
	try {
		await db.createCollection(USER_COLLECTION, {
			validator: {
				$jsonSchema: {
					bsonType: 'object',
					additionalProperties: false,
					properties: {
						_id: {
							bsonType: 'objectId',
						},
						email: {
							bsonType: 'string',
							minLength: 6,
							maxLength: 50,
							description: 'Must be an email and unique',
						},
						username: {
							bsonType: 'string',
							minLength: 3,
							maxLength: 50,
							description: 'Must be a string and unique',
						},
						password: {
							bsonType: 'string',
							minLength: 3,
							maxLength: 100,
							description: 'Must be a string',
						},
						role: {
							bsonType: 'string',
							minLength: 3,
							maxLength: 20,
							description: 'Must be a string',
						},
						locked: {
							bsonType: 'bool',
						},
						createdBy: {
							bsonType: 'string',
						},
						updatedBy: {
							bsonType: 'string',
						},
						createdAt: {
							bsonType: 'date',
						},
						updatedAt: {
							bsonType: 'date',
						},
					},
					required: ['email', 'username', 'password', 'role'],
				},
			},
			validationLevel: 'strict',
			validationAction: 'error',
		});

		await db.collection(USER_COLLECTION).createIndexes([
			{
				name: 'user_email_unique',
				unique: true,
				collation: { locale: 'en_US', strength: 2 },
				key: { email: 1 },
			},
			{
				name: 'user_username_unique',
				unique: true,
				collation: { locale: 'en_US', strength: 2 },
				key: { username: 1 },
			},
		]);
	} catch (error) {
		console.log(error);
	}
};
