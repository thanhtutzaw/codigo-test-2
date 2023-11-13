export function TeamDialog(props: {
  teamModalRef: any;
  setTeamNameError: any;
  teamFormRef: any;
  TeamNameError: any;
  addTeam: any;
  setTeamNameInput: any;
}) {
  const {
    teamModalRef,
    setTeamNameError,
    teamFormRef,
    TeamNameError,
    addTeam,
    setTeamNameInput,
  } = props;
  return (
    <dialog
      className="rounded-md backdrop:bg-black/50"
      ref={teamModalRef}
      onClose={() => {
        teamFormRef.current?.reset();
        setTeamNameError("");
      }}
    >
      <form
        ref={teamFormRef}
        onSubmit={(e) => {
          e.preventDefault();

          if (TeamNameError) {
            return;
          }

          const form = new FormData(e.currentTarget);
          addTeam({
            name: form.get("teamName"),
            city: form.get("city"),
          });
          teamModalRef?.current?.close();
        }}
        className=" min-h-[40vh] h-48 p-4 shadow-md flex flex-col gap-4"
      >
        <header className="flex justify-between items-center">
          <h1 className="font-bold text-blue-500 text-xl">Create New Team</h1>
          <button
            disabled={!!TeamNameError}
            className="disabled:opacity-50 hover:bg-zinc-100 select-none active:scale-95 focus-visible:outline rounded-lg p-2  focus-visible:outline-blue-500"
            type="submit"
          >
            Done
          </button>
        </header>
        <input
          onChange={(e) => {
            const name = e.currentTarget.value;
            setTeamNameInput(name);
          }}
          className="border-b border-solid border-gray-400 p-2"
          type="text"
          name="teamName"
          placeholder="Name"
          required
        />
        <p className="text-red-500">{TeamNameError && TeamNameError}</p>
        <input
          className="border-b border-solid border-gray-400 p-2"
          type="text"
          name="city"
          defaultValue="Yangon"
          placeholder="City"
        />
      </form>
    </dialog>
  );
}
