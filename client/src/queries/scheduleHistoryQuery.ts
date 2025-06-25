import { gql } from "@apollo/client";

export const GET_SCHEDULE_HISTORIES = gql `
    query GetScheduleHistories {
        scheduleHistories {
            id
            updatedAt
            status
            schedule {
                id
                scheduledDate
                client {  
                    id
                    name
                    email
                    phone
                }
                product {
                    id      
                    name
                    description 
                }
                sale { 
                    saleDate
                    totalValue
                }
            }
        }
    }
`;