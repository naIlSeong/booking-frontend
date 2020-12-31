/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getLocationQuery
// ====================================================

export interface getLocationQuery_getLocation_locations {
  __typename: "PlaceLocation";
  id: number;
  locationName: string;
}

export interface getLocationQuery_getLocation {
  __typename: "GetLocationOutput";
  ok: boolean;
  error: string | null;
  locations: getLocationQuery_getLocation_locations[] | null;
}

export interface getLocationQuery {
  getLocation: getLocationQuery_getLocation;
}
