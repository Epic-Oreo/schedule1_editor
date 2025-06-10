import { Button } from "@/components/ui/button";
import { CombinedPlayerData, SteamUser } from "./types"
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { parseEmbeddedJson } from "@/lib/utils";
import { Item } from "@/lib/types";
import ItemSelect from "@/components/ItemSelect";


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
                  <ItemSelect asChild key={`${i}-${itemData.DataType}`} onChange={(v)=>{
                    console.log(v)
                  }} value={itemData} className="w-20 h-20 bg-card">
                    {/* {itemData.ID} */}
                    <Button>Hello</Button>
                  </ItemSelect>
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