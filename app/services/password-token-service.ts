import { ObjectId } from 'mongodb';
import { PASSWORD_TOKEN_COLLECTION } from '../db/db-constant';
import { mapToObject } from '../utils/json-util';
import { getCollection } from '../config/mongodb';

export const find = async (): Promise<PasswordToken[]> => {
	const passwordTokenCollection = await getCollection<PasswordToken>(PASSWORD_TOKEN_COLLECTION);
	const passwordTokens = await passwordTokenCollection.find().sort({ createdAt: -1 }).toArray();
	return passwordTokens.map(passwordToken => mapToObject(passwordToken));
};

export const findById = async (id: string) => {
	const passwordTokenCollection = await getCollection<PasswordToken>(PASSWORD_TOKEN_COLLECTION);
	const passwordToken = await passwordTokenCollection.findOne({ _id: new ObjectId(id) });
	return passwordToken ? mapToObject(passwordToken) : null;
};

export const create = async (username: string) => {
	const passwordToken: Omit<PasswordToken, 'id'> = {
		username,
		createdAt: new Date(),
	};
	const passwordTokenCollection =
		await getCollection<Omit<PasswordToken, 'id'>>(PASSWORD_TOKEN_COLLECTION);
	return await passwordTokenCollection.insertOne(passwordToken);
};
