import { SET_TIMEOUT } from '../config/constant';

export const delay = async () => {
	await new Promise(r => setTimeout(r, SET_TIMEOUT));
};
