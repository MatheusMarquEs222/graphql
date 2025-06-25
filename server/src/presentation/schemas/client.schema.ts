import { gql } from "apollo-server-express";

const clientTypeDefs = gql`
    scalar DateTime

    type Client {
        id: ID!
        name: String!
        email: String!
        phone: String!
        createdAt: DateTime!
    }

    input CreateClientInput {
        name: String!
        email: String
        phone: String
    }

    type Mutation {
        createClient(input: CreateClientInput!): Client!
    }

    type Query {
        clients: [Client!]!
    }
`;

export default clientTypeDefs;