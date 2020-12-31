/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditBookingInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editBooking
// ====================================================

export interface editBooking_editBooking {
  __typename: "EditBookingOutput";
  ok: boolean;
  error: string | null;
}

export interface editBooking {
  editBooking: editBooking_editBooking;
}

export interface editBookingVariables {
  input: EditBookingInput;
}
