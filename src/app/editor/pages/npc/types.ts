import { Item } from "@/lib/types"




export interface NPCCollectionData {
  DataType: "NPCCollectionData",
  DataVersion: number,
  GameVersion: string,
  NPCs: []
}

export interface NPCData {
  DataType: "NPCData",
  DataVersion: number,
  GameVersion: string,
  BaseData: string,
  AdditionalDatas: {
    Name: string,
    Contents: string
  }[]
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