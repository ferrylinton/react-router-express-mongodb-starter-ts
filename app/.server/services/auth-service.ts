import * as userService from '~/.server/services/user-service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '~/.server/config/constant';

export const generateToken = async (username: string, password: string) => {
    const user = await userService.findByUsername(username);

    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            if (user.locked) {
                return null;
            }

            const { id, role } = user;
            const token = jwt.sign({ id, role, username }, JWT_SECRET, {
                expiresIn: `${JWT_EXPIRES_IN}m`,
            });
            return { id, role, username, token };
        }
    }

    return null
}