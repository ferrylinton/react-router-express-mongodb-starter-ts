type Role = 'ADMIN' | 'USER';

type User = {
	id: string;
	email: string;
	username: string;
	password: string;
	role: Role;
	locked: boolean;
	createdBy: string;
	updatedBy?: string;
	createdAt: Date;
	updatedAt?: Date;
};

type CreateUser = {
	email: string;
	username: string;
	password: string;
	role: Role;
};

type UpdateUser = {
	id: string;
	email: string;
	username: string;
	role: Role;
	locked: boolean;
	updatedBy: string;
	updatedAt: Date;
};

type ChangePassword = {
	username: string;
	password: string;
	updatedBy: string;
	updatedAt: Date;
};
