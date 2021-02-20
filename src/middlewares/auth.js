import { SECRET } from '../config';
import { verify } from 'jsonwebtoken';
import users from '../utils/user';

const AuthMiddleware = async (req, res, next) => {
    const authHeaders = req.get('Authorization');
    if (!authHeaders) {
        req.isAuth = false;
        return next();
    }
    let token = authHeaders.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = verify(token, SECRET);

    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    let authUser = users.find(user => decodedToken.username === user.username);
    if (!authUser) {
        req.isAuth = false;
        return next();
    }
    req.user = authUser;
    req.isAuth = true;
    return next();
}

export default AuthMiddleware;