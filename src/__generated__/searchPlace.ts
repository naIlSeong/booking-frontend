/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPlaceInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPlace
// ====================================================

export interface searchPlace_searchPlace_places_placeLocation {
  __typename: "PlaceLocation";
  id: number;
  locationName: string;
}

export interface searchPlace_searchPlace_places {
  __typename: "Place";
  id: number;
  placeName: string;
  inUse: boolean;
  isAvailable: boolean;
  placeLocation: searchPlace_searchPlace_places_placeLocation;
}

export interface searchPlace_searchPlace {
  __typename: "SearchPlaceOutput";
  ok: boolean;
  error: string | null;
  places: searchPlace_searchPlace_places[] | null;
}

export interface searchPlace {
  searchPlace: searchPlace_searchPlace;
}

export interface searchPlaceVariables {
  input: SearchPlaceInput;
}
