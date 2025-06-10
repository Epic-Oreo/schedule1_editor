import { parseEmbeddedJson } from "@/lib/utils";
import { PlayerInventory, SteamUser } from "./types";
import { Item } from "@/lib/types";



export async function getSteamUserData(steamID: string): Promise<SteamUser | null> {
  const response = await fetch(`https://api.findsteamid.com/steam/api/summary/${steamID}`);
  console.log(response);
  const data = ((await response.json()) as SteamUser[])[0];

  if (!data) throw Error("User Info Error");
  return data;
}

export function fetchCashAmount(inventory: PlayerInventory): number | null {

  for (const item of inventory.Items) {
    const parsedItem: Item = parseEmbeddedJson(item);

    if (parsedItem.DataType == "CashData") {
      return parsedItem.CashBalance || null
    } 
  }
  return null;
}