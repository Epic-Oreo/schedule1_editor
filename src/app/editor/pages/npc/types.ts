import { Item } from "@/lib/types"




export interface NPCCollectionData {
  DataType: "NPCCollectionData",
  DataVersion: number,
  GameVersion: string,
  NPCs: NPCData[]
}

export interface NPCData {
  DataType: "NPCData",
  DataVersion: number,
  GameVersion: string,
  BaseData: string,
  AdditionalDatas: {
    Name: string,
    Contents: string
  }[],
  position?: number // this might be added by a function to track the list position this npc sits at.
}

export interface NPCBaseData {
  DataType: "NPCData",
  DataVersion: number,
  GameVersion: string,
  ID: string
}

export interface NPCRelationshipData {
  DataType: "RelationshipData",
  DataVersion: number,
  GameVersion: string,
  RelationDelta: number,
  Unlocked: boolean,
  UnlockType: 0 | 1
}

export interface NPCInventoryData {
  Items: Item[],
  SlotFilters: undefined // Will not be using this
}