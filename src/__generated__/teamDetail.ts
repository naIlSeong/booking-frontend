/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TeamDetailInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: teamDetail
// ====================================================

export interface teamDetail_teamDetail_team_members {
  __typename: "User";
  id: number;
  username: string;
  role: UserRole;
}

export interface teamDetail_teamDetail_team {
  __typename: "Team";
  id: number;
  teamName: string;
  members: teamDetail_teamDetail_team_members[];
}

export interface teamDetail_teamDetail {
  __typename: "TeamDetailOutput";
  ok: boolean;
  error: string | null;
  team: teamDetail_teamDetail_team | null;
}

export interface teamDetail {
  teamDetail: teamDetail_teamDetail;
}

export interface teamDetailVariables {
  input: TeamDetailInput;
}
