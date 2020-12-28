import { gql, useQuery } from "@apollo/client";
import { getBooking, getBookingVariables } from "../__generated__/getBooking";

const GET_BOOKING = gql`
  query getBooking($input: GetBookingInput!) {
    getBooking(input: $input) {
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
  return useQuery<getBooking, getBookingVariables>(GET_BOOKING, {
    variables: {
      input: {
        isInProgress: true,
      },
    },
  });
};
export const usePlaceInProgressBooking = (placeId: string) => {
  return useQuery<getBooking, getBookingVariables>(GET_BOOKING, {
    variables: {
      input: {
        isInProgress: true,
        placeId: +placeId,
      },
    },
  });
};

export const useMyComingUpBooking = () => {
  return useQuery<getBooking, getBookingVariables>(GET_BOOKING, {
    variables: {
      input: {
        isComingUp: true,
      },
    },
  });
};
export const usePlaceComingUpBooking = (placeId: string) => {
  return useQuery<getBooking, getBookingVariables>(GET_BOOKING, {
    variables: {
      input: {
        isComingUp: true,
        placeId: +placeId,
      },
    },
  });
};

export const useMyFinishedBooking = () => {
  return useQuery<getBooking, getBookingVariables>(GET_BOOKING, {
    variables: {
      input: {
        isFinished: true,
      },
    },
  });
};
