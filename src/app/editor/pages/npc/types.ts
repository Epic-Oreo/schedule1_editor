



export interface NPCCollectionData {
  DataType: "NPCCollectionData",
  DataVersion: 0,
  GameVersion: string,
  NPCs: []
}

export interface NPCData {
  DataType: "NPCData",
  DataVersion: 0,
  GameVersion: string,
  BaseData: string,
  AdditionalDatas: {
    Name: string,
    Contents: string
  }[]
}