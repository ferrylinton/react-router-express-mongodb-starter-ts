import bcrypt from 'bcryptjs';
import { findUserByUsername } from './user-service';

export const authenticate = async (username: string, password: string): Promise<LoggedUser | string> => {

    const user = await findUserByUsername(username);

    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            if (user.locked) {
                return "usernameIsLocked";
            }

            const { id, role } = user;
            return { id, role, username };
        }
    }

    return "invalidUsernameOrPassword";
}