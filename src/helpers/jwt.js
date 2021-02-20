import { sign } from 'jsonwebtoken';
import { SECRET } from '../config';

export const provideToken = async (userPayload) => {
    const token = await sign(userPayload, SECRET, { expiresIn: 60 * 60 });
    return `Bearer ${token}`;
};
