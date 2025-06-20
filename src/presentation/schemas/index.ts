import { gql } from "apollo-server-express";
import clientTypeDefs from "./client.schema";
import productTypeDefs from "./product.schema";
import saleTypeDefs from "./sale.schema";

const rootTypeDefs = gql`
  type Query
  type Mutation
`;

export default [
  rootTypeDefs, 
  clientTypeDefs, 
  productTypeDefs,
  saleTypeDefs
];