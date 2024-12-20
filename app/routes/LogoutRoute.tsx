import { redirect } from 'react-router';
import { logout } from '~/.server/utils/auth-util';
import { Route } from '../+types/root';

export const action = async (_args: Route.ActionArgs) => logout();

export const loader = async () => redirect('/');
