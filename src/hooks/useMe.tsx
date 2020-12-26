import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../__generated__/meQuery";

const ME = gql`
  query meQuery {
    me {
      id
      username
      role
      studentEmail
      studentId
      team {
        id
        teamName
      }
    }
  }
`;

export const useMe = () => {
  return useQuery<meQuery>(ME);
};
