import { gql } from "apollo-server-express";

const authTypeDefs = gql `
    scalar DateTime

    enum Role { ADMIN MANAGER USER }

    type AuthUser {
        id: ID!
        name: String!
        email: String!
        role: Role!
        createdAt: DateTime!
    }

    type PageInfo {
        page: Int!
        pageSize: Int!
        total: Int!
    }

    type AuthPayload {
        accessToken: String!
        refreshToken: String!
        user: AuthUser!
    }

    input RegisterUserInput {
        name: String!
        email: String!
        password: String!
        role: Role
    }

    input UpdateUserInput {
        name: String
        role: Role
        password: String
    }

    type UsersConnection {
        items: [AuthUser!]!
        pageInfo: PageInfo!
    }

    extend type Query {
        me: AuthUser
        user(id: ID!): AuthUser
        users(page: Int = 1, pageSize: Int = 20, term: String, role: Role): UsersConnection!
    }

    extend type Mutation {
        registerUser(input: RegisterUserInput!): AuthUser!
        login(email: String!, password: String!): AuthPayload!
        refreshToken(token: String!): AuthPayload!
        revokeMySessions: Boolean!
        updateUser(id: ID!, input: UpdateUserInput!): AuthUser!
    }
`;

export default authTypeDefs;