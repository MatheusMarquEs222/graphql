import { gql } from "@apollo/client";

export const GET_CLIENTS = gql `
    query GetClients {
        clients {
            email
            id
            name
            phone
            createdAt
        }
    }
`;