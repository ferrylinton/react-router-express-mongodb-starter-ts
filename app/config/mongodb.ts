import {
	ConnectionPoolMonitoringEvent,
	Db,
	Document,
	MongoClient,
	MongoClientOptions,
	TransactionOptions,
} from 'mongodb';
import {
	MONGODB_AUTH_SOURCE,
	MONGODB_DATABASE,
	MONGODB_PASSWORD,
	MONGODB_URL,
	MONGODB_USERNAME,
} from './constant';
import logger from './winston';

const mongoClientOptions: MongoClientOptions = {
	authMechanism: 'DEFAULT',
	authSource: MONGODB_AUTH_SOURCE,
	monitorCommands: true,
	auth: {
		username: MONGODB_USERNAME,
		password: MONGODB_PASSWORD,
	},
};

export const transactionOptions: TransactionOptions = {
	readConcern: { level: 'snapshot' },
	writeConcern: { w: 'majority' },
	readPreference: 'primary',
};

/**
 * @type {Promise<MongoClient>}
 */
let mongoClient: Promise<MongoClient>;

const log = (event: ConnectionPoolMonitoringEvent) => {
	try {
		logger.info(JSON.stringify(event, (_, v) => (typeof v === 'bigint' ? v.toString() : v)));
	} catch (error) {
		logger.error(error);
	}
};

const getMongoClientInstance = () => {
	const instance = new MongoClient(MONGODB_URL, mongoClientOptions);

	instance.on('connectionPoolCreated', log);

	instance.on('connectionPoolReady', log);

	instance.on('connectionCreated', log);

	instance.on('connectionClosed', log);

	instance.on('commandStarted', log);

	return instance;
};

export const getMongoClient = async () => {
	if (mongoClient) {
		return mongoClient;
	} else {
		try {
			mongoClient = getMongoClientInstance().connect();
		} catch (error) {
			logger.error(error);
		}

		return mongoClient;
	}
};

export const getDb = async () => {
	const connection = await getMongoClient();
	return connection.db(MONGODB_DATABASE);
};

export const getCollection = async <TSchema extends Document = Document>(name: string, db?: Db) => {
	if (db) {
		return db.collection<TSchema>(name);
	} else {
		const db = await getDb();
		return db.collection<TSchema>(name);
	}
};
