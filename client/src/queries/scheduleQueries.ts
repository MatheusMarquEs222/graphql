import { gql } from "@apollo/client";

export const GET_SCHEDULES = gql`
    query GetSchedule {
        schedules {
            id
            scheduledDate
            status
            client {
                name
                email
                phone
            }
            product {
                name
                maintenanceIntervalDays
            }
            sale {
                saleDate
            }
        }
    }
`;