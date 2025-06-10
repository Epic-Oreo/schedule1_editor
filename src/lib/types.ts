export interface GameTimeData {
  DataType: string;
  DataVersion: number;
  GameVersion: string;
  ElapsedDays: number;
  Time: number;
}

export interface BaseItem {
  DataType: "ItemData";
  DataVersion: number;
  GameVersion: string;
  ID: string;
  Quantity: number;
}

export interface EmptyItemSlot extends Omit<BaseItem, "ID"> {
  ID: "";
}

export interface CashItem extends Omit<BaseItem, "DataType"> {
  DataType: "CashData";
  CashBalance?: number;
}

export interface DrugItem extends Omit<BaseItem, "DataType"> {
  //! Missing weed data type
  DataType: "WeedData" | "MethData" | "CocaineData";
  PackagingID: "" | "baggie" | "jar" | "brick";
  Quality: "Trash" | "Poor" | "Standard" | "Premium" | "Heavenly";
}

export interface IntegerItem extends Omit<BaseItem, "DataType"> {
  DataType: "IntegerItemData";
  Value: number;
}

export interface ClothingItem extends Omit<BaseItem, "DataType"> {
  DataType: "ClothingData";
  Color: number;
}

export type Item = BaseItem | CashItem | DrugItem | IntegerItem | ClothingItem;

export interface SlotFilter {
  Type: number;
  ItemIDs: string[];
  AllowedQualities: number[];
}

export type SlotFilters = SlotFilter[];

export interface VariableData {
  DataType: "VariableData";
  DataVersion: number;
  GameVersion: string;
  Name: string;
  Value: number;
}