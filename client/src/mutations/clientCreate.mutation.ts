import { gql } from "@apollo/client";

export const CREATE_CLIENT = gql`
  mutation CreateClient($input: CreateClientInput!) {
    createClient(input: $input) {
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

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: ID!, $input: UpdateClientInput!) {
    updateClient(id: $id, input: $input) {
      id
      name
      email
      phone
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
