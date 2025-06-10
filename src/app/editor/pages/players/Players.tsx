import { useFile } from "@/context/fileContext";
import { useEffect, useState } from "react";
import { CombinedPlayerData } from "./types";
import { relativePath } from "@/lib/utils";
import PlayerCard from "./PlayerCard";


const PlayersPage = () => {
  const [players, setPlayers] = useState<CombinedPlayerData[]>([]);
  const {file} = useFile();


  async function loadPlayerData(playerName: string): Promise<CombinedPlayerData> {
    if (!file) throw Error("File not initialized when it should be!");
    const newPlayer: Partial<CombinedPlayerData> = {};

    //* First Load PlayerData
    newPlayer.Data = JSON.parse(
      await file.file(relativePath(`Players/${playerName}/Player.json`))[0].async("string")
    )
    if (!newPlayer.Data) throw Error(`Failed Loading PlayerData for ${playerName}`);

    //* Then load InventoryData
    newPlayer.Inventory = JSON.parse(
      await file.file(relativePath(`Players/${playerName}/Inventory.json`))[0].async("string")
    )
    if (!newPlayer.Inventory) throw Error(`Failed Loading Inventory Data for ${playerName}`);


    //* Load Variables 
    newPlayer.Variables = JSON.parse(
      await file.file(relativePath(`Players/${playerName}/Variables.json`))[0].async("string")
    )
    if (!newPlayer.Variables) throw Error(`Failed Loading Variable Data for ${playerName}`);


    //* Load Clothing
    newPlayer.Clothing = JSON.parse(
      await file.file(relativePath(`Players/${playerName}/Clothing.json`))[0].async("string")
    )
    if (!newPlayer.Clothing) throw Error(`Failed Loading Clothing Data for ${playerName}`);

    newPlayer.folderName = playerName;

    // newPLayer must be complete because no error was thrown
    return newPlayer as CombinedPlayerData;
  }


  async function loadPlayers() {
    if (!file) return;

    // Regex that checks for the player name in a file path
    const newLocal = /.*\/Players\/(.*)\/.*\.json/gm;
    const knownPlayerNames: string[] = [];
    const knownPlayers: CombinedPlayerData[] = [];

    // search each file in zip for if they match regex 
    for (const fileName of Object.keys(file.files)) {
      const result = newLocal.exec(fileName);
      if (result && !knownPlayerNames.includes(result[1])) {
        knownPlayers.push(await loadPlayerData(result[1]));
        knownPlayerNames.push(result[1]);
      }
    }

    // Throw error if not known players are found
    if (knownPlayers.length == 0) throw Error("Failed to find any player files!");
    setPlayers(knownPlayers);
  }

  useEffect(()=>{
    if (!file) return;
    if (players.length > 0) return;

    loadPlayers()
  }, [file, players])


  if (players.length == 0) {
    return (
      <div className="w-full pt-10 flex justify-center">
        <h2 className="text-foreground/70">Loading...</h2>
      </div>
    )
  }

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
      {players.map((player) => {
        return (
          <PlayerCard key={player.Data.PlayerCode} player={player}/>
        )
      })}
    </div>
  )
}

export default PlayersPage;