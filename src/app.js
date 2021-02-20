import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { IN_PROD } from './config';
import resolvers from './graphql/resolvers/resolvers';
import typeDefs from './graphql/typeDefs/typeDefs';
import AuthMiddleware from './middlewares/auth';
import { schemaDirectives } from './graphql/directives/directives';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Apollo Server'));
app.use(AuthMiddleware);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    playground: !IN_PROD,
    context: ({ req }) => {
        let { isAuth, user } = req;
        return { req, isAuth, user };
    }
});

const startApp = () => {
    //Apollo Middleware
    server.applyMiddleware({ app });
    app.listen(PORT, () => console.log(`Server listen on http://localhost:3000${server.graphqlPath}`));
};

startApp();