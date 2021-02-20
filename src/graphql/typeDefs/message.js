import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        getMessages : [Message!]! @isAuth
        getMessage(id: ID!): Message! @isAuth
    }

    extend type Mutation {
        createMessage(msg: String!): Message! @isAuth
        editMessage(id: ID!,msg: String!): Message! @isAuth
        deleteMessage(id: ID!): DeleteNotification! @isAuth
    }

    type Message {
        id: ID
        user: String
        message: String!
        avatar: String
    }

    type MessageNotification {
        status: String!
        success: Boolean!
    }

    type DeleteNotification {
        message: Message
        notification: MessageNotification
    }
`;