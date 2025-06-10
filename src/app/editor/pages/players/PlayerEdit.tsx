import { Button } from "@/components/ui/button";
import { CombinedPlayerData, SteamUser } from "./types"
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { parseEmbeddedJson } from "@/lib/utils";
import { Item } from "@/lib/types";
import ItemSelect from "@/components/ItemSelect";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const PlayerEditButton = ({player, steamUser} : {
  player: CombinedPlayerData;
  steamUser: SteamUser | null | undefined
}) => {

  const [open, setOpen] = useState(false);



  return (
    <div className="">

      <Dialog open={open} onOpenChange={(o)=>{
        setOpen(o);
      }}>
        <DialogTrigger asChild>
          <Button size="icon" variant={"outline"}>
            <EditIcon />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{steamUser ? steamUser.personaname : player.Data.PlayerCode}</DialogTitle>
            <DialogDescription>{player.folderName}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col w-full">
            
            <div className="grid grid-cols-5 gap-4">
              {player.Inventory.Items.map((stringItem, i)=>{
                const itemData: Item = parseEmbeddedJson(stringItem);
                return (

                  <Dialog key={`${i}-${itemData.DataType}`}>
                    <DialogTrigger className="w-20 h-20 overflow-scroll bg-card rounded-lg p-2 flex flex-col items-center justify-between ">
                      <p className="w-full break-all text-sm">{itemData.ID}</p>
                      <p className="text-sm text-amber-200">{itemData.ID != "" && itemData.Quantity}</p>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{itemData.ID != "" ? itemData.ID : "Empty"}</DialogTitle>
                        <DialogDescription className="flex  items-center gap-2">
                          Item Type 
                          <Select defaultValue={itemData.DataType}>
                            <SelectTrigger className=" !h-8 !text-xs">
                              <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ItemData">ItemData</SelectItem>
                              <SelectItem value="CashData">CashData</SelectItem>
                              <SelectItem value="WeedData">WeedData</SelectItem>
                              <SelectItem value="MethData">MethData</SelectItem>
                              <SelectItem value="CocaineData">CocaineData</SelectItem>
                              <SelectItem value="IntegerItemData">IntegerItemData</SelectItem>
                              <SelectItem value="ClothingData">ClothingData</SelectItem>
                            </SelectContent>
                          </Select>

                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="w-full h-20 bg-card text-card-foreground flex flex-col items-center justify-around p-2 rounded-lg">
                          <h3 className="font-bold">Change Item</h3>
                          <ItemSelect asChild onChange={(v)=>{
                            console.log(v)
                          }} value={itemData} className="p-1 hover:bg-black/20 rounded-lg duration-150 cursor-pointer">
                            <EditIcon className="w-8 h-8"/>
                          </ItemSelect>
                        </div>

                        {itemData.DataType == "CashData" && (
                          <div className="w-full h-20 bg-card text-card-foreground flex flex-col items-center justify-around p-2 rounded-lg">
                            <h3 className="font-bold">Cash Amount</h3>
                            ${Math.round(itemData.CashBalance || 0)}
                          </div>
                        )}


                      </div>
                    </DialogContent>
                  </Dialog>
                )
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PlayerEditButton