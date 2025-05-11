import JSZip from "jszip";



export async function loadZipFile(file: File) {
  const zip = new JSZip();

  await zip.loadAsync(file);

  console.log(zip.files)


}