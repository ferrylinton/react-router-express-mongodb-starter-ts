import { Request } from 'express';

export const getClientIp = (req: Request): string => {
	let ipAddress;
	// The request may be forwarded from local web server.
	const forwardedIpsStr = req.header('x-forwarded-for');
	if (forwardedIpsStr) {
		// 'x-forwarded-for' header may return multiple IP addresses in
		// the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
		// the first one
		const forwardedIps = forwardedIpsStr.split(',');
		ipAddress = forwardedIps[0];
	}
	if (!ipAddress) {
		// If request was not forwarded
		ipAddress = req.socket.remoteAddress;
	}
	return ipAddress || '127.0.0.1';
};
