import { gql } from "apollo-server-express"

const scheduleTypeDefs = gql `
    scalar DateTime

    type Schedule {
        id: ID!
        client: Client!
        product: Product!
        sale: Sale!
        scheduledDate: DateTime!
        status: ScheduleStatus!
        createdAt: DateTime!
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