import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multiselect";
import { useFile } from "@/context/fileContext";
import { parseEmbeddedJson, relativePath } from "@/lib/utils";
import { useEffect, useState } from "react";
import { NPCBaseData, NPCCollectionData, NPCData } from "./types";
import { Label } from "@/components/ui/label";
import { generateImageString, getInfoFromID, NPC_INFO_DATA } from "./utils";
import Image from "next/image";
import EditNPCButton from "./NPCEdit";
import { HouseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const NPCsPage = () => {
  const [NPCs, setNPCs] = useState<NPCData[]>([]);
  const { file } = useFile();

  const [filterSearch, setFilterSearch] = useState<string>("");
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterLocations, setFilterLocations] = useState<string[]>([]);

  async function loadQuestData() {
    if (!file) return;
    const qFile = file.file(relativePath("NPCs.json"))[0];
    if (!qFile) throw Error("NPCs.json not found!");

    const npcData = JSON.parse(
      await qFile.async("string")
    ) as NPCCollectionData;
    let allNPCs = npcData.NPCs as NPCData[];

    const filteredNPCs: (NPCData | null)[] = allNPCs.map((value: NPCData, i) => {
      const baseData = parseEmbeddedJson(value.BaseData) as NPCBaseData;
      const info = getInfoFromID(baseData.ID);
      if (!info) return null;

      // filter based on different multiselect
      if (
        filterLocations.includes(info.Location) &&
        filterTypes.includes(info.Type)
      ) {
        // filter on search
        if (filterSearch != "") {
          if (
            info.Name.toLowerCase()
              .replaceAll(" ", "")
              .includes(filterSearch.toLowerCase().replaceAll(" ", ""))
          ) {
            return {...value, position: i};
          }
        } else {
          return {...value, position: i};
        }
      }

      return null;
    });

    // @ts-expect-error there will not be any nulls in output because to filters them out.
    allNPCs = filteredNPCs.filter((v) => {
      if (v != null) return true;
    });

    setNPCs(allNPCs);
  }

  useEffect(() => {
    if (NPCs.length > 0) return;
    console.log("Loading NPCs...");
    loadQuestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("=====| Reloading quest data |=====");
    loadQuestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTypes, filterLocations, filterSearch]);

  return (
    <div className="p-4 flex gap-4">
      <Card className="w-80 sticky h-max top-5">
        <CardContent className="flex flex-col gap-3">
          <Input
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
            type="string"
            placeholder="Search..."
          />
          <div>
            <Label className="mb-1">Location</Label>
            <MultiSelect
              items={[
                { label: "Northtown", value: "Northtown" },
                { label: "Westville", value: "Westville" },
                { label: "Downtown", value: "Downtown" },
                { label: "Docks", value: "Docks" },
                { label: "Surburbia", value: "Surburbia" },
                { label: "Uptown", value: "Uptown" },
              ]}
              title="Select Types"
              onChange={(selected) => {
                setFilterLocations(selected.map((v) => v.value));
              }}
            />
          </div>
          <div>
            <Label className="mb-1">Type</Label>
            <MultiSelect
              items={[
                { label: "Customer", value: "Customer" },
                { label: "Supplier", value: "Supplier" },
                { label: "Dealer", value: "Dealer" },
              ]}
              title="Select Types"
              onChange={(selected) => {
                setFilterTypes(selected.map((v) => v.value));
              }}
            />
          </div>

          <Button
            onClick={async () => {
              if (!file) return;
              const qFile = file.file(relativePath("NPCs.json"))[0];
              if (!qFile) throw Error("NPCs.json not found!");
              const npcData = JSON.parse(
                await qFile.async("string")
              ) as NPCCollectionData;
              const allNPCs = npcData.NPCs as NPCData[];
              const allIDs = allNPCs.map(
                (NPC) => (parseEmbeddedJson(NPC.BaseData) as NPCBaseData).ID
              );
              const unsaved = NPC_INFO_DATA.filter((NPC) => {
                if (!allIDs.includes(NPC["NPC ID"].toLowerCase()))
                  return NPC["NPC ID"].toLowerCase();
              });
              console.log(unsaved);
            }}
          >
            Get Unsaved NPCs
          </Button>
        </CardContent>
      </Card>

      <div className="flex flex-col w-full gap-2">
        {NPCs.map((NPC, i) => {
          // if (NPC.DataType != "NPCData") return null;
          const baseData = parseEmbeddedJson(NPC.BaseData) as NPCBaseData;
          const imageName = generateImageString(baseData.ID);
          const info = getInfoFromID(baseData.ID);

          if (!info) return "Error Getting Info";

          return (
            <div
              key={baseData.ID + i}
              className="w-full h-16 bg-card pl-5 pr-3 py-2 border rounded-lg flex gap-4 relative overflow-hidden"
            >
              <div className="h-full flex items-center">
                <Image
                  src={imageName}
                  width={40}
                  height={40}
                  alt={`${baseData.ID} Mugshot`}
                  className="w-10 h-10"
                />
              </div>

              <div className="flex flex-col min-w-0 max-w-full">
                <h2 className="text-xl text-card-foreground overflow-hidden text-ellipsis h-full">
                  {info.Name}
                </h2>
                <p className="text-sm text-card-foreground/80 flex gap-1 items-center">
                  <HouseIcon className="w-4 h-4" />
                  {info.Location}
                </p>
                {/* <p className="text-card-foreground/80 overflow-hidden text-ellipsis h-full">{baseData.ID}</p> */}
              </div>

              <div className="h-full flex items-center ml-auto">
                <EditNPCButton
                  NPC={NPC}
                  baseData={baseData}
                  imageSrc={imageName}
                  info={info}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NPCsPage;
