import React from "react";

function TeamList({
  deleteTeam,
  t,
  index,
}: {
  deleteTeam: Function;
  t: any;
  index: number;
}) {
  // const { id, full_name, abbreviation, city, conference, division, name } =
  //   team;
  console.log(t);

  // return JSON.stringify(t);
  if (!t) return <p>Empty</p>;
  return (
    <li className="hover:bg-gray-200 justify-content items-center flex gap-2 p-4 bg-neutral-100">
      <p className="flex flex-1">
        {t.id}. {t?.name}
      </p>
      {/* <p className="flex flex-1">Teams {team.name}</p> */}
      <button className="select-none hover:opacity-90 active:scale-90 bg-blue-500 p-2 rounded-md text-white">
        Update
      </button>
      <button
        onClick={() => {
          console.log(t.id);
          deleteTeam(t.id);
        }}
        className="select-none hover:opacity-90 active:scale-90 bg-red-500 p-2 rounded-md text-white"
      >
        Delete
      </button>
    </li>
  );
}

export default TeamList;
