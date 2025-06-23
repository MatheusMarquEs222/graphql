import { gql } from "apollo-server-express";

const saleTypeDefs = gql `
    type SaleItem {
        product: Product!
        quantity: Int!
        price: Float!
    }
    type Sale {
        id : ID!
        client: Client!
        items: [SaleItem!]!
        totalValue: Float!
        saleDate: String!
    }

    input SaleItemInput {
        product: ID!
        quantity: Int!
        price: Float
    }

    input CreateSaleInput {
        client: ID!
        items: [SaleItemInput!]!
    }

    type Mutation {
        createSale(input: CreateSaleInput!): Sale!
    }

    type Query {
        sales: [Sale!]!
    }
`;

export default saleTypeDefs;