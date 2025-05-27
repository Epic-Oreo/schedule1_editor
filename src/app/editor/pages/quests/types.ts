import { GameTimeData } from "@/lib/types"


export interface QuestEntryData {
  DataType: "QuestEntryData",
  DataVersion: number,
  GameVersion: string,
  Name: string,
  State: number
}

export interface Quest {
  DataType: "QuestData",
  DataVersion: number,
  GameVersion: string,
  GUID: string,
  State: number,
  IsTracked: boolean,
  Title: string,
  Description: string,
  Expires: boolean,
  ExpiryDate: GameTimeData,
  Entries: QuestEntryData[],
}

export interface ContractProduct {
  ProductID: string,
  Quality: number,
  Quantity: number
}

export interface ContractDeliveryWindow {
  IsEnabled: boolean,
  WindowStartTime: number,
  WindowEndTime: number
}

export interface ContractQuest extends Omit<Quest, "DataType"> {
  DataType: "ContractData",
  CustomerGUID: string,
  Payment: number,
  ProductList: {
    "entries": ContractProduct[]
  },
  DeliveryLocationGUID: string,
  DeliveryWindow: ContractDeliveryWindow,
  PickupScheduleIndex: number,
  AcceptTime: GameTimeData
}

export interface QuestFile {
  DataType: string,
  DataVersion: number,
  GameVersion: string,
  Quests: Quest[],
  Contracts: ContractQuest[],
  DeaddropQuests: Quest[] 
}