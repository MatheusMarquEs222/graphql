import { gql } from "apollo-server-express";

const scheduleHistoryTypeDefs = gql `
    scalar DateTime

    type ScheduleHistory {
        id: ID!
        schedule: Schedule!
        status: String!
        updatedAt: DateTime!
    }
    
    type Query {
        scheduleHistories: [ScheduleHistory!]!
    }
`;

export default scheduleHistoryTypeDefs;