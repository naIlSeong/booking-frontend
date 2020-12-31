/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchTeamInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchTeam
// ====================================================

export interface searchTeam_searchTeam_teams_members {
  __typename: "User";
  id: number;
}

export interface searchTeam_searchTeam_teams {
  __typename: "Team";
  id: number;
  teamName: string;
  members: searchTeam_searchTeam_teams_members[];
}

export interface searchTeam_searchTeam {
  __typename: "SearchTeamOutput";
  ok: boolean;
  error: string | null;
  teams: searchTeam_searchTeam_teams[] | null;
}

export interface searchTeam {
  searchTeam: searchTeam_searchTeam;
}

export interface searchTeamVariables {
  input: SearchTeamInput;
}
