/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getLocation
// ====================================================

export interface getLocation_getLocation_locations_places {
  __typename: "Place";
  id: number;
  placeName: string;
  inUse: boolean;
  isAvailable: boolean;
}

export interface getLocation_getLocation_locations {
  __typename: "PlaceLocation";
  id: number;
  locationName: string;
  places: getLocation_getLocation_locations_places[] | null;
}

export interface getLocation_getLocation {
  __typename: "GetLocationOutput";
  ok: boolean;
  error: string | null;
  locations: getLocation_getLocation_locations[] | null;
}

export interface getLocation {
  getLocation: getLocation_getLocation;
}
