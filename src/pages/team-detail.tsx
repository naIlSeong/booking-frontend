import { gql, useMutation } from "@apollo/client";
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
import { FormError } from "../components/form-error";
import { useMe } from "../hooks/useMe";
import { useTeam } from "../hooks/useTeam";
import { UserRole } from "../__generated__/globalTypes";
import { leaveTeam } from "../__generated__/leaveTeam";
import {
  registerMember,
  registerMemberVariables,
} from "../__generated__/registerMember";
import { NotFound } from "./404";

const REGISTER_MEMBER = gql`
  mutation registerMember($input: RegisterMemberInput!) {
    registerMember(input: $input) {
      ok
      error
    }
  }
`;

const LEAVE_TEAM = gql`
  mutation leaveTeam {
    leaveTeam {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const TeamDetail = () => {
  const history = useHistory();
  const { id: teamId } = useParams<IParams>();
  const { data: myData, loading: myLoading } = useMe();
  const { data, loading } = useTeam(teamId);

  const [
    registerMemberMutation,
    { data: registerMemberOutput, loading: registerMemberLoading },
  ] = useMutation<registerMember, registerMemberVariables>(REGISTER_MEMBER, {
    onCompleted: (data: registerMember) => {
      const {
        registerMember: { ok },
      } = data;
      if (ok) {
        window.location.reload(false);
      }
    },
  });

  const [
    leaveTeamMutation,
    { data: leaveTeamOutput, loading: leaveTeamLoading },
  ] = useMutation<leaveTeam>(LEAVE_TEAM, {
    onCompleted: (data: leaveTeam) => {
      const {
        leaveTeam: { ok },
      } = data;
      if (ok) {
        window.location.reload(false);
      }
    },
  });

  const onClick = () => {
    if (data?.teamDetail.team?.id) {
      registerMemberMutation({
        variables: {
          input: {
            teamId: data.teamDetail.team.id,
          },
        },
      });
    }
  };

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
              {myData &&
                myData.me.role === UserRole.Individual &&
                !myData.me.team && (
                  <span
                    className="text-coolGray-200 text-xl font-semibold px-7 py-1.5 ml-auto rounded-lg bg-coolGray-900 hover:bg-black transition-colors duration-500 cursor-pointer"
                    onClick={onClick}
                  >
                    {registerMemberLoading ? "Loading..." : "Join Team"}
                  </span>
                )}
              {myData &&
                data &&
                myData.me.role === UserRole.Member &&
                data.teamDetail.team?.id &&
                myData.me.team?.id &&
                myData.me.team.id === data.teamDetail.team.id && (
                  // ToDo : Exit Team Mutation
                  <span
                    className="text-coolGray-200 text-xl font-semibold px-7 py-1.5 ml-auto rounded-lg bg-red-700 hover:bg-red-800 transition-colors duration-500 cursor-pointer"
                    onClick={() => {
                      leaveTeamMutation({});
                    }}
                  >
                    {leaveTeamLoading ? "Loading..." : "Leave Team"}
                  </span>
                )}
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
            {registerMemberOutput?.registerMember.error && (
              <FormError
                errorMessage={registerMemberOutput.registerMember.error}
              />
            )}
            {leaveTeamOutput?.leaveTeam.error && (
              <FormError errorMessage={leaveTeamOutput.leaveTeam.error} />
            )}
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
