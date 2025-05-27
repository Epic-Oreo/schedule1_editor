export interface GameTimeData {
  DataType: string,
  DataVersion: number,
  GameVersion: string,
  ElapsedDays: number,
  Time: number
}

export interface BaseItem {
  DataType: "ItemData",
  DataVersion: number,
  GameVersion: string,
  ID: string,
  Quantity: number,}

export interface CashItem extends Omit<BaseItem, "DataType"> {
  DataType: "CashData",
  CashBalance?: number
}

export interface DrugItem extends Omit<BaseItem, "DataType"> {
  //! Missing weed data type
  DataType: "WeedData" | "MethData" | "CocaineData"
  PackagingID: "" | "baggie" | "jar" | "brick"
  Quality: "Trash" | "Poor" | "Standard" | "Premium" | "Heavenly"
}

export type Item = BaseItem | CashItem | DrugItem;