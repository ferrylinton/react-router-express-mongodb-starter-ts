import { boolean, literal, object, string, z } from 'zod';

const RoleTypeSchema = z.union([z.literal('ADMIN'), z.literal('USER')], {
	message: 'invalid.role',
});

const LockedSchema = z
	.union([z.literal('true'), z.literal('false')], {
		message: 'invalid.locked',
	})
	.transform(value => value === 'true');

export const CreateUserSchema = object({
	username: string().min(3, 'invalid.username').max(20, 'invalid.username'),
	email: string().max(50, 'invalid.email').email('invalid.email'),
	password: string().min(6, 'invalid.password').max(30, 'invalid.password'),
	passwordConfirm: string().min(6, 'invalid.passwordConfirm').max(30, 'invalid.passwordConfirm'),
	role: RoleTypeSchema,
}).refine(data => data.password === data.passwordConfirm, {
	path: ['passwordConfirm'],
	message: 'notMatch.passwordConfirm',
});

export const ChangePasswordSchema = object({
	username: string().min(3, 'invalid.username').max(20, 'invalid.username'),
	password: string().min(6, 'invalid.password').max(30, 'invalid.password'),
	passwordConfirm: string().min(6, 'invalid.passwordConfirm').max(30, 'invalid.passwordConfirm'),
}).refine(data => data.password === data.passwordConfirm, {
	path: ['passwordConfirm'],
	message: 'notMatch.passwordConfirm',
});

export const UpdateUserSchema = object({
	username: string().min(3, 'invalid.username').max(20, 'invalid.username'),
	email: string().max(50, 'invalid.email').email('invalid.email'),
	role: RoleTypeSchema,
	locked: LockedSchema,
}).partial();
