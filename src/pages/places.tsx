import { gql, useQuery } from "@apollo/client";
import {
  faBan,
  faPause,
  faPlay,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { getLocation } from "../__generated__/getLocation";

const GET_LOCATION = gql`
  query getLocation {
    getLocation {
      ok
      error
      locations {
        id
        locationName
        places {
          id
          placeName
          inUse
          isAvailable
        }
      }
    }
  }
`;

interface IForm {
  query: string;
}

export const Places = () => {
  const history = useHistory();
  const { data, loading } = useQuery<getLocation>(GET_LOCATION);
  const { handleSubmit, getValues, register } = useForm<IForm>();

  return (
    <div className="background flexBox">
      <Helmet>
        <title>Booking - Places</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center w-full min-h-full">
        {loading ? (
          <span className="loading">Loading...</span>
        ) : (
          <div className="bookingList">
            <span className="title">Places</span>
            <div className="pt-4">
              <form
                onSubmit={handleSubmit(() => {
                  const { query } = getValues();
                  history.push({
                    pathname: "/search-place",
                    search: `?term=${query}`,
                  });
                })}
              >
                <input
                  type="search"
                  name="query"
                  ref={register()}
                  placeholder="Search Team..."
                  className="input bg-coolGray-900 border-none w-full rounded-md text-coolGray-200"
                  autoFocus
                />
              </form>
            </div>
            {data?.getLocation.locations &&
              data.getLocation.locations.map((location, index) => (
                <div className="searchList px-0 bg-coolGray-800" key={index}>
                  <div className="text-4xl">{location.locationName}</div>
                  {location.places?.map((place, index) => (
                    <div
                      className="cursor-pointer searchList mb-0"
                      onClick={() => {
                        history.push(`/place/${place.id}`);
                      }}
                      key={index}
                    >
                      <div className="text-3xl">{place.placeName}</div>
                      <div className="mt-8">
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
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
