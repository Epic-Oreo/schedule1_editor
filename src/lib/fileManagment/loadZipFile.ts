import JSZip from "jszip";
import { supportedVersions } from "../supportedVersions";



export async function loadZipFile(file: File) {
  console.log("Loading zip...")
  const zip = new JSZip();
  await zip.loadAsync(file);

  console.log(zip.files)

  
  const gameFile = zip.file(/.*\/Game\.json$/)[0];
  if (!gameFile) throw Error("Game.json not found!");

  const gameFileData = JSON.parse(await gameFile.async('text') || "{}");

  if (!supportedVersions.includes(gameFileData.GameVersion)) {
    throw Error(`version ${gameFileData.GameVersion} is not supported`)
  }


  return zip;
}