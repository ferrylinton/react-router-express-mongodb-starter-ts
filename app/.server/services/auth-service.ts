import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '~/.server/config/constant';
import { findUserByUsername } from './user-service';

export const generateToken = async (username: string, password: string): Promise<LoggedUser | string> => {

    const user = await findUserByUsername(username);

    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            if (user.locked) {
                return "usernameIsLocked";
            }

            const { id, role } = user;
            const token = jwt.sign({ id, role, username }, JWT_SECRET, {
                expiresIn: `${JWT_EXPIRES_IN}m`,
            });

            return { id, role, username, token };
        }
    }

    return "invalidUsernameOrPassword";
}