import { gql, useQuery } from "@apollo/client";
import { getLocationQuery } from "../__generated__/getLocationQuery";

const GET_LOCATION = gql`
  query getLocationQuery {
    getLocation {
      ok
      error
      locations {
        id
        locationName
      }
    }
  }
`;

export const useLocation = () => {
  return useQuery<getLocationQuery>(GET_LOCATION);
};
