import { gql, useQuery } from "@apollo/client";
import {
  bookingDetail,
  bookingDetailVariables,
} from "../__generated__/bookingDetail";

const BOOKING_DETAIL = gql`
  query bookingDetail($input: BookingDetailInput!) {
    bookingDetail(input: $input) {
      ok
      error
      booking {
        id
        place {
          id
          placeName
          placeLocation {
            id
            locationName
          }
        }
        team {
          id
          teamName
        }
        creator {
          id
          username
          role
        }
        startAt
        endAt
        inUse
        isFinished
      }
    }
  }
`;

export const useBooking = (bookingId: string) => {
  return useQuery<bookingDetail, bookingDetailVariables>(BOOKING_DETAIL, {
    variables: {
      input: {
        bookingId: +bookingId,
      },
    },
  });
};
