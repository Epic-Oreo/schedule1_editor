import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jsonrepair } from 'jsonrepair';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function relativePath(path: string) {
  return new RegExp(`.*\/${path}$`)
}

export function parseEmbeddedJson(jsonData: string, harsh:boolean=false) {
  if (jsonData == "") return {}
  let data = jsonData.replaceAll("\\n", ""); // remove all newlines
  data = data.replaceAll("\\\"", "\""); // remove all replace the \" with "
  data = data.replaceAll("\\\\\"", "\\\""); // replace the \\" with \" (its dumb i need to do this but nested stuff exists)

  if (harsh) {
    // removes all backslashes
    data = data.replaceAll("\\", "");
  }
  
  // runs though json repair library, have not seen a need for this but should help.
  data = jsonrepair(data); 
  return JSON.parse(data);
}


export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
