import PlayerList from "@/Components/PlayerList";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const [playerMeta, setplayerMeta] = useState<TPlayerMeta | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState<any>(null);
  const bottomRef = useRef(null);
  const bottomElement = bottomRef.current!;
  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);
      try {
        const response = await fetch(`${APIURL}?page=${1}&per_page=${LIMIT}`);
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
  const handleLoadMore = useCallback(async () => {
    // setPage(page + 1);
    try {
      // setPage(players.length <= total_count_per_page ? page + 1 : page);
      // const lastItem = players[players.length - 1];
      // if(playerMeta?.total_count === players.length)
      // const startIndex = (page - 1) * LIMIT;
      // const endIndex = startIndex + total_count_per_page;
      // const indexOfLastPlayer = page * LIMIT;
      const response = await fetch(`${APIURL}?page=${page}&per_page=${LIMIT}`);
      const data = await response.json();
      // console.log(indexOfLastPlayer);
      // const indexOfFirstPlayer = indexOfLastPlayer - LIMIT;
      // console.log(indexOfFirstPlayer);

      // const currentPlayers = ;
      // const nextOffset = offset + LIMIT;
      // if (players.length < total_count_per_page) {
      // } else {
      //   setPage(page + 1);
      // }
      // Check if there are more items to fetch
      // if (nextOffset < data.meta.total_count) {
      //   setOffset(nextOffset);
      // }
      // if (data.meta.per_page < players.length) {
      //   setPage((prevPage) => prevPage + 1);
      // } else {
      //   console.log("No more pages");
      // }
      //   setLoading(false);
      //   setPlayers([...data.data]); // setPlayers((prev) => [...prev, ...data.data]);
      // setPage(page + 1);
      //   setPlayers([...players, ...data.data]);

      // Set the players
      setPlayers([...players, ...data.data]);
      // setPlayers([...players, ...data.data]);
      setplayerMeta(data.meta);
      setPage(page + 1);
      // if (players.length < total_count_per_page) {
      // } else {
      //   setPage((prev) => prev + 1);
      // }
      setError(null);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      //   setLoading(false);
    }
  }, [page, players]);
  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      console.log(entries);
      if (entries[0].isIntersecting) {
        await handleLoadMore();
      }
    });
    if (!bottomElement) return;
    observer.observe(bottomElement);
    return () => {
      observer.unobserve(bottomElement);
    };
  }, [bottomElement, handleLoadMore]);

  return {
    bottomRef,
    handleLoadMore,
    playerError: Error,
    playerLoading: loading,
    players,
    playerMeta,
    setPlayers,
  };
}

export default usePlayer;
