import React, { useEffect, useState } from "react";
export const LIMIT = 10;
export const APIURL = "https://www.balldontlie.io/api/v1/players";
export type TTeam = {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
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
function usePlayer() {
  const [players, setPlayers] = useState<TPlayer[]>([]);
  const [playerMeta, setplayerMeta] = useState<TPlayerMeta>({
    current_page: 1,
    next_page: 2,
    per_page: 10,
    total_count: 5206,
    total_pages: 521,
  });
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState<any>(null);
  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);
      try {
        const response = await fetch(`${APIURL}?per_page=${LIMIT}`);
        const data = await response.json();
        setLoading(false);
        setPlayers([...data.data]);
        // setPlayers((prev) => [...prev, ...data.data]);
        setplayerMeta(data.meta);
        setError(null);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    }
    fetchPlayers();
  }, []);

  return {
    playerError: Error,
    playerLoading: loading,
    players,
    playerMeta,
    setPlayers,
  };
}

export default usePlayer;
