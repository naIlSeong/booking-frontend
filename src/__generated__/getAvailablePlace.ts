/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAvailablePlaceInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getAvailablePlace
// ====================================================

export interface getAvailablePlace_getAvailablePlace_places {
  __typename: "Place";
  id: number;
  placeName: string;
}

export interface getAvailablePlace_getAvailablePlace {
  __typename: "GetAvailablePlaceOutput";
  ok: boolean;
  error: string | null;
  places: getAvailablePlace_getAvailablePlace_places[] | null;
}

export interface getAvailablePlace {
  getAvailablePlace: getAvailablePlace_getAvailablePlace;
}

export interface getAvailablePlaceVariables {
  input: GetAvailablePlaceInput;
}
