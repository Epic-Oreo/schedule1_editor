import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BoxIcon,
  CannabisIcon,
  DollarSignIcon,
  EditIcon,
  GemIcon,
  SaveIcon,
  TabletsIcon,
} from "lucide-react";
import {
  NPCBaseData,
  NPCData,
  NPCInventoryData,
  NPCRelationshipData,
} from "./types";
import { NpcInfo as NPCInfo, selectFromAdditionalDatas } from "./utils";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { GradientSlider } from "@/components/ui/gradient-slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFile } from "@/context/fileContext";

export interface OriginalData {
  Relationship: NPCRelationshipData | null;
  Inventory: NPCInventoryData | null;
}

const EditNPCButton = ({
  NPC,
  baseData,
  imageSrc,
  info,
}: {
  NPC: NPCData;
  baseData: NPCBaseData;
  imageSrc: string;
  info: NPCInfo;
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [relationshipData, setRelationshipData] =
    useState<NPCRelationshipData | null>(null);
  const [relationDelta, setRelationDelta] = useState<number | null>(null);

  const [inventoryData, setInventoryData] = useState<NPCInventoryData | null>(
    null
  );
  const formRef = useRef<HTMLFormElement | null>(null);
  const [changed, setChanged] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<OriginalData | null>(null);
  const [originalObject, setOriginalObject] = useState<NPCData | null>(null);
  
  const {addChange} = useFile();



  async function loadData() {
    // if (loaded) return;
    console.log("Loading data");

    const rData = selectFromAdditionalDatas(
      NPC.AdditionalDatas,
      "Relationship"
    ) as NPCRelationshipData | null;
    if (rData != null) {
      setRelationshipData(rData);
      setRelationDelta(rData.RelationDelta * 100);
    }

    const iData = selectFromAdditionalDatas(
      NPC.AdditionalDatas,
      "Inventory"
    ) as NPCInventoryData | null;
    if (iData != null) {
      setInventoryData(iData);
      console.log(iData);
    }

    setOriginalObject({...NPC}) // Making sure its a copy
    setOriginalData({ Relationship: rData, Inventory: iData });

    setLoaded(true);
  }

  function save() {
    console.log("Saving...");
    if (!originalObject || !originalData) throw Error("Original Object/Data not initialized");
    const newNPCObject: NPCData = {...originalObject};
    const newData: OriginalData = {
      Relationship: relationshipData,
      Inventory: inventoryData,
    };


    // go through additional data and update the needed contents
    let i = 0;
    for (const data of newNPCObject.AdditionalDatas) {
      if (Object.keys(newData).includes(data.Name)) {
        newNPCObject.AdditionalDatas[i].Contents = JSON.stringify(newData[data.Name as keyof OriginalData]);
      }
      i++;
    }
    
    addChange("NPCs.json", ["NPCs", "*", ()=>{
      console.log(baseData.ID);
      return "d"
    }, baseData.ID], newData, baseData.ID);
    setOpen(false);
  }

  function checkForChanges() {
    if (JSON.stringify(originalData) == JSON.stringify({
      Relationship: relationshipData,
      Inventory: inventoryData,
    })) {
      setChanged(false);
    } else {
      setChanged(true)
    }
  }

  useEffect(() => {
    if (!relationshipData) return;
    checkForChanges();
  }, [relationshipData]);

  return (
    <Dialog open={open} onOpenChange={(o)=>{
      setOpen(o);
    }}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            loadData();
          }}
        >
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Image
              src={imageSrc}
              width={20}
              height={20}
              alt={`Mugshot`}
              className="w-8 h-8"
            />
            {info.Name}
          </DialogTitle>
          <DialogDescription>Editing {baseData.ID}</DialogDescription>
        </DialogHeader>
        {loaded && (
          // <div className="w-full flex flex-col gap-4">
          <form ref={formRef}>
            <Accordion
              type="single"
              defaultValue="item-1"
              collapsible
              className="w-full"
            >
              {/* Relationship */}
              <AccordionItem value="item-1" className="w-full">
                <AccordionTrigger className="text-lg">
                  Relationship
                </AccordionTrigger>
                <AccordionContent>
                  {relationshipData != null ? (
                    <>
                      <div className="mt-2 mb-1">
                        Delta: {(relationDelta || 0) / 100}
                      </div>
                      <GradientSlider
                        name="RelationDelta"
                        defaultValue={[relationshipData.RelationDelta * 100]}
                        onValueChange={(v) => {
                          setRelationDelta(v[0]);
                          setRelationshipData((prev) =>
                            prev ? { ...prev, RelationDelta: v[0] / 100 } : null
                          );
                        }}
                        max={500}
                        step={1}
                        className="mb-5"
                      />

                      <div className="items-top flex space-x-2">
                        <Checkbox
                          name="Unlocked"
                          defaultChecked={relationshipData.Unlocked}
                          onCheckedChange={(v) => {
                            setRelationshipData((prev) =>
                              prev ? { ...prev, Unlocked: !!v } : null
                            );
                          }}
                          className="w-5 h-5"
                          id="terms1"
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Unlocked
                          </label>
                        </div>
                      </div>

                      <Label className="mt-3 mb-1">
                        UnlockType (0 or 1, I think this only matters for
                        suppliers?)
                      </Label>
                      <Input
                        required
                        name="UnlockType"
                        onChange={(e) => {
                          if (e.target.reportValidity()) {
                            setRelationshipData((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    UnlockType: Number.parseInt(
                                      e.target.value
                                    ) as 0 | 1,
                                  }
                                : null
                            );
                          }
                        }}
                        defaultValue={relationshipData.UnlockType}
                        type="number"
                        className=""
                        min={0}
                        max={1}
                      />
                    </>
                  ) : (
                    <div>
                      <p>No Relationship data found for NPC</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Inventory */}
              <AccordionItem value={"items-2"} className="w-full">
                <AccordionTrigger className="text-lg">
                  Inventory
                </AccordionTrigger>

                <AccordionContent>
                  {inventoryData != null ? (
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {inventoryData.Items.map((item, i) => {
                        return (
                          <div
                            key={`${item.ID}-${i}`}
                            className="w-full aspect-square bg-card rounded-lg p-1 flex flex-col items-center relative"
                          >
                            {item.DataType != "CashData" && item.ID && (
                              <p className="text-sm top-1 left-1 absolute">
                                {item.Quantity}
                              </p>
                            )}

                            <div className="grow flex flex-col items-center justify-center w-full">
                              {item.DataType == "WeedData" && (
                                <CannabisIcon className="size-8" />
                              )}
                              {item.DataType == "MethData" && (
                                <GemIcon className="size-8" />
                              )}
                              {item.DataType == "CocaineData" && (
                                <TabletsIcon className="size-8" />
                              )}
                              {item.DataType == "CashData" && (
                                <DollarSignIcon className="size-8" />
                              )}
                              {item.DataType == "ItemData" && item.ID != "" && (
                                <BoxIcon className="size-8" />
                              )}
                            </div>

                            {item.DataType == "CashData" ? (
                              <p className="text-sm">${item.CashBalance}</p>
                            ) : (
                              <p className="text-sm">{item.ID}</p>
                            )}

                            {/* <p className="text-sm">{item.ID}</p> */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="w-full h-full absolute top-0 left-0 rounded-lg z-20 bg-black/70 opacity-0 hover:opacity-100 duration-100 flex items-center justify-center cursor-pointer">
                                  <EditIcon />
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Item Slot #{i + 1}</DialogTitle>
                                  <DialogDescription></DialogDescription>
                                </DialogHeader>
                                <div className="">TDA</div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p>Inventory data not found</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>
        )}

        <DialogFooter>
          <Button disabled={!changed} onClick={() => save()}>
            <SaveIcon />
            <span>Save</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNPCButton;
