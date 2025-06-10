import ItemSelect from "@/components/ItemSelect";
import { Textarea } from "@/components/ui/textarea";
import { Item } from "@/lib/types";
import { parseEmbeddedJson } from "@/lib/utils";
import { useState } from "react";


const DevPage = () => {
  const [data, setData] = useState<string>("");


  const [currentItem, setCurrentItem] = useState<Item>({
    DataType: "ItemData",
    DataVersion: 0,
    GameVersion: "1.2.31",
    ID: "",
    Quantity: 0,
  });
  



  return (
    <div className="p-4 flex flex-col gap-6">

      <div className="">
        <ItemSelect value={currentItem} onChange={(i)=>{
            setCurrentItem(i);
        }} className="bg-card rounded-lg w-16 h-16 flex items-center justify-center cursor-pointer">
          {currentItem.ID}
        </ItemSelect>
      </div>


      <div className="bg-card text-card-foreground p-2 rounded-lg">
        <Textarea className="w-full" onChange={(e)=>{
          try {
            const data = parseEmbeddedJson(e.target?.value, true, true)
            setData(JSON.stringify(data, null, 3));
            console.log(data)
          
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {
            console.log(e);
          }
        }}/>
        <pre>
          {data}
        </pre>
      </div>


      
    </div>
  )
}


export default DevPage;


