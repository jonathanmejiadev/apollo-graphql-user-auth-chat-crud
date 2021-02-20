import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        getUsers: [User!]! @isAuth
        loginUser(username: String!, password: String!): AuthResponse!
    }

    extend type Mutation {
        registerUser(newUser: UserInput): AuthResponse!
    }

    type User {
        username: String
        email: String
        password: String
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    type AuthResponse {
        user: User!
        token: String!
    }
`;