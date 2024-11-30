import { Db } from 'mongodb';
import { RATE_LIMIT_COLLECTION } from './db-constant';

export const createRateLimitSchema = async (db: Db) => {
	try {
		await db.createCollection(RATE_LIMIT_COLLECTION, {
			validator: {
				$jsonSchema: {
					bsonType: 'object',
					additionalProperties: false,
					properties: {
						_id: {
							bsonType: 'objectId',
						},
						ip: {
							bsonType: 'string',
						},
						count: {
							bsonType: 'int',
						},
						createdAt: {
							bsonType: 'date',
						},
					},
					required: ['ip', 'count', 'createdAt'],
				},
			},
			validationLevel: 'strict',
			validationAction: 'error',
		});

		await db.collection(RATE_LIMIT_COLLECTION).createIndexes([
			{
				name: 'rate_limit_ip_unique',
				unique: true,
				collation: { locale: 'en_US', strength: 2 },
				key: { ip: 1 },
			},
		]);

		await db
			.collection(RATE_LIMIT_COLLECTION)
			.createIndex({ createdAt: 1 }, { expireAfterSeconds: 30 });
	} catch (error) {
		console.log(error);
	}
};
