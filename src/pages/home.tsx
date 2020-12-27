import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { getInProgressBooking } from "../__generated__/getInProgressBooking";
import { getComingUpBooking } from "../__generated__/getComingUpBooking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Countdown from "react-countdown";
import {
  extendInUse,
  extendInUseVariables,
} from "../__generated__/extendInUse";
import { FormError } from "../components/form-error";
import { Helmet } from "react-helmet-async";
import {
  finishInUse,
  finishInUseVariables,
} from "../__generated__/finishInUse";

const GET_IN_PROGRESS = gql`
  query getInProgressBooking {
    getInProgressBooking {
      ok
      error
      bookings {
        id
        place {
          id
          placeName
          placeLocation {
            id
            locationName
          }
        }
        startAt
        endAt
        isFinished
        inUse
        canExtend
        team {
          id
        }
      }
    }
  }
`;
const GET_COMING_UP = gql`
  query getComingUpBooking {
    getComingUpBooking {
      ok
      error
      bookings {
        id
        place {
          id
          placeName
          placeLocation {
            id
            locationName
          }
        }
        startAt
        endAt
        isFinished
        inUse
        team {
          id
        }
      }
    }
  }
`;

const EXTEND_IN_USE = gql`
  mutation extendInUse($input: ExtendInUseInput!) {
    extendInUse(input: $input) {
      ok
      error
    }
  }
`;

const FINISH_IN_USE = gql`
  mutation finishInUse($input: FinishInUseInput!) {
    finishInUse(input: $input) {
      ok
      error
    }
  }
`;

export const Home = () => {
  const {
    data: inProgress,
    loading: inProgressLoading,
  } = useQuery<getInProgressBooking>(GET_IN_PROGRESS);
  const {
    data: comingUp,
    loading: comingUpLoading,
  } = useQuery<getComingUpBooking>(GET_COMING_UP);

  const onCompleted = (data: extendInUse) => {
    const {
      extendInUse: { ok },
    } = data;
    if (ok) {
      window.location.reload(false);
    }
  };

  const [
    extendInUseMutation,
    { data: extendInUseOutput, loading },
  ] = useMutation<extendInUse, extendInUseVariables>(EXTEND_IN_USE, {
    onCompleted,
  });

  const [
    finishInUseMutation,
    { data: finishInUseOutput, loading: finishInUseLoading },
  ] = useMutation<finishInUse, finishInUseVariables>(FINISH_IN_USE, {
    onCompleted: (data: finishInUse) => {
      const {
        finishInUse: { ok },
      } = data;
      if (ok) {
        window.location.reload(false);
      }
    },
  });

  const history = useHistory();

  const editTime = (rawDate: string) => {
    const [rawYear, month, ect] = rawDate.split("-");
    const year = rawYear.slice(0, 2);
    const day = ect.slice(0, 2);
    const [d, minute] = ect.split(":");
    const h = d.slice(3, 5);
    const hour = (parseInt(h) + 9).toString();

    return `${year}/${month}/${day} ${hour}:${minute}`;
  };

  interface IRenderer {
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }

  const renderer = ({ hours, minutes, seconds, completed }: IRenderer) => {
    if (completed) {
      return <span className="text-red-500 font-bold">Finished!</span>;
    } else {
      if (hours === 0 && minutes < 10) {
        return (
          <>
            <span className="text-coolGray-300 font-normal mx-1">
              {hours}h {minutes < 10 ? `0${minutes}` : minutes}m
              {seconds < 10 ? `0${seconds}` : seconds}s
            </span>{" "}
            <span className="text-red-500 font-bold px-2">Can extend!</span>
          </>
        );
      }
      return (
        <span className="text-coolGray-300 font-normal">
          {hours}h {minutes < 10 ? `0${minutes}` : minutes}m{" "}
          {seconds < 10 ? `0${seconds}` : seconds}s
        </span>
      );
    }
  };

  const onClickExtend = (bookingId: number) => {
    if (!loading) {
      extendInUseMutation({
        variables: {
          input: {
            bookingId,
          },
        },
      });
    }
  };

  setInterval(() => window.location.reload(false), 300000);

  return (
    <div className="background flexBox">
      <Helmet>
        <title>Booking</title>
      </Helmet>
      {inProgressLoading && comingUpLoading ? (
        <span className="loading">Loading...</span>
      ) : (
        <div className="flex flex-col justify-center items-center w-full min-h-full">
          <div className="bookingList">
            <span className="title w-max">In progress</span>
            {extendInUseOutput?.extendInUse.error && (
              <div className="pb-5 flex justify-center">
                <FormError errorMessage={extendInUseOutput.extendInUse.error} />
              </div>
            )}
            {inProgress?.getInProgressBooking.bookings?.length !== 0 ? (
              inProgress?.getInProgressBooking.bookings?.map((booking) => (
                <div className="bookingArgs">
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
                        onClick={() => history.push("/my-team")}
                      >
                        With Team
                      </span>
                    )}
                    <span
                      className="px-2 ml-auto rounded-lg bg-red-700 hover:bg-red-900 transition-colors duration-500 cursor-pointer"
                      onClick={() => {
                        if (!finishInUseLoading) {
                          finishInUseMutation({
                            variables: { input: { bookingId: booking.id } },
                          });
                        }
                      }}
                    >
                      {finishInUseLoading ? "Loading" : "Finish"}
                    </span>
                  </div>
                  {finishInUseOutput?.finishInUse.error && (
                    <FormError
                      errorMessage={finishInUseOutput.finishInUse.error}
                    />
                  )}
                  <div className="mb-4 w-auto flex items-center">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-coolGray-200"
                    />{" "}
                    <Countdown date={booking.endAt} renderer={renderer} />
                    {booking.canExtend === true ? (
                      <span
                        className="text-red-600 font-bold cursor-pointer hover:underline ml-auto px-1"
                        onClick={() => onClickExtend(booking.id)}
                      >
                        Extend!
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="text-coolGray-400 py-2">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-coolGray-200"
                    />{" "}
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => history.push(`/place/${booking.place.id}`)}
                    >
                      {booking.place.placeName}
                    </span>
                    <span className="font-semibold text-coolGray-200"> ∙ </span>
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
              <div className="flex flex-col items-center mb-12 mt-4">
                <span className="text-3xl text-coolGray-200 font-semibold tracking-wide mb-6">
                  There is no Booking :(
                </span>
                <Link
                  to="/create-in-use"
                  className="text-coolGray-300 font-light hover:underline"
                >
                  Create InUse booking &rarr;
                </Link>
              </div>
            )}
          </div>
          <div className="bookingList">
            <span className="title w-auto">Coming up next</span>
            {comingUp?.getComingUpBooking.bookings?.length !== 0 ? (
              comingUp?.getComingUpBooking.bookings?.map((booking) => (
                <div className="bookingArgs">
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
                        onClick={() => history.push("/my-team")}
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
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => history.push(`/place/${booking.place.id}`)}
                    >
                      {booking.place.placeName}
                    </span>
                    <span className="font-semibold text-coolGray-200"> ∙ </span>
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
              <div className="flex flex-col items-center mb-12 mt-4">
                <span className="text-3xl text-coolGray-200 font-semibold tracking-wide mb-6">
                  There is no Booking :(
                </span>
                <Link
                  to="/create-booking"
                  className="text-coolGray-300 font-light hover:underline"
                >
                  Create new booking &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
