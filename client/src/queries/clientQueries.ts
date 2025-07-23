import { gql } from "@apollo/client";

export const GET_CLIENTS = gql `
    query GetClients {
        clients {
            id
            name
            cpf
            rg
            email
            phone
            createdAt
            address {
                street
                number
                city
                state
                zip
            }
        }
    }
`;