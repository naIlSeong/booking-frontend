import {
  faChess,
  faChessPawn,
  faCrown,
  faIdBadge,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { useTeam } from "../hooks/useTeam";
import { UserRole } from "../__generated__/globalTypes";
import { NotFound } from "./404";

interface IParams {
  id: string;
}

export const TeamDetail = () => {
  const history = useHistory();
  const { id: teamId } = useParams<IParams>();
  const { data: myData, loading: myLoading } = useMe();
  const { data, loading } = useTeam(teamId);

  return data?.teamDetail.ok === false && data.teamDetail.error ? (
    <NotFound />
  ) : (
    <div className="background flexBox h-screen">
      <Helmet>
        <title>Booking - Team Detail</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center w-full min-h-full">
        {loading ? (
          <span className="loading">Loading...</span>
        ) : (
          <div className="bookingList">
            <div className="flex items-center pb-8">
              <span className="title w-auto pb-0">Team Info</span>
              {!myLoading &&
                myData &&
                data?.teamDetail.team &&
                // eslint-disable-next-line array-callback-return
                data.teamDetail.team.members.map((member, index) => {
                  if (
                    member.role === UserRole.Representative &&
                    member.id === myData.me.id
                  ) {
                    return (
                      <span
                        className="text-coolGray-200 text-xl font-semibold px-7 py-1.5 ml-auto rounded-lg bg-coolGray-900 hover:bg-black transition-colors duration-500 cursor-pointer"
                        onClick={() => {
                          history.push({
                            pathname: "/edit-team",
                            state: { id: data.teamDetail.team?.id },
                          });
                        }}
                        key={index}
                      >
                        Edit
                      </span>
                    );
                  }
                })}
            </div>
            <div className="text-coolGray-200 font-medium grid gap-2 my-4 text-xl">
              <div className="py-1 text-4xl text-coolGray-300">
                <FontAwesomeIcon icon={faIdBadge} /> <span>Team Name</span>
              </div>
              <div className="py-1">
                <FontAwesomeIcon icon={faUserFriends} />{" "}
                <span>{data?.teamDetail.team?.teamName}</span>
              </div>
              <div className="py-1 pt-5 text-4xl text-coolGray-300">
                <FontAwesomeIcon icon={faChess} /> <span>Member</span>
              </div>
              {data?.teamDetail.team?.members ? (
                // eslint-disable-next-line array-callback-return
                data.teamDetail.team.members.map((member, index) => {
                  if (member.role === UserRole.Representative) {
                    return (
                      <div className="py-1" key={index}>
                        <FontAwesomeIcon icon={faCrown} />{" "}
                        <span
                          className="hover:underline cursor-pointer"
                          onClick={() => history.push(`/user/${member.id}`)}
                        >
                          {member.username}
                        </span>
                      </div>
                    );
                  } else if (member.role === UserRole.Member) {
                    return (
                      <div className="py-1" key={index}>
                        <FontAwesomeIcon icon={faChessPawn} />{" "}
                        <span
                          className="hover:underline cursor-pointer"
                          onClick={() => history.push(`/user/${member.id}`)}
                        >
                          {member.username}
                        </span>
                      </div>
                    );
                  }
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
