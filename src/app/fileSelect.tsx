"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadZipFile } from "@/lib/fileManagment/loadZipFile";
import { Upload } from "lucide-react";
import { useState } from "react";


const FileSelect = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fileName, setFilename] = useState<string | null>(null);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture" className="text-xl">{loading?`Loading... ${fileName}`:"Save File"}</Label>
      <div className="relative">
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center">
          <Upload className="size-14"/>
          <p>Drop file or click to select</p>
        </div>
        <Input id="picture" type="file" className="h-32 file:hidden text-transparent" disabled={loading} onChange={(e)=>{
          setLoading(true);
          const selectedFiles = e.target.files;
          if (!selectedFiles) return;
          
          setFilename(selectedFiles[0].name)
          if (selectedFiles[0].type == "application/x-zip-compressed") {
            loadZipFile(selectedFiles[0])
          }
          // if (selectedFiles[0].)

        }} />
      </div>
    </div>
  )
}

export default FileSelect;