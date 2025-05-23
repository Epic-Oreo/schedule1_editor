import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multiselect";
import { useFile } from "@/context/fileContext";
import { parseEmbeddedJson, relativePath } from "@/lib/utils";
import { useEffect, useState } from "react";
import { NPCBaseData, NPCCollectionData, NPCData } from "./types";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { generateImageString, getInfoFromID } from "./utils";
import Image from "next/image";


const NPCsPage = () => {
  const [NPCs, setNPCs] = useState<(NPCData)[]>([]);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterLocations, setFilterLocations] = useState<string[]>([]);
  const { file } = useFile();



async function loadQuestData() {
    if (!file) return;
    const qFile = file.file(relativePath("NPCs.json"))[0];
    if (!qFile) throw Error("Quests.json not found!");

    const npcData = JSON.parse(await qFile.async("string")) as NPCCollectionData;
    let allNPCs = npcData.NPCs as NPCData[];

    allNPCs = allNPCs.filter((value: NPCData)=>{
      const baseData = parseEmbeddedJson(value.BaseData) as NPCBaseData;
      const info = getInfoFromID(baseData.ID);
      if (!info) return;

      if (
        filterLocations.includes(info.Location)
        && filterTypes.includes(info.Type)
      ){
        return value;
      }
    })

    setNPCs(allNPCs);
  }

  useEffect(()=>{
    if (NPCs.length > 0) return;
    console.log("Loading NPCs...");
    loadQuestData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    console.log("Reloading quest data")
    loadQuestData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTypes, filterLocations])



  return (
    <div className="p-4 flex gap-4">
      <Card className="w-80 sticky h-max top-5">
        <CardContent className="flex flex-col gap-3">

          <Input type="string" placeholder="Search..."/>

          <Label>Location</Label>
          <MultiSelect items={[
            {label: "Northtown", value: "Northtown"},
            {label: "Westville", value: "Westville"},
            {label: "Downtown", value: "Downtown"},
            {label: "Docks", value: "Docks"},
            {label: "Suburbia", value: "Suburbia"},
            {label: "Uptown", value: "Uptown"},
          ]} title="Select Types" onChange={(selected)=>{
            setFilterLocations(selected.map((v) => v.value));
          }}/>

          <Label>Type</Label>
          <MultiSelect items={[
            {label: "Customer", value: "Customer"},
            {label: "Supplier", value: "Supplier"},
            {label: "Dealer", value: "Dealer"},
          ]} title="Select Types" onChange={(selected)=>{
            setFilterTypes(selected.map((v) => v.value));
          }}/>
        </CardContent>
      </Card>


      <div className="flex flex-col w-full gap-2">
          {NPCs.map((NPC, i) => {
            // if (NPC.DataType != "NPCData") return null;
            const baseData = parseEmbeddedJson(NPC.BaseData) as NPCBaseData;
            const imageName = generateImageString(baseData.ID);
            const info = getInfoFromID(baseData.ID);
            if (!info) return "Error Getting Info"

            return (
              <div key={baseData.ID + i} className="w-full h-16 bg-card pl-5 pr-3 py-2 border rounded-lg flex gap-4 relative overflow-hidden">
                
                <div className="h-full flex items-center">
                  <Image src={imageName} width={10} height={10} alt={`${baseData.ID} Mugshot`} className="w-10 h-10"/>
                </div>

                <div className="flex flex-col min-w-0 max-w-full">
                  <h2 className="text-xl text-card-foreground overflow-hidden text-ellipsis h-full">{info.Name}</h2>
                  {/* <p className="text-card-foreground/80 overflow-hidden text-ellipsis h-full">{baseData.ID}</p> */}
                </div>
                <div className="h-full flex items-center ml-auto">
                  <Button variant={"outline"} size={"icon"}>
                    <EditIcon/>
                  </Button>
                </div>

              </div>
            )
          })}
      </div>
    </div>
  )
}

export default NPCsPage;