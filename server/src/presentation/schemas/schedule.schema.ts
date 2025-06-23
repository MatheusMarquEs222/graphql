import { gql } from "apollo-server-express"

const scheduleTypeDefs = gql `
    type Schedule {
        id: ID!
        client: Client!
        product: Product!
        sale: Sale!
        scheduledDate: String!
        status: ScheduleStatus!
        createdAt: String!
    }

    enum ScheduleStatus {
        pending
        scheduled
        done
        late
    }

    type Query {
        schedules: [Schedule!]!
        schedulesByStatus(status: ScheduleStatus!): [Schedule!]!
        schedulesByClient(clientId: ID!): [Schedule!]!
        schedulesByDateRange(start: String!, end: String!): [Schedule!]!
    }

    input UpdateScheduleStatusInput {
        scheduleId: ID!
        status: ScheduleStatus!
    }

    type Mutation {
        updateScheduleStatus(input: UpdateScheduleStatusInput!): Schedule!
    }
`;

export default scheduleTypeDefs;