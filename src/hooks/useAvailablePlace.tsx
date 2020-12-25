import { gql, useLazyQuery } from "@apollo/client";
import {
  getAvailablePlace,
  getAvailablePlaceVariables,
} from "../__generated__/getAvailablePlace";

const GET_AVAILAVLE_PLACE = gql`
  query getAvailablePlace($input: GetAvailablePlaceInput!) {
    getAvailablePlace(input: $input) {
      ok
      error
      places {
        id
        placeName
      }
    }
  }
`;

export const useAvailablePlace = (locationId: number) => {
  return useLazyQuery<getAvailablePlace, getAvailablePlaceVariables>(
    GET_AVAILAVLE_PLACE,
    {
      variables: {
        input: {
          locationId,
        },
      },
    }
  );
};
