import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jsonrepair } from "jsonrepair";
import JSZip from "jszip";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstFolder(file: JSZip) {
  if (!file) return null;
  const fileList = file.files;
  for (const f of Object.keys(fileList)) {
    if (f.includes("/")) {
      return f.split("/")[0];
    }
  }
  throw Error("First folder finder failed fantastically.");
}

// When saving to a file, you can not use RegEx so we must do this horrible way;
export function stupidRelativePath(path: string, file: JSZip) {
  const firstFolder = getFirstFolder(file);
  if (path.startsWith("/")) {
    path = path.slice(1);
  }
  return firstFolder + "/" + path;
}

export function relativePath(path: string) {
  return new RegExp(`.*\/${path}$`);
}

export function parseEmbeddedJson(
  jsonData: string,
  harsh: boolean = false,
  debug: boolean = false
) {
  if (jsonData == "") return {};
  let data = jsonData.replaceAll("\\n", ""); // remove all newlines
  data = data.replaceAll('\\"', '"'); // remove all replace the \" with "
  data = data.replaceAll('\\\\"', '\\"'); // replace the \\" with \" (its dumb i need to do this but nested stuff exists)

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
    console.log("Normal parse failed, attempting repair");
    if (debug) console.log(data);
    data = jsonrepair(data);
  }
  if (debug) console.log(data);
  return JSON.parse(data);
}

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const colors = [
  [255, 255, 255],
  [183, 183, 183],
  [101, 101, 101],
  [61, 61, 61],
  [38, 38, 38],
  [255, 153, 154],
  [236, 94, 96],
  [161, 61, 61],
  [241, 146, 84],
  [188, 139, 84],
  [122, 85, 57],
  [241, 181, 115],
  [155, 126, 87],
  [255, 192, 52],
  [210, 251, 73],
  [165, 254, 79],
  [77, 141, 49],
  [84, 231, 224],
  [100, 211, 254],
  [83, 146, 224],
  [63, 91, 219],
  [45, 56, 103],
  [62, 37, 142],
  [129, 50, 185],
  [170, 50, 182],
  [227, 69, 223],
  [222, 49, 140],
];
