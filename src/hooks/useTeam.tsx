import { gql, useQuery } from "@apollo/client";
import { teamDetail, teamDetailVariables } from "../__generated__/teamDetail";

const TEAM_DETAIL = gql`
  query teamDetail($input: TeamDetailInput!) {
    teamDetail(input: $input) {
      ok
      error
      team {
        id
        teamName
        members {
          id
          username
          role
        }
      }
    }
  }
`;

export const useTeam = (teamId: string) => {
  return useQuery<teamDetail, teamDetailVariables>(TEAM_DETAIL, {
    variables: {
      input: {
        teamId: +teamId,
      },
    },
  });
};
