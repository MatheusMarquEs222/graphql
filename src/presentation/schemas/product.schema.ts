import { gql } from "apollo-server-express";

const productTypeDefs = gql`
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        maintenanceIntervalDays: Int!
    }
    
    input CreateProductInput {
        name: String!
        description: String!
        price: Float!
        maintenanceIntervalDays: Int!
    }

    type Mutation {
        createProduct(input: CreateProductInput!): Product!
    }

    type Query {
        products: [Product!]!  
    }
`;

export default productTypeDefs;