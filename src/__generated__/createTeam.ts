/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTeamInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createTeam
// ====================================================

export interface createTeam_createTeam {
  __typename: "CreateTeamOutput";
  ok: boolean;
  error: string | null;
}

export interface createTeam {
  createTeam: createTeam_createTeam;
}

export interface createTeamVariables {
  input: CreateTeamInput;
}
