import { gql } from "apollo-server-express";

const clientTypeDefs = gql`
    scalar DateTime

    type Address {
        street: String!
        number: String!
        city: String!
        state: String!
        zip: String!
    }

    type Client {
        id: ID!
        name: String!
        cpf: String!
        rg: String!
        email: String
        phone: String!
        address: Address!
        createdAt: DateTime!
    }

    input CreateAddressClientInput {
        street: String!
        number: String!
        city: String!
        state: String!
        zip: String!
    }

    input CreateClientInput {
        name: String!
        cpf: String!
        rg: String!
        address: CreateAddressClientInput!
        email: String
        phone: String
    }

    input UpdateAddressClientInput {
        street: String
        number: String
        city: String
        state: String
        zip: String
    }

    input UpdateClientInput {
        name: String
        email: String
        phone: String
        address: UpdateAddressClientInput
    }

    type Mutation {
        createClient(input: CreateClientInput!): Client!
        updateClient(id: ID!, input: UpdateClientInput!): Client!
    }

    type Query {
        clients: [Client!]!
    }
`;

export default clientTypeDefs;
