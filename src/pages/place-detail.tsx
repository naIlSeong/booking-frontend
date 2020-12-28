import { gql, useQuery } from "@apollo/client";
import {
  faBan,
  faClock,
  faMapMarkerAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Countdown from "react-countdown";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  usePlaceComingUpBooking,
  usePlaceInProgressBooking,
} from "../hooks/useConditionalBooking";
import { editTime, placeRenderer } from "../hooks/useTime";
import {
  placeDetail,
  placeDetailVariables,
} from "../__generated__/placeDetail";
import { NotFound } from "./404";

const PLACE_DETAIL = gql`
  query placeDetail($input: PlaceDetailInput!) {
    placeDetail(input: $input) {
      ok
      error
      place {
        id
        placeName
        isAvailable
        inUse
        placeLocation {
          id
          locationName
        }
        bookings {
          id
          team {
            id
            teamName
          }
          startAt
          endAt
          inUse
          isFinished
        }
      }
    }
  }
`;

interface IParam {
  id: string;
}

export const PlaceDetail = () => {
  const history = useHistory();
  const { id } = useParams<IParam>();
  const { data, loading } = useQuery<placeDetail, placeDetailVariables>(
    PLACE_DETAIL,
    {
      variables: {
        input: {
          placeId: +id,
        },
      },
    }
  );
  const {
    data: inProgress,
    loading: inProgressLoading,
  } = usePlaceInProgressBooking(id);
  const { data: comingUp, loading: comingUpLoading } = usePlaceComingUpBooking(
    id
  );

  return !data ? (
    <NotFound />
  ) : (
    <div className="background flexBox">
      <Helmet>
        <title>Booking - Place Detail</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center w-full min-h-full">
        {loading ? (
          <span className="loading">Loading...</span>
        ) : (
          <div className="bookingList">
            <div className="flex justify-between items-center pb-4">
              <span className="title w-max pb-0">
                {data.placeDetail.place?.placeName}
              </span>
            </div>
            <div className="text-coolGray-200 font-semibold pt-6 pb-2">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-coolGray-200"
              />{" "}
              <span
                className="hover:underline cursor-pointer"
                onClick={() =>
                  history.push(
                    `/location/${data.placeDetail.place?.placeLocation.id}`
                  )
                }
              >
                {data.placeDetail.place?.placeLocation.locationName}
              </span>
            </div>
            <div className="text-coolGray-200 font-semibold py-2">
              {data.placeDetail.place?.isAvailable === true ? (
                <>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="text-coolGray-200"
                  />{" "}
                  <span>Available!</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faBan} className="text-coolGray-200" />{" "}
                  <span>Not Available</span>
                </>
              )}
            </div>
            <span className="title w-max pt-16 text-4xl">In progress</span>
            <div className="flex flex-col items-center mb-12 mt-4">
              {inProgressLoading ? (
                <span className="text-white text-2xl font-semibold tracking-wider pt-5 pb-8">
                  Loading...
                </span>
              ) : inProgress?.getBooking.bookings?.length !== 0 ? (
                inProgress?.getBooking.bookings?.map((booking, index) => (
                  <div className="bookingArgs mb-0" key={index}>
                    <div className="bookingTime">
                      <span
                        className="hover:underline cursor-pointer"
                        onClick={() => history.push(`/booking/${booking.id}`)}
                      >
                        {editTime(booking.startAt)} ~ {editTime(booking.endAt)}
                      </span>
                      {booking.team?.id && (
                        <span
                          className="px-2 ml-3 rounded-lg bg-coolGray-700 cursor-pointer"
                          onClick={() =>
                            history.push(`/team/${booking.team?.id}`)
                          }
                        >
                          With Team
                        </span>
                      )}
                    </div>
                    <div className="mb-4 w-auto flex items-center">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-coolGray-200"
                      />{" "}
                      <Countdown
                        date={booking.endAt}
                        renderer={placeRenderer}
                      />
                    </div>
                    <div className="text-coolGray-400 py-2">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-coolGray-200"
                      />{" "}
                      <span>{booking.place.placeName}</span>
                      <span className="font-semibold text-coolGray-200">
                        {" "}
                        ∙{" "}
                      </span>
                      <span
                        className="hover:underline cursor-pointer"
                        onClick={() =>
                          history.push(
                            `/location/${booking.place.placeLocation.id}`
                          )
                        }
                      >
                        {booking.place.placeLocation.locationName}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <span className="text-3xl text-coolGray-200 font-semibold tracking-wide mb-6">
                    There is no Booking :(
                  </span>
                  {data.placeDetail.place?.isAvailable === true ? (
                    <Link
                      to="/create-in-use"
                      className="text-coolGray-300 font-light hover:underline"
                    >
                      Create inUse booking &rarr;
                    </Link>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
            <span className="title w-max pt-16 text-4xl">Coming up next</span>
            <div className="flex flex-col items-center mb-12 mt-4">
              {comingUpLoading ? (
                <span>Loading...</span>
              ) : comingUp?.getBooking.bookings?.length !== 0 ? (
                comingUp?.getBooking.bookings?.map((booking, index) => (
                  <div className="bookingArgs" key={index}>
                    <div className="bookingTime">
                      <span
                        className="hover:underline cursor-pointer"
                        onClick={() => history.push(`/booking/${booking.id}`)}
                      >
                        {editTime(booking.startAt)} ~ {editTime(booking.endAt)}
                      </span>
                      {booking.team?.id && (
                        <span
                          className="px-2 ml-3 rounded-lg bg-coolGray-700 cursor-pointer"
                          onClick={() =>
                            history.push(`/team/${booking.team?.id}`)
                          }
                        >
                          With Team
                        </span>
                      )}
                    </div>
                    <div className="text-coolGray-400 py-2">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-coolGray-200"
                      />{" "}
                      <span>{booking.place.placeName}</span>
                      <span className="font-semibold text-coolGray-200">
                        {" "}
                        ∙{" "}
                      </span>
                      <span
                        className="hover:underline cursor-pointer"
                        onClick={() =>
                          history.push(
                            `/location/${booking.place.placeLocation.id}`
                          )
                        }
                      >
                        {booking.place.placeLocation.locationName}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <span className="text-3xl text-coolGray-200 font-semibold tracking-wide mb-6">
                    There is no Booking :(
                  </span>
                  {data.placeDetail.place?.isAvailable === true ? (
                    <Link
                      to="/create-booking"
                      className="text-coolGray-300 font-light hover:underline"
                    >
                      Create new booking &rarr;
                    </Link>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
