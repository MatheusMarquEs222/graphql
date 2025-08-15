import { gql } from "@apollo/client";

export const LOGIN = gql `
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
            refreshToken
            user { id name email role }
        }
    }  
`;

export const REFRESH_TOKEN = gql `
    mutation RefreshToken($token: String!) {
        refreshToken(token: $token) {
            accessToken
            refreshToken
            user { id name email role }
        }
    }
`;