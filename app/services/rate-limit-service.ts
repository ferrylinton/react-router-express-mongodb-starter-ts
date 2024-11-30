import { ObjectId } from 'mongodb';
import { RATE_LIMIT_COLLECTION } from '../db/db-constant';
import { mapToObject } from '../utils/json-util';
import { getCollection } from '../config/mongodb';

/**
 * A service that handles CRUD operations of RateLimit's data
 * @author ferrylinton
 * @module RateLimitService
 */

/** @typedef {import("mongodb").InsertOneResult} InsertOneResult */
/** @typedef {import("mongodb").UpdateResult} UpdateResult */
/** @typedef {import("mongodb").DeleteResult} DeleteResult */

/**
 * @typedef {Object} RateLimit
 * @property {string} _id - The Id
 * @property {string} task - The task
 * @property {boolean} done - The status of the task
 * @property {date} createdAt - Created date
 * @property {date|null} updatedAt - Updated date
 */

/**
 * Find multiple RateLimit documents
 *
 * @returns Array of {@link RateLimit} documetns.
 *
 */
export const find = async (): Promise<RateLimit[]> => {
	const rateLimitCollection = await getCollection<RateLimit>(RATE_LIMIT_COLLECTION);
	const rateLimits = await rateLimitCollection.find().sort({ createdAt: -1 }).toArray();
	return rateLimits.map(rateLimit => mapToObject(rateLimit));
};

export const count = async (): Promise<number> => {
	const rateLimitCollection = await getCollection<RateLimit>(RATE_LIMIT_COLLECTION);
	return await rateLimitCollection.countDocuments();
};

/**
 * Find a RateLimit document by ID
 *
 * @param {string} _id - The ID of rateLimit document
 * @returns A {@link RateLimit} document
 */
export const findById = async (_id: string) => {
	const rateLimitCollection = await getCollection<RateLimit>(RATE_LIMIT_COLLECTION);
	const rateLimit = await rateLimitCollection.findOne({ _id: new ObjectId(_id) });
	return rateLimit ? mapToObject(rateLimit) : null;
};

export const incrementRateCount = async (ip: string) => {
	const rateLimitCollection = await getCollection<Omit<RateLimit, 'id'>>(RATE_LIMIT_COLLECTION);
	const rateLimit = await rateLimitCollection.findOne({ ip });

	if (rateLimit) {
		await rateLimitCollection.updateOne({ ip }, { $inc: { count: 1 } });

		return rateLimit.count + 1;
	} else {
		const newRateLimit: Omit<RateLimit, 'id'> = {
			ip,
			count: 1,
			createdAt: new Date(),
		};

		await rateLimitCollection.insertOne(newRateLimit);
		return 1;
	}
};
