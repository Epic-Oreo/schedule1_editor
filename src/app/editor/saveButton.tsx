import { Button } from "@/components/ui/button";
import { Change, useFile } from "@/context/fileContext";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { InfoIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import JSZip from "jszip";
import { relativePath, stupidRelativePath } from "@/lib/utils";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function saveChanges (file: JSZip, changes: Change[]) {
  for (const change of changes) {
    if (change.type == "display") continue;


    const fileData = JSON.parse(await file.file(relativePath(change.file))[0].async("string"));
    const realPath: (string|number)[] = [];

    for (const pathItem of change.path) {
      if (typeof pathItem == "string" || typeof pathItem == "number") {
        realPath.push(pathItem);
      } else {
        realPath.push(pathItem()); //? this is kinda useless rn
      }
    }

    

    file.file(stupidRelativePath(change.file, file), JSON.stringify(fileData));
  }

  // return;


  const blob = await file.generateAsync({type: "blob"});
  
  
  // https://dev.to/nombrekeff/download-file-from-blob-21ho -----
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = "ExportedSave.zip ";
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', { 
      bubbles: true, 
      cancelable: true, 
      view: window 
    })
  );

  // Remove link from body
  document.body.removeChild(link);
  // --- Thank for the code Kef
}







const SaveChangesBar = () => {
  const {changes, file} = useFile();
  const [loading, setLoading] = useState<boolean>(false);

  if (changes.length == 0) {
    return;
  }

  return (
    <div className="p-4 fixed bottom-0 left-0 w-full z-40 flex justify-end items-center gap-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <p className="hover:underline">{changes.length} change{changes.length > 1 && "s"} <InfoIcon className="size-4 inline-block"/></p>
        </HoverCardTrigger>
        <HoverCardContent className="w-96 flex flex-col gap-2 max-h-96 overflow-y-scroll">
          {changes.map((change, i)=>{
            return (
              <div key={change.file + i} className="flex justify-between bg-accent px-2 py-1 rounded">
                <p>{change.file}</p>
                <p>{change.name}</p>
              </div>
            )
          })}
        </HoverCardContent>
      </HoverCard>
      <Button disabled={loading} onClick={async ()=>{
        if (!file) throw Error("No File Instance Found!");
        setLoading(true);
        try {
          await saveChanges(file, changes);
        } catch (e){
          console.log(e)
        }
        setLoading(false);
      }}>
        {loading && (<Loader2 className="animate-spin" />)}
        Save
      </Button>
    </div>
  )
}

export default SaveChangesBar;