/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditTeamInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editTeam
// ====================================================

export interface editTeam_editTeam {
  __typename: "EditTeamOutput";
  ok: boolean;
  error: string | null;
}

export interface editTeam {
  editTeam: editTeam_editTeam;
}

export interface editTeamVariables {
  input: EditTeamInput;
}
