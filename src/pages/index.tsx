import { TeamDialog } from "@/Components/Dialog/TeamDialog";
import { TeamUpdateDialog } from "@/Components/Dialog/TeamUpdateDialog";
import PlayerList from "@/Components/PlayerList";
import TeamList from "@/Components/TeamList";
import { AuthContext, AuthProps } from "@/context/AuthContext";
import useDebounce from "@/hooks/useDebounce";
import useLocalStorage from "@/hooks/useLocalStorage";
import useTeams, { TTeam } from "@/hooks/useTeams";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { memo, useContext, useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  const {
    bottomRef,
    handleLoadMore,
    playerError,
    playerLoading,
    handleLogout,
    account,
    players,
    playerMeta,
  } = useContext(AuthContext) as AuthProps;
  const router = useRouter();
  useEffect(() => {
    if (!account) {
      // router.push("/login");
    }
  }, [account, router]);
  const { deleteTeam, teams, addTeam, updateTeam } = useTeams();
  const teamModalRef = useRef<HTMLDialogElement>(null);
  const [TeamNameInput, setTeamNameInput] = useState("");
  const { debounceValue } = useDebounce(TeamNameInput);
  const { getLocal } = useLocalStorage("teams");
  const [TeamNameError, setTeamNameError] = useState("");
  useEffect(() => {
    const localTeamData = getLocal() as TTeam[];
    const nameExist = localTeamData.find(
      (team) => team.name.toLowerCase() === debounceValue.toLowerCase()
    );
    if (nameExist) {
      setTeamNameError("Name Already Exist");
      return;
    }
    setTeamNameError("");
  }, [debounceValue, getLocal]);
  const teamFormRef = useRef<HTMLFormElement>(null);
  const teamEditDialog = useRef<HTMLFormElement>(null);
  const [TeamEditForm, setTeamEditForm] = useState<TTeam | null>(null);
  const toggleEditForm = (team: TTeam) => {
    teamEditDialog.current && teamEditDialog.current.showModal();
    setTeamEditForm(team);
  };
  if (!account) return;
  return (
    <main
      className={`max-w-[1129px] min-w-[95vw] min-h-full p-[2rem] pb-0 ${inter.className}`}
    >
      <header className="items-center flex-wrap overflow-hidden sticky top-0 mb-[1rem] flex justify-between rounded-lg shadow-md bg-gray-100 p-4 ">
        <p className="text-blue-500 font-bold">User - {account?.username} </p>
        <button
          className="hover:bg-gray-200 active:bg-gray-200 p-2 rounded-md active:opacity-50 transition-[opacity] duration-75 ease font-bold text-red-500"
          onClick={() => {
            handleLogout?.();
          }}
        >
          Logout
        </button>
      </header>
      <div className="md:flex gap-4 justify-between">
        <section className="min-h-screen min-w-[48%] rounded-lg bg-white ">
          <h2 className="min-h-[60px] items-center shadow-md sticky bg-white top-[65px] flex justify-between p-2 text-blue-500 text-xl my-2">
            <div>Players</div> <div>{players.length > 0 && players.length}</div>
          </h2>
          {playerLoading ? (
            <p className="text-center mt-2 p-2">Loading...</p>
          ) : playerError ? (
            <p>{playerError}</p>
          ) : (
            <ul className="bg-white">
              {players.map((player) => (
                <PlayerList key={player.id} player={player} />
              ))}
              {playerMeta?.next_page && (
                <p
                  ref={bottomRef!}
                  onClick={async () => await handleLoadMore?.()}
                  className="text-center bg-zinc-300 mt-2 p-2"
                >
                  Loading...
                </p>
              )}
            </ul>
          )}
        </section>

        <section className="min-h-screen min-w-[48%]  rounded-lg bg-white  ">
          <h2 className="min-h-[60px] items-center shadow-md sticky bg-white top-[65px] flex justify-between p-2 text-blue-500 text-xl my-2">
            <div>Teams</div>{" "}
            <div>{teams?.data?.length > 0 && teams?.data?.length}</div>
            <button
              onClick={() => {
                teamModalRef.current && teamModalRef.current.showModal();
              }}
              className="active:bg-gray-100 hover:bg-gray-100 rounded-md active:scale-95 transition:all duration-75 ease-in-out active:opacity-90 p-2"
            >
              Create New Team
            </button>
          </h2>
          {teams.loading ? (
            <p className="text-center mt-2 p-2">Loading...</p>
          ) : teams.error ? (
            <p>{teams.error}</p>
          ) : (
            <>
              <ul className="bg-white">
                {teams?.data?.map((team, index) => (
                  <TeamList
                    toggleEditForm={toggleEditForm}
                    deleteTeam={deleteTeam}
                    key={index}
                    index={index}
                    team={team}
                  />
                ))}
              </ul>
              <TeamDialog
                key={TeamNameError}
                teamModalRef={teamModalRef}
                setTeamNameError={setTeamNameError}
                teamFormRef={teamFormRef}
                TeamNameError={TeamNameError}
                addTeam={addTeam}
                setTeamNameInput={setTeamNameInput}
              />
              <TeamUpdateDialog
                key={TeamNameError}
                TeamEditForm={TeamEditForm}
                teamEditDialog={teamEditDialog}
                setTeamNameError={setTeamNameError}
                teamFormRef={teamFormRef}
                TeamNameError={TeamNameError}
                updateTeam={updateTeam}
                setTeamNameInput={setTeamNameInput}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
export default memo(Home);
