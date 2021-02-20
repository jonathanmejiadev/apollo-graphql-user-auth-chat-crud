import users from '../../utils/user';
import { ApolloError } from 'apollo-server-express';
import { hash, compare } from 'bcryptjs';
import { provideToken } from '../../helpers';
import { UserLoginValidation, UserRegistrationValidation } from '../../validations';

export default {
    Query: {
        getUsers: () => users,
        loginUser: async (_, { username, password }) => {
            try {
                await UserLoginValidation.validate({ username, password }, { abortEarly: false });
                const user = users.find(user => user.username === username);
                if (!user) throw new ApolloError('Incorrect username', 401);
                const passwordMatch = await compare(password, user.password);
                if (!passwordMatch) throw new ApolloError('Incorrect password', 401);
                let token = provideToken(user)
                return { user, token };
            } catch (err) {
                if (err.errors) throw new ApolloError(err.errors, 400);
                else throw new ApolloError(err.message, err.extensions.code || 500);
            }
        }
    },
    Mutation: {
        registerUser: async (_, { newUser }) => {
            try {
                const { username, email, password } = newUser;
                await UserRegistrationValidation.validate({ username, email, password }, { abortEarly: false });
                users.find(user => {
                    if (user.username === username) {
                        throw new ApolloError('Username already taken', 200);
                    } else if (user.email === email) {
                        throw new ApolloError('Email already exists', 200);
                    }
                });
                let user = { ...newUser };
                user.password = await hash(newUser.password, 10);
                users.push(user);
                let token = await provideToken(user);
                return { token, user: user };
            } catch (err) {
                if (err.errors) throw new ApolloError(err.errors, 400)
                else throw new ApolloError(err.message, err.extensions.code || 500);
            }
        }
    }
};
