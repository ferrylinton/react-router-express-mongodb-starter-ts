import { object, string, TypeOf } from 'zod';

export const AuthenticateSchema = object({
	username: string().min(3, 'invalid.username').max(20, 'invalid.username'),
	password: string().min(6, 'invalid.password').max(30, 'invalid.password'),
});

export const RegisterSchema = object({
	username: string().min(3, 'invalid.username').max(20, 'invalid.username'),
	email: string().max(50, 'invalid.email').email('invalid.email'),
	password: string().min(6, 'invalid.password').max(30, 'invalid.password'),
	passwordConfirm: string().min(6, 'invalid.passwordConfirm').max(30, 'invalid.passwordConfirm'),
}).refine(data => data.password === data.passwordConfirm, {
	path: ['passwordConfirm'],
	message: 'notMatch.passwordConfirm',
});

export const ResetPasswordSchema = object({
	token: string().min(20, 'invalid.token').max(30, 'invalid.token'),
	password: string().min(6, 'invalid.password').max(30, 'invalid.password'),
	passwordConfirm: string().min(6, 'invalid.passwordConfirm').max(30, 'invalid.passwordConfirm'),
}).refine(data => data.password === data.passwordConfirm, {
	path: ['passwordConfirm'],
	message: 'notMatch.passwordConfirm',
});

export const ForgotPasswordSchema = object({
	email: string().max(50, 'invalid.email').email('invalid.email'),
});

export type AuthenticateType = TypeOf<typeof AuthenticateSchema>;
