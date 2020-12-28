import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { OtherButton } from "../components/button";
import { FormError } from "../components/form-error";
import { useAvailablePlace } from "../hooks/useAvailablePlace";
import { useBooking } from "../hooks/useBooking";
import { useLocation } from "../hooks/useLocation";
import { useMe } from "../hooks/useMe";
import {
  editBooking,
  editBookingVariables,
} from "../__generated__/editBooking";

const EDIT_BOOKING = gql`
  mutation editBooking($input: EditBookingInput!) {
    editBooking(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

interface IForm {
  location: string;
  place: string;
  startAt: string;
  endAt: string;
}

export const EditBooking = () => {
  const history = useHistory();
  const { id: bookingId } = useParams<IParams>();
  const { data: myData, loading: myLoading } = useMe();
  const { data: bookingData, loading: bookingLoading } = useBooking(bookingId);

  //   const [isInvalid, setIsInvalid] = useState(false);

  //   useEffect(() => {
  //     if (!myLoading && !bookingLoading) {
  //       if (myData?.me.id !== bookingData?.bookingDetail.creator?.id) {
  //         setIsInvalid(true);
  //       }
  //       if (bookingData?.bookingDetail.booking?.isFinished === true) {
  //         setIsInvalid(true);
  //       }
  //       if (bookingData?.bookingDetail.booking?.inUse === true) {
  //         setIsInvalid(true);
  //       }
  //     }
  //   }, [myData, bookingData, myLoading, bookingLoading]);

  //   if (isInvalid === true) {
  //     return <NotFound />;
  //   }

  const {
    register,
    getValues,
    handleSubmit,
    formState,
    errors,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const [
    getPlace,
    { data: getAvailablePlaceOutput, loading: getAvailablePlaceLoading },
  ] = useAvailablePlace(+getValues().location);

  const { data: getLocationOutput, loading } = useLocation();

  const onCompleted = (data: editBooking) => {
    const {
      editBooking: { ok },
    } = data;
    if (ok) {
      history.push(`/booking/${bookingData?.bookingDetail.booking?.id}`);
      window.location.reload(false);
    }
  };

  const [
    editBOokingMutation,
    { data: editBookingOutput, loading: editBookingLoading },
  ] = useMutation<editBooking, editBookingVariables>(EDIT_BOOKING, {
    onCompleted,
  });

  const onSubmit = () => {
    const { place, startAt, endAt } = getValues();
    if (bookingData?.bookingDetail.booking) {
      editBOokingMutation({
        variables: {
          input: {
            placeId: +place,
            startAt,
            endAt,
            bookingId: bookingData.bookingDetail.booking.id,
          },
        },
      });
    }
  };
  console.log(bookingData?.bookingDetail.booking?.startAt);
  console.log(bookingData?.bookingDetail.booking?.endAt);

  return (
    <div className="background flexBox h-screen">
      <Helmet>
        <title>Booking - Edit Booking</title>
      </Helmet>
      {bookingLoading && loading ? (
        <span className="loading">Loading...</span>
      ) : (
        <div className="flex flex-col justify-center items-center w-full min-h-full">
          <div className="bookingList">
            <span className="title w-max">Edit Booking</span>

            {/* Time */}
            <form className="">
              <div className="my-4">
                <label htmlFor="place-select" className="bookingTime text-2xl">
                  Start Time
                </label>
                <input
                  ref={register({
                    required: true,
                  })}
                  className="w-full p-2"
                  type="datetime-local"
                  name="startAt"
                  defaultValue={bookingData?.bookingDetail.booking?.startAt}
                />
              </div>
              <div className="my-4">
                <label htmlFor="place-select" className="bookingTime text-2xl">
                  End Time
                </label>
                <input
                  ref={register({
                    required: true,
                  })}
                  className="w-full p-2"
                  type="datetime-local"
                  name="endAt"
                />
              </div>
            </form>

            {/* Location */}
            <form>
              <div>
                <label
                  htmlFor="location-select"
                  className="bookingTime text-2xl"
                >
                  Location
                </label>
              </div>
              <div className="flex justify-between">
                <select
                  id="location-select"
                  name="location"
                  className="w-10/12"
                  ref={register({})}
                >
                  <option value="">=======Select Location=======</option>
                  {getLocationOutput?.getLocation.locations &&
                    getLocationOutput.getLocation.locations.map(
                      (location, index) => (
                        <option value={location.id} key={index}>
                          {location.locationName}
                        </option>
                      )
                    )}
                </select>
                <OtherButton
                  canClick={formState.isDirty}
                  actionText="Search!"
                  onClick={() => getPlace()}
                  type="button"
                />
              </div>
            </form>
            {getAvailablePlaceOutput?.getAvailablePlace.error && (
              <div className="my-4">
                <FormError
                  errorMessage={getAvailablePlaceOutput.getAvailablePlace.error}
                />
              </div>
            )}

            {/* Place */}
            <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="place-select" className="bookingTime text-2xl">
                Place
              </label>
              {getAvailablePlaceLoading ? (
                <div className="w-full text-center font-medium text-2xl text-coolGray-200">
                  Loading...
                </div>
              ) : (
                <div>
                  <div className="flex justify-between">
                    <select
                      id="place-select"
                      name="place"
                      className="w-10/12"
                      ref={register({})}
                    >
                      {getAvailablePlaceOutput?.getAvailablePlace.places ? (
                        <option value="">=====Select Place=====</option>
                      ) : (
                        <option value="">
                          =====Search Location First=====
                        </option>
                      )}

                      {getAvailablePlaceOutput?.getAvailablePlace.places &&
                        getAvailablePlaceOutput.getAvailablePlace.places?.map(
                          (place, index) => (
                            <option value={place.id} key={index}>
                              {place.placeName}
                            </option>
                          )
                        )}
                    </select>
                    <OtherButton
                      canClick={formState.isDirty}
                      actionText="Create!"
                      type="submit"
                    />
                  </div>
                </div>
              )}
            </form>

            {editBookingLoading && (
              <div className="flex w-full justify-center items-center text-xl text-coolGray-200 font-medium py-5">
                Loading...
              </div>
            )}
            {errors.startAt?.type === "required" && (
              <FormError errorMessage="Start time is required" />
            )}
            {errors.endAt?.type === "required" && (
              <FormError errorMessage="End time is required" />
            )}
            {editBookingOutput?.editBooking.error && (
              <FormError errorMessage={editBookingOutput.editBooking.error} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
