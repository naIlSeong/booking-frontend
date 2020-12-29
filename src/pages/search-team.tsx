import { gql, useLazyQuery } from "@apollo/client";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { searchTeam, searchTeamVariables } from "../__generated__/searchTeam";

const SERCH_TEAM = gql`
  query searchTeam($input: SearchTeamInput!) {
    searchTeam(input: $input) {
      ok
      error
      teams {
        id
        teamName
        members {
          id
        }
      }
    }
  }
`;

export const SearchTeam = () => {
  const location = useLocation();
  const history = useHistory();
  const [_, query] = location.search.split("=");
  const { data: meData, loading: meLoading } = useMe();

  const [
    searchTeamQuery,
    { data: searchOutput, loading: searchLoading },
  ] = useLazyQuery<searchTeam, searchTeamVariables>(SERCH_TEAM, {
    variables: {
      input: {
        query: "user",
      },
    },
  });

  useEffect(() => {
    if (!query) {
      history.replace("/teams");
    }
    searchTeamQuery({
      variables: {
        input: {
          query,
        },
      },
    });
  }, [history]);
  console.log(searchOutput);

  const { getValues, register, handleSubmit } = useForm();

  return (
    <div className="background flexBox">
      <Helmet>
        <title>Booking - Search Team</title>
      </Helmet>
      {searchLoading && meLoading ? (
        <span className="loading">Loading...</span>
      ) : searchOutput?.searchTeam.teams?.length !== 0 ? (
        <div className="flex flex-col justify-center items-center w-full min-h-full">
          <div className="bookingList">
            <div className="flex items-center pb-8">
              <span className="title w-auto pb-0">Teams</span>
              {meData?.me && meData.me.team ? (
                <></>
              ) : (
                <span
                  className="text-coolGray-200 text-xl font-semibold px-7 py-1.5 ml-auto rounded-lg bg-coolGray-900 hover:bg-black transition-colors duration-500 cursor-pointer"
                  onClick={() => {
                    history.push("/create-team");
                  }}
                >
                  Create Team
                </span>
              )}
            </div>
            {searchOutput?.searchTeam.teams?.map((team, index) => (
              <div className="searchList" key={index}>
                <div
                  className="pt-1 pb-4 text-3xl hover:underline cursor-pointer"
                  onClick={() => {
                    history.push(`/team/${team.id}`);
                  }}
                >
                  {team.teamName}
                </div>
                <div className="py-1">
                  <FontAwesomeIcon icon={faUserFriends} /> {team.members.length}
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
            Team Not Found :(
          </h4>
          <h6 className="py-2 text-coolGray-300">
            Sorry, but the team you are looking for is not found.{" "}
          </h6>
          <div className="py-2">
            <form
              onSubmit={handleSubmit(() => {
                const { query } = getValues();
                history.push({
                  pathname: "/search-team",
                  search: `?term=${query}`,
                });
                window.location.reload(false);
              })}
            >
              <input
                type="search"
                name="query"
                ref={register()}
                placeholder="Search Team..."
                className="input bg-coolGray-800 border-none w-full rounded-md text-coolGray-200"
                autoFocus
              />
            </form>
          </div>
          {meData?.me && meData.me.team ? (
            <></>
          ) : (
            <div
              className="text-coolGray-200 text-xl font-semibold px-7 py-1.5 mt-6 rounded-lg bg-coolGray-600 hover:bg-black transition-colors duration-500 cursor-pointer"
              onClick={() => {
                history.push("/create-team");
              }}
            >
              Create Team
            </div>
          )}
        </div>
      )}
    </div>
  );
};
