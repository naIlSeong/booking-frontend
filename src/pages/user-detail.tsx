import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useParams } from "react-router-dom";
import { getUser, getUserVariables } from "../__generated__/getUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faTag,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

const GET_USER = gql`
  query getUser($input: GetUserInput!) {
    getUser(input: $input) {
      ok
      error
      user {
        id
        username
        role
        team {
          id
          teamName
        }
      }
    }
  }
`;

interface IParam {
  id: string;
}

export const UserDetail = () => {
  const history = useHistory();
  const { id } = useParams<IParam>();
  const { data: userData, loading } = useQuery<getUser, getUserVariables>(
    GET_USER,
    {
      variables: {
        input: {
          userId: +id,
        },
      },
    }
  );

  return (
    <div className="background flexBox">
      <Helmet>
        <title>Booking - User Profile</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center w-full min-h-full">
        {loading ? (
          <span className="loading">Loading...</span>
        ) : userData?.getUser.ok === false ? (
          <>
            <Helmet>
              <title>Booking - Not Found</title>
            </Helmet>
            <h1 className="text-9xl text-coolGray-200 font-bold tracking-wide">
              404
            </h1>
            <h4 className="text-3xl text-coolGray-200 font-semibold pb-6 tracking-wide">
              Not Found :(
            </h4>
            <h6 className="py-2 text-coolGray-300">
              Sorry, but the page you are looking for is not found.{" "}
            </h6>
            <Link to="/" className="text-coolGray-400 hover:underline">
              Home &rarr;
            </Link>
          </>
        ) : (
          <div className="bookingList">
            <div className="flex items-center pb-8">
              <span className="title w-auto pb-0">User Profile</span>
            </div>
            <div className="text-coolGray-200 font-medium grid gap-2 my-4 text-xl">
              <div className="py-1">
                <FontAwesomeIcon icon={faAddressCard} />{" "}
                <span>{userData?.getUser.user?.username}</span>
              </div>
              <div className="py-1">
                <FontAwesomeIcon icon={faTag} />{" "}
                <span>{userData?.getUser.user?.role}</span>
              </div>
              <div className="py-1">
                <FontAwesomeIcon icon={faUserFriends} />{" "}
                {userData?.getUser.user?.team ? (
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => {
                      history.push(`/team/${userData.getUser.user?.team?.id}`);
                    }}
                  >
                    {userData.getUser.user.team.teamName}
                  </span>
                ) : (
                  "No Team"
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
