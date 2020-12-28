import { gql, useQuery } from "@apollo/client";
import {
  getComingUpBooking,
  getComingUpBookingVariables,
} from "../__generated__/getComingUpBooking";

const GET_COMING_UP = gql`
  query getComingUpBooking($input: GetComingUpBookingInput!) {
    getComingUpBooking(input: $input) {
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
        team {
          id
        }
      }
    }
  }
`;

export const useMyComingUpBooking = () => {
  return useQuery<getComingUpBooking, getComingUpBookingVariables>(
    GET_COMING_UP,
    {
      variables: {
        input: {},
      },
    }
  );
};

export const usePlaceComingUpBooking = (placeId: string) => {
  return useQuery<getComingUpBooking, getComingUpBookingVariables>(
    GET_COMING_UP,
    {
      variables: {
        input: {
          placeId: +placeId,
        },
      },
    }
  );
};
