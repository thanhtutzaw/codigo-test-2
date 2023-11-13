import { TTeam } from "@/hooks/useTeams";
import React, { memo } from "react";

function TeamList({
  deleteTeam,
  team,
  index,
}: {
  deleteTeam: Function;
  team: TTeam;
  index: number;
}) {
  // const { id, full_name, abbreviation, city, conference, division, name } =
  //   team;

  if (!team) return <p>Empty</p>;
  return (
    <>
      <li className=" hover:bg-gray-200 justify-content items-center flex gap-2 p-4 bg-neutral-100">
        <div className="flex flex-1 gap-4">
          <p className="">
            {team.id}. {team?.name}
          </p>
          <p>{team?.city}</p>
        </div>
        {/* <p className="flex flex-1">Teams {team.name}</p> */}
        <button className="select-none hover:opacity-90 active:scale-90 bg-blue-500 p-2 rounded-md text-white">
          Update
        </button>
        <button
          onClick={() => {
            deleteTeam(team.id);
          }}
          className="select-none hover:opacity-90 active:scale-90 bg-red-500 p-2 rounded-md text-white"
        >
          Delete
        </button>
      </li>
    </>
  );
}

export default memo(TeamList);
