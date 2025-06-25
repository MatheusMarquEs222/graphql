import { gql } from "@apollo/client";

export const UPDATE_SCHEDULE_STATUS = gql `
    mutation UpdateScheduleStatus($input: UpdateScheduleStatusInput!) {
        updateScheduleStatus(input: $input) {
            id
            status
        }
  }
`;