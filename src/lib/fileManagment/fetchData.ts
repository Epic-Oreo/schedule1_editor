import JSZip from "jszip";


export const fetchFileData = async (src: JSZip, files: string[]): Promise<[Record<string, unknown>, string[]]> => {
  const re = new RegExp(`^([^/]*)\/`);
  const out: Record<string, unknown> = {};
  const rFiles = files.slice();
  

  for (const path in src.files) {
    const fancyPath = path.replace(re, "")
    if (files.includes(fancyPath)){
      const file = src.file(path);
      
      if (file) {
        out[fancyPath] = JSON.parse(await file.async('text'));
      }

      const i = rFiles.indexOf(fancyPath);
      rFiles.splice(i, 1);
    }
  }

  return [out, rFiles];
}