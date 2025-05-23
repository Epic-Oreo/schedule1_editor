import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { useFile } from "@/context/fileContext";
import { Button } from "../ui/button";
import { RotateCw } from "lucide-react";


export const SDInputText = ({
  title,
  fileName,
  path,
  readOnly=false,
  type="text",
  isInt=false,
}: {
  title: string;
  fileName: string;
  path: (string | number)[];
  readOnly?: boolean;
  type?: "text" | "number";
  isInt?: boolean;
}) => {
  const [value, setValue] = useState<string | null>(null);
  const [originalValue, setOriginalValue] = useState<string | null>(null);
  const {file, addChange, changes, deleteChange} = useFile();


  async function loadFile() {
    if (!file) return;

    // check if file is already in change
    const change = changes.find((change) => change.file === fileName && JSON.stringify(change.path) === JSON.stringify(path));
    if (change) {
      setValue(change.value as string);
      setOriginalValue(change.value as string);
      return;
    }

    // gets the first folder in the paths (should be the same for everything)
    const firstFolder = file.files[Object.keys(file.files)[0]].name.split("/")[0];
    let fancyFileName = fileName;
    if (!fancyFileName.startsWith("/")) fancyFileName = "/" + fancyFileName;
    let data = JSON.parse(await file?.file(firstFolder + fancyFileName)?.async("text") || "");

    for (const i in path) {
      data = data[path[i]]
      if (data == undefined) {
        throw Error(`Invalid data/path! ${path}`)
      }
    }
    setOriginalValue(data);
    setValue(data);
  }


  async function edit(e: ChangeEvent<HTMLInputElement> ) {
    if (readOnly) return;
    let newValue = e.target.value;


    if (type == "number" && !Number.parseFloat(newValue)) {
      return; 
    }
    if (type == "number" && isInt) {
      newValue = Math.floor(Number.parseFloat(newValue)).toString();
    }

    if (newValue == originalValue) {
      deleteChange(fileName, path)
    } else {
      addChange(fileName, path, newValue);
    }

    setValue(newValue);
  }

  useEffect(()=>{
    if (!file || value) return;
    loadFile()
  }, [])

  return (
    <div>
      <Label className="mb-1">{title}</Label>
      <div className="w-full flex gap-1">
        {value?(
          <Input disabled={readOnly} value={value} onChange={edit} type={type}/>
        ):(<Skeleton className="w-full h-[2.25rem]" />)}
        {!readOnly && (
          <Button variant={"ghost"} disabled={value == originalValue} onClick={()=>setValue(originalValue)} size={"icon"} className="h-[2.25rem]">
            <RotateCw/>
          </Button>
        )}
      </div>
    </div>
  )
}
