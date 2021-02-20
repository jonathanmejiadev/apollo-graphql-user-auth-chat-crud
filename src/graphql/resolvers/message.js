import { ApolloError } from 'apollo-server-express';
import chatMessages from '../../utils/chatMesages';

export default {
    Query: {
        getMessages: () => chatMessages
        ,
        getMessage: (_, { id }) => {
            const message = chatMessages.find(msg => msg.id == id);
            if (!message) throw new ApolloError('Id not found', 404);
            return message;
        }
    },
    Mutation: {
        createMessage: (_, { msg }) => {
            const id = chatMessages.length + 1;
            const user = 'User' + id;
            const newMessage = {
                id: id,
                user: user,
                message: msg,
                avatar: null
            }
            chatMessages.push(newMessage);
            return newMessage;
        },
        editMessage: (_, { id, msg }) => {
            let message = chatMessages.find(msg => msg.id == id);
            if (!message) throw new ApolloError('Id not found', 404);
            message['message'] = msg;
            chatMessages[id - 1] = message;
            return message;
        },
        deleteMessage: (_, { id }) => {
            const message = chatMessages.find(msg => msg.id == id);
            if (!message) throw new ApolloError('Id not found', 404);
            chatMessages.splice(id - 1, 1);
            return { message: message, notification: { status: "Message Deleted", success: true } };
        }
    }
};