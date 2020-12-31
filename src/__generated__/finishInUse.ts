/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FinishInUseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: finishInUse
// ====================================================

export interface finishInUse_finishInUse {
  __typename: "FinishInUseOutput";
  ok: boolean;
  error: string | null;
}

export interface finishInUse {
  finishInUse: finishInUse_finishInUse;
}

export interface finishInUseVariables {
  input: FinishInUseInput;
}
