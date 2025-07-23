// src/queries/productMutations.ts
import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
      maintenanceIntervalDays
    }
  }
`;

export const UPDATE_PRODUCT = gql `
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      price
      maintenanceIntervalDays
    }
  }
`;
