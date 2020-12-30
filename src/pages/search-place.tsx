import { gql, useLazyQuery, useQuery } from "@apollo/client";
import {
  faBan,
  faMapMarkerAlt,
  faPause,
  faPlay,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  searchPlace,
  searchPlaceVariables,
} from "../__generated__/searchPlace";

const SERCH_PLACE = gql`
  query searchPlace($input: SearchPlaceInput!) {
    searchPlace(input: $input) {
      ok
      error
      places {
        id
        placeName
        inUse
        isAvailable
        placeLocation {
          id
          locationName
        }
      }
    }
  }
`;

export const SearchPlace = () => {
  const location = useLocation();
  const history = useHistory();
  const [_, query] = location.search.split("=");
  const { getValues, register, handleSubmit } = useForm();

  const [
    searchPlaceQuery,
    { data: searchOutput, loading: searchLoading },
  ] = useLazyQuery<searchPlace, searchPlaceVariables>(SERCH_PLACE, {
    variables: {
      input: {
        query,
      },
    },
  });

  useEffect(() => {
    if (!query) {
      history.replace("/places");
    }
    searchPlaceQuery({
      variables: {
        input: {
          query,
        },
      },
    });
  }, [history]);

  return (
    <div className="background flexBox">
      <Helmet>
        <title>Booking - Search Place</title>
      </Helmet>
      {searchLoading ? (
        <span className="loading">Loading...</span>
      ) : searchOutput?.searchPlace.places?.length !== 0 ? (
        <div className="flex flex-col justify-center items-center w-full min-h-full">
          <div className="bookingList">
            <span className="title">Places</span>
            <div className="py-4">
              <form
                onSubmit={handleSubmit(() => {
                  const { query } = getValues();
                  history.push({
                    pathname: "/search-place",
                    search: `?term=${query}`,
                  });
                  window.location.reload(false);
                })}
              >
                <input
                  type="search"
                  name="query"
                  ref={register()}
                  placeholder="Search Place..."
                  className="input bg-coolGray-900 border-none w-full rounded-md text-coolGray-200"
                  autoFocus
                />
              </form>
            </div>
            {searchOutput?.searchPlace.places?.map((place, index) => (
              <div className="searchList" key={index}>
                <Link to={`/place/${place.id}`}>
                  <div className="text-3xl hover:underline">
                    {place.placeName}
                  </div>
                </Link>
                <div className="mt-8 ml-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                  <span>{place.placeLocation.locationName}</span>
                </div>
                <div>
                  {place.isAvailable ? (
                    <>
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="text-coolGray-200"
                      />{" "}
                      <span>Available</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faBan}
                        className="text-coolGray-200"
                      />{" "}
                      <span>Not Available</span>
                    </>
                  )}
                </div>
                <div>
                  {place.inUse ? (
                    <>
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="text-coolGray-200"
                      />{" "}
                      <span>In Use Now</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faPause}
                        className="text-coolGray-200"
                      />{" "}
                      <span>Not In Use Now</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-0 pt-0">
          <h1 className="text-9xl text-coolGray-200 font-bold tracking-wide">
            404
          </h1>
          <h4 className="text-3xl text-coolGray-200 font-semibold pb-6 tracking-wide">
            Place Not Found :(
          </h4>
          <h6 className="py-2 text-coolGray-300">
            Sorry, but the place you are looking for is not found.{" "}
          </h6>
          <div className="py-2">
            <form
              onSubmit={handleSubmit(() => {
                const { query } = getValues();
                history.push({
                  pathname: "/search-place",
                  search: `?term=${query}`,
                });
                window.location.reload(false);
              })}
            >
              <input
                type="search"
                name="query"
                ref={register()}
                placeholder="Search Place..."
                className="input bg-coolGray-800 border-none w-full rounded-md text-coolGray-200"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
