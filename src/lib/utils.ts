import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function relativePath(path: string) {
  return new RegExp(`.*\/${path}$`)
}

export function parseEmbeddedJson(jsonData: string): Record<string, unknown> {
  if (jsonData == "") return {}
  let data = jsonData.replaceAll("\\n", "");
  data = data.replaceAll("\\\"", "\"");
  return JSON.parse(data);
}