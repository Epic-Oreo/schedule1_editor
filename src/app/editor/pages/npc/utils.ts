import { capitalizeFirstLetter, parseEmbeddedJson } from "@/lib/utils"
import { NPCData } from "./types"



export interface NpcInfo {
  Name: string,
  Location: string,
  Type: string,
  "NPC ID": string
}


// big list of NPC names, locations, types, and IDS from https://www.ign.com/wikis/schedule-1/All_NPC_Customer_IDs,_Favorite_Effects,_and_Connections
export const NPC_INFO_DATA: NpcInfo[] = [{"Name":"Kyle Cooley","Location":"Northtown","Type":"Customer","NPC ID":"Kyle_Cooley"},{"Name":"Austin Steiner","Location":"Northtown","Type":"Customer","NPC ID":"Austin_Steiner"},{"Name":"Albert Hoover","Location":"Northtown","Type":"Supplier","NPC ID":"Albert_Hoover"},{"Name":"Jessi Waters","Location":"Northtown","Type":"Customer","NPC ID":"Jessi_Waters"},{"Name":"Kathy Henderson","Location":"Northtown","Type":"Customer","NPC ID":"Kathy_Henderson"},{"Name":"Mick Lubbin","Location":"Northtown","Type":"Customer","NPC ID":"Mick_Lubbin"},{"Name":"Sam Thompson","Location":"Northtown","Type":"Customer","NPC ID":"Sam_Thompson"},{"Name":"Peter File","Location":"Northtown","Type":"Customer","NPC ID":"Peter_File"},{"Name":"Donna Martin","Location":"Northtown","Type":"Customer","NPC ID":"Donna_Martin"},{"Name":"Geraldine Poon","Location":"Northtown","Type":"Customer","NPC ID":"Geraldine_Poon"},{"Name":"Chloe Bowers","Location":"Northtown","Type":"Customer","NPC ID":"Chloe_Bowers"},{"Name":"Peggy Myers","Location":"Northtown","Type":"Customer","NPC ID":"Peggy_Myers"},{"Name":"Benji Coleman","Location":"Northtown","Type":"Dealer","NPC ID":"Benji_Coleman"},{"Name":"Ludwig Meyer","Location":"Northtown","Type":"Customer","NPC ID":"Ludwig_Meyer"},{"Name":"Beth Penn","Location":"Northtown","Type":"Customer","NPC ID":"Beth_Penn"},{"Name":"Mrs. Ming","Location":"Northtown","Type":"Customer","NPC ID":"Ming"},{"Name":"Trent Sherman","Location":"Westville","Type":"Customer","NPC ID":"Trent_Sherman"},{"Name":"Meg Cooley","Location":"Westville","Type":"Customer","NPC ID":"Meg_Cooley"},{"Name":"Joyce Ball","Location":"Westville","Type":"Customer","NPC ID":"Joyce_Ball"},{"Name":"Keith Wagner","Location":"Westville","Type":"Customer","NPC ID":"Keith_Wagner"},{"Name":"Shirley Watts","Location":"Westville","Type":"Supplier","NPC ID":"Shirley_Watts"},{"Name":"Jerry Montero","Location":"Westville","Type":"Customer","NPC ID":"Jerry_Montero"},{"Name":"Doris Lubbin","Location":"Westville","Type":"Customer","NPC ID":"Doris_Lubbin"},{"Name":"Kim Delaney","Location":"Westville","Type":"Customer","NPC ID":"Kim_Delaney"},{"Name":"Dean Webster","Location":"Westville","Type":"Customer","NPC ID":"Dean_Webster"},{"Name":"Molly Presley","Location":"Westville","Type":"Dealer","NPC ID":"Molly_Presley"},{"Name":"Charles Rowland","Location":"Westville","Type":"Customer","NPC ID":"Charles_Rowland"},{"Name":"George Greene","Location":"Westville","Type":"Customer","NPC ID":"George_Greene"},{"Name":"Elizabeth Homley","Location":"Downtown","Type":"Customer","NPC ID":"Elizabeth_Homley"},{"Name":"Jennifer Rivera","Location":"Downtown","Type":"Customer","NPC ID":"Jennifer_Rivera"},{"Name":"Kevin Oakley","Location":"Downtown","Type":"Customer","NPC ID":"Kevin_Oakley"},{"Name":"Louis Fourier","Location":"Downtown","Type":"Customer","NPC ID":"Louis_Fourier"},{"Name":"Lucy Pennington","Location":"Downtown","Type":"Customer","NPC ID":"Lucy_Pennington"},{"Name":"Randy Caulfield","Location":"Downtown","Type":"Customer","NPC ID":"Randy_Caulfield"},{"Name":"Brad Crosby","Location":"Downtown","Type":"Dealer","NPC ID":"Brad_Crosby"},{"Name":"Eugene Buckley","Location":"Downtown","Type":"Customer","NPC ID":"Eugene_Buckley"},{"Name":"Greg Figgle","Location":"Downtown","Type":"Customer","NPC ID":"greg_fliggle"},{"Name":"Jeff Gilmore","Location":"Downtown","Type":"Customer","NPC ID":"Jeff_Gilmore"},{"Name":"Phillip Wentworth","Location":"Downtown","Type":"Customer","NPC ID":"Phillip_Wentworth"},{"Name":"Anna Chesterfield","Location":"Docks","Type":"Customer","NPC ID":"Anna_Chesterfield"},{"Name":"Lisa Gardener","Location":"Docks","Type":"Customer","NPC ID":"Lisa_Gardener"},{"Name":"Genghis Barn","Location":"Docks","Type":"Customer","NPC ID":"Genghis_Barn"},{"Name":"Cranky Frank","Location":"Docks","Type":"Customer","NPC ID":"Cranky_Frank"},{"Name":"Javier Perez","Location":"Docks","Type":"Customer","NPC ID":"Javier_Perez"},{"Name":"Marco Barone","Location":"Docks","Type":"Customer","NPC ID":"Marco_Baron"},{"Name":"Melissa Wood","Location":"Docks","Type":"Customer","NPC ID":"Melissa_Wood"},{"Name":"Salvador Moreno","Location":"Docks","Type":"Supplier","NPC ID":"Salvador_Moreno"},{"Name":"Mac Cooper","Location":"Docks","Type":"Customer","NPC ID":"Mac_Cooper"},{"Name":"Billy Kramer","Location":"Docks","Type":"Customer","NPC ID":"Billy_Kramer"},{"Name":"Jane Lucero","Location":"Docks","Type":"Dealer","NPC ID":"Jane_Lucero"},{"Name":"Chris Sullivan","Location":"Surburbia","Type":"Customer","NPC ID":"Chris_Sullivan"},{"Name":"Hank Stevenson","Location":"Surburbia","Type":"Customer","NPC ID":"Hank_Stevenson"},{"Name":"Karen Kennedy","Location":"Surburbia","Type":"Customer","NPC ID":"Karen_Kennedy"},{"Name":"Alison Knight","Location":"Surburbia","Type":"Customer","NPC ID":"Alison_Knight"},{"Name":"Jeremy Wilkinson","Location":"Surburbia","Type":"Customer","NPC ID":"Jeremy_Wilkinson"},{"Name":"Carl Bundy","Location":"Surburbia","Type":"Customer","NPC ID":"Carl_Bundy"},{"Name":"Jackie Stevenson","Location":"Surburbia","Type":"Customer","NPC ID":"Jackie_Stevenson"},{"Name":"Jack Knight","Location":"Surburbia","Type":"Customer","NPC ID":"Jack_Knight"},{"Name":"Harold Colt","Location":"Surburbia","Type":"Customer","NPC ID":"Harold_Colt"},{"Name":"Wei Long","Location":"Surburbia","Type":"Dealer","NPC ID":"Wei_Long"},{"Name":"Dennis Kennedy","Location":"Surburbia","Type":"Customer","NPC ID":"Dennis_Kennedy"},{"Name":"Fiona Hancock","Location":"Uptown","Type":"Customer","NPC ID":"Fiona_Hancock"},{"Name":"Lily Turner","Location":"Uptown","Type":"Customer","NPC ID":"Lily_Turner"},{"Name":"Ray Hoffman","Location":"Uptown","Type":"Customer","NPC ID":"Ray_Hoffman"},{"Name":"Jen Heard","Location":"Uptown","Type":"Customer","NPC ID":"Jen_Heard"},{"Name":"Walter Cussler","Location":"Uptown","Type":"Customer","NPC ID":"Walter_Cussler"},{"Name":"Leo Rivers","Location":"Uptown","Type":"Dealer","NPC ID":"Leo_Rivers"},{"Name":"Herbet Bleuball","Location":"Uptown","Type":"Customer","NPC ID":"herbert_bleuball"},{"Name":"Michael Boog","Location":"Uptown","Type":"Customer","NPC ID":"Michael_Boog"},{"Name":"Tobas Wentworth","Location":"Uptown","Type":"Customer","NPC ID":"Tobias_Wentworth"},{"Name":"Pearl Moore","Location":"Uptown","Type":"Customer","NPC ID":"Pearl_Moore"}]


export function getInfoFromID(id: string): (NpcInfo | null) {
  for (const info of NPC_INFO_DATA) {
    if (info["NPC ID"].toLowerCase() == id.toLowerCase()) {
      return info
    }
  }
  return null
}


const IMAGE_EXCEPTIONS: Record<string, string> = {
  "cranky_frank": "Frank",
  "tobias_wentworth": "Mayor",
  "hank_stevenson": "steve",
}

export function generateImageString(NPCID: string) {

  if (Object.keys(IMAGE_EXCEPTIONS).includes(NPCID)) {
    return "/mug_shots/" + IMAGE_EXCEPTIONS[NPCID]  + "_Mugshot.webp";
  } else {

    return "/mug_shots/" + capitalizeFirstLetter(NPCID.split("_")[0]) + "_Mugshot.webp"
  }

}

export function selectFromAdditionalDatas(AdditionalDatas: NPCData["AdditionalDatas"], item: string) {
  for (const field of AdditionalDatas) {
    if (field.Name == item) {
      return parseEmbeddedJson(field.Contents);
    }
  }
  return null;
}