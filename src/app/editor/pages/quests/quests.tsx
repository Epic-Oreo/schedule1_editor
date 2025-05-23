import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multiselect";
import { useFile } from "@/context/fileContext";
import { relativePath } from "@/lib/utils";


import { useEffect, useState } from "react";
import { ContractQuest, Quest, QuestFile } from "./types";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";







const QuestsPage = () => {
  const [quests, setQuests] = useState<(Quest | ContractQuest)[]>([]);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const { file } = useFile();
  

  async function loadQuestData() {
    if (!file) return;
    const qFile = file.file(relativePath("Quests.json"))[0];
    if (!qFile) throw Error("Quests.json not found!");

    const questData = JSON.parse(await qFile.async("string")) as QuestFile;
    let allQuests = [...questData.Quests, ...questData.Contracts, ...questData.DeaddropQuests];

    allQuests = allQuests.filter((value: (Quest | ContractQuest))=>{
      if (filterTypes.includes(value.DataType)) {
        return value;
      }
    })

    setQuests(allQuests);
  }

  useEffect(()=>{
    if (quests.length > 0) return;
    console.log("Loading quests...");
    loadQuestData();
  }, [])

  useEffect(()=>{
    console.log("Reloading quest data")
    loadQuestData();
  }, [filterTypes])


  return (
    <div className="p-4 flex gap-4">
      <Card className="w-80 sticky h-max top-5">
        <CardContent className="flex flex-col gap-3">

          <Input type="string" placeholder="Search..."/>

          <MultiSelect items={[
            {label: "Quests", value: "QuestData"},
            {label: "Contracts", value: "ContractData"},
            {label: "Dead Drops", value: "DeaddropQuests"},
          ]} title="Select Types" onChange={(selected)=>{
            setFilterTypes(selected.map((v) => v.value));
          }}/>
        </CardContent>
      </Card>


      <div className="flex flex-col w-full gap-2">
          {quests.map((quest) => {
            return (
              <div key={quest.GUID} className="w-full h-16 bg-card pl-5 pr-3 py-2 border rounded-lg flex gap-4 relative overflow-hidden">
                <div className={`absolute left-0 top-0 w-2 h-full
                    ${quest.DataType == "QuestData" && "bg-green-500/60"}
                    ${quest.DataType == "ContractData" && "bg-blue-500/60"}
                `}></div>

                <div className="flex flex-col min-w-0 max-w-full">
                  <h2 className="text-xl text-card-foreground overflow-hidden text-ellipsis h-full">{quest.Title}</h2>
                  <p className="text-card-foreground/80 overflow-hidden text-ellipsis h-full">{quest.Description}</p>
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
  );
};

export default QuestsPage;
