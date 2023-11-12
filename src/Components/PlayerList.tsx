import { TPlayer } from "@/hooks/usePlayer";
import React from "react";

function PlayerList({ player }: { player: TPlayer }) {
  const {
    first_name,
    last_name,
    id,
    position,
    team,
    weight_pounds,
    height_feet,
    height_inches,
  } = player;
  const fullName = `${first_name ?? ""} ${last_name ?? ""}`;
  return (
    <li className="hover:bg-gray-200 justify-content items-center flex gap-2 p-4 bg-neutral-100">
      <p className="flex flex-1">
        {id}. {fullName}
      </p>
      <p className="flex flex-1">Teams {team.name}</p>
      <button className="select-none hover:opacity-90 active:scale-90 bg-blue-500 p-2 rounded-md text-white">
        Update
      </button>
      <button className="select-none hover:opacity-90 active:scale-90 bg-red-500 p-2 rounded-md text-white">
        Delete
      </button>
    </li>
  );
}

export default PlayerList;
