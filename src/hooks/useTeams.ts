import PlayerList from "@/Components/PlayerList";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
type TTeam = {
  id: number;
  name: string;
};
export type TPlayer = {
  id: number;
  first_name: string;
  height_feet: null | string | number;
  height_inches: null | string | number;
  last_name: string;
  position: string;
  team: TTeam;
  weight_pounds: null | string | number;
};
export type TPlayerMeta = {
  current_page: number;
  next_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
};
function useTeams() {
  const [data, setData] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState<any>(null);
  const bottomRef = useRef(null);
  const { getLocal, setLocal } = useLocalStorage("data");
  function addTeam() {
    const lastId = data ? data[data?.length - 1].id : 0;
    const newTeam = { id: lastId + 1, name: "hello" };
    setData([...(data ?? []), newTeam]);
    setLocal([...(data ?? []), newTeam]);
  }
  function deleteTeam(id: number) {
    setData(data.filter((team) => team.id !== id));
    setLocal(data.filter((team) => team.id !== id));
  }
  useEffect(() => {
    async function fetchTeams() {
      setLoading(true);
      try {
        const data = getLocal() as TTeam[];
        console.log(data);
        setLoading(false);
        setData(data);
        setError(null);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    }
    fetchTeams();
  }, [getLocal, setLocal]);

  const teams = {
    error: Error,
    loading,
    data,
  };
  return {
    teams,
    deleteTeam,
    addTeam,
    bottomRef,
    setData,
  };
}

export default useTeams;
