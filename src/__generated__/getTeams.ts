/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTeams
// ====================================================

export interface getTeams_getTeams_teams_members {
  __typename: "User";
  id: number;
}

export interface getTeams_getTeams_teams {
  __typename: "Team";
  id: number;
  teamName: string;
  members: getTeams_getTeams_teams_members[];
}

export interface getTeams_getTeams {
  __typename: "GetTeamsOutput";
  ok: boolean;
  error: string | null;
  teams: getTeams_getTeams_teams[] | null;
}

export interface getTeams {
  getTeams: getTeams_getTeams;
}
