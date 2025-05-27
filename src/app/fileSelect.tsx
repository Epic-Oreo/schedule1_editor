"use client"

import { Input } from "@/components/ui/input";
import { useFile } from "@/context/fileContext";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'

const zipTypes = [
  "application/zip",
  "application/x-zip-compressed"
]

const FileSelect = () => {
  const { loadZip } = useFile();

  const [loading, setLoading] = useState<boolean>(false);
  const [fileName, setFilename] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

  return (
    <div className="grid w-full max-w-lg items-center gap-1.5">
      <div className="relative w-full">
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center">
          <Upload className="size-14"/>
          {loading?(<p>loading {fileName}</p>):(<p>Drop zip or click to select</p>)}
        </div>
        <Input ref={inputRef} id="fileInput" type="file" className="h-56 w-full file:hidden text-transparent" disabled={loading} onChange={async (e)=>{
          setLoading(true);
          const selectedFiles = e.target.files;
          if (!selectedFiles) return;
          
          setFilename(selectedFiles[0].name)
          console.log("Loading file of ",selectedFiles[0].type)

          

          if (zipTypes.includes(selectedFiles[0].type)) {

            toast.promise(loadZip(selectedFiles[0]), {
              loading: 'Loading...',
              success: () => {
                router.push("/editor")
                return `Loaded!`;
              },
              error: (e: Error) => {

                return {
                  message: `Error`,
                  description: e.message,
                  duration: 6000
                };
              },
            });
          } else {
            toast("Please Upload an exported ZIP file")
          }
          // if (selectedFiles[0].)

        }} />
      </div>
    </div>
  )
}

export default FileSelect;