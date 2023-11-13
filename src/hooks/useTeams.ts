import { useEffect, useRef, useState } from "react";
import useLocalStorage from "./useLocalStorage";
export const LIMIT = 10;
export const APIURL = "https://www.balldontlie.io/api/v1/players";
// export type TTeam = {
//   id: number;
//   abbreviation: string;
//   city: string;
//   conference: string;
//   division: string;
//   full_name: string;
//   name: string;
// };
export type TTeam = {
  id: number;
  name: string;
};
function useTeams() {
  const [teams, setTeams] = useState<{
    data: TTeam[];
    loading: boolean;
    error: string;
  }>({
    data: [],
    loading: false,
    error: "",
  });
  const bottomRef = useRef(null);
  const data = teams.data;
  const { getLocal, setLocal } = useLocalStorage("data");
  function addTeam() {
    const lastId = data ? data[data?.length - 1].id : 0;
    const newTeam = { id: lastId + 1, name: "hello" };
    setTeams((prev) => ({ ...prev, data: [...teams.data, newTeam] }));
    setLocal([...(data ?? []), newTeam]);
  }
  function deleteTeam(id: number) {
    setTeams((prev) => ({
      ...prev,
      data: data.filter((team) => team.id !== id),
    }));
    setLocal(data.filter((team) => team.id !== id));
  }
  useEffect(() => {
    async function fetchTeams() {
      setTeams((prev) => ({ ...prev, loading: true }));
      setTimeout(() => {
        try {
          const data = getLocal() as TTeam[];
          console.log(data);
          setTeams((prev) => ({ ...prev, data }));
          setTeams((prev) => ({ ...prev, error: "" }));
        } catch (error) {
          setTeams((prev) => ({ ...prev, error: String(error) }));
          console.log(error);
        } finally {
          setTeams((prev) => ({ ...prev, loading: false }));
        }
      }, 1000);
    }
    fetchTeams();
  }, [getLocal, setLocal]);
  return {
    teams,
    deleteTeam,
    addTeam,
    bottomRef,
    setTeams,
  };
}

export default useTeams;
