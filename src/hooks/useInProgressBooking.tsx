import { gql, useQuery } from "@apollo/client";
import {
  getInProgressBooking,
  getInProgressBookingVariables,
} from "../__generated__/getInProgressBooking";

const GET_IN_PROGRESS = gql`
  query getInProgressBooking($input: GetInProgressBookingInput!) {
    getInProgressBooking(input: $input) {
      ok
      error
      bookings {
        id
        place {
          id
          placeName
          placeLocation {
            id
            locationName
          }
        }
        startAt
        endAt
        isFinished
        inUse
        canExtend
        team {
          id
        }
      }
    }
  }
`;

export const useMyInProgressBooking = () => {
  return useQuery<getInProgressBooking, getInProgressBookingVariables>(
    GET_IN_PROGRESS,
    {
      variables: {
        input: {},
      },
    }
  );
};

export const usePlaceInProgressBooking = (placeId: string) => {
  return useQuery<getInProgressBooking, getInProgressBookingVariables>(
    GET_IN_PROGRESS,
    {
      variables: {
        input: {
          placeId: +placeId,
        },
      },
    }
  );
};
