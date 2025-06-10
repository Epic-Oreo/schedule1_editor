import { ClothingItem, EmptyItemSlot, SlotFilters, VariableData } from "@/lib/types";

//* The player data is split into multiple files, so each of these types represent one file, 
//* then they are combined into one object for modification.

export interface PlayerData {
  DataType: "PlayerData",
  DataVersion: number;
  GameVersion: string;
  PlayerCode: string;
  Position: {
    x: number;
    y: number;
    z: number;
  };
  Rotation: number;
  IntroCompleted: boolean;
}

export interface PlayerClothing {
  Items: (ClothingItem | EmptyItemSlot)[];
  SlotFilters: SlotFilters;
}

export interface PlayerVariables {
  DataType: "VariableCollectionData",
  DataVersion: number,
  GameVersion: string,
  Variables: VariableData
}

export interface PlayerInventory {
  Items: string[];
  SlotFilters: SlotFilters;
}


//* Combined
export interface CombinedPlayerData {
  Data: PlayerData;
  Inventory: PlayerInventory;
  Clothing: PlayerClothing;
  Variables: PlayerVariables;
  folderName: string;
}

//---

// spell-checker: disable
export interface SteamUser {
  avatarfull: string;
  ban: undefined; // unused
  communityvisibilitystate: number;
  createdAt: string;
  gameid: unknown; // unused
  gameserverip: unknown; // unused
  id: number;
  lastlogoff: unknown // unused
  personaname: string;
  personastate: number;
  profilestate: boolean
  profilestring: string;
  profileurl: string;
  realname: string;
  steamid: string;
  timecreated: number;
  updatedAt: string;
}
// spell-checker: enable