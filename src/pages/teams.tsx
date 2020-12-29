import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { getTeams } from "../__generated__/getTeams";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { useForm } from "react-hook-form";

const GET_TEAM = gql`
  query getTeams {
    getTeams {
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

interface IForm {
  query: string;
}

export const Teams = () => {
  const history = useHistory();
  const { data: meData, loading: meLoading } = useMe();
  const { data: getTeamsOutput, loading: getTeamsLoading } = useQuery<getTeams>(
    GET_TEAM
  );

  const { getValues, register, handleSubmit } = useForm<IForm>();

  return (
    <div className="background flexbox">
      <Helmet>
        <title>Booking - Teams</title>
      </Helmet>
      {getTeamsLoading && meLoading ? (
        <span className="loading">Loading...</span>
      ) : (
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
            <div className="py-2">
              <form
                onSubmit={handleSubmit(() => {
                  const { query } = getValues();
                  history.push({
                    pathname: "/search-team",
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
            {getTeamsOutput?.getTeams.teams &&
            getTeamsOutput?.getTeams.teams.length !== 0 ? (
              getTeamsOutput.getTeams.teams?.map((team, index) => (
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
                    <FontAwesomeIcon icon={faUserFriends} />{" "}
                    {team.members.length}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center mb-12 mt-4">
                <span className="text-3xl text-coolGray-200 font-semibold tracking-wide mb-6">
                  There is no Team :(
                </span>
                <Link
                  to="/create-team"
                  className="text-coolGray-300 font-light hover:underline"
                >
                  Create new team &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
