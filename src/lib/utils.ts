import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jsonrepair } from 'jsonrepair';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function relativePath(path: string) {
  return new RegExp(`.*\/${path}$`)
}

export function parseEmbeddedJson(jsonData: string, harsh:boolean=false, debug:boolean=false) {
  if (jsonData == "") return {}
  let data = jsonData.replaceAll("\\n", ""); // remove all newlines
  data = data.replaceAll("\\\"", "\""); // remove all replace the \" with "
  data = data.replaceAll("\\\\\"", "\\\""); // replace the \\" with \" (its dumb i need to do this but nested stuff exists)

  //? testing
  data = data.replaceAll('"{', "{");
  data = data.replaceAll('}"', "}");

  if (harsh) {
    // removes all backslashes
    data = data.replaceAll("\\", "");
  }
  
  // runs though json repair library, have not seen a need for this but should help.
  
  // console.log(data)

  try {
    return JSON.parse(data);
  } catch {
    console.log("Normal parse failed, attempting repair")
    if (debug) console.log(data);
    data = jsonrepair(data);
  }
  if (debug) console.log(data);
  return JSON.parse(data);
}


export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
