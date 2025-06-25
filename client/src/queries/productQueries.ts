import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql `
    query GetProducts {
        products {
            description
            id
            maintenanceIntervalDays
            name
            price
        }
    }
`;