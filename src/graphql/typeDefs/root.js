import { gql } from 'apollo-server-express';

const root = gql`
    directive @isAuth on FIELD_DEFINITION

    type Query {
        _:String
    }

    type Mutation {
        _:String
    }

    type Subscription {
        _:String
    }
`;

export default root;
