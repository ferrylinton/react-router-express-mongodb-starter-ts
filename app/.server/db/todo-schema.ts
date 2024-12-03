import { Db } from 'mongodb';
import { TODO_COLLECTION } from './db-constant';

export const createTodoSchema = async (db: Db) => {
	try {
		await db.createCollection(TODO_COLLECTION, {
			validator: {
				$jsonSchema: {
					bsonType: 'object',
					additionalProperties: false,
					properties: {
						_id: {
							bsonType: 'objectId',
						},
						task: {
							bsonType: 'string',
							minLength: 2,
							maxLength: 100,
							description: 'Must be a string and unique',
						},
						done: {
							bsonType: 'bool',
						},
						createdAt: {
							bsonType: 'date',
						},
						updatedAt: {
							bsonType: 'date',
						},
					},
					required: ['task', 'done', 'createdAt'],
				},
			},
			validationLevel: 'strict',
			validationAction: 'error',
		});

		await db.collection(TODO_COLLECTION).createIndexes([
			{
				name: 'todo_task_unique',
				unique: true,
				collation: { locale: 'en_US', strength: 2 },
				key: { task: 1 },
			},
		]);
	} catch (error) {
		console.log(error);
	}
};
