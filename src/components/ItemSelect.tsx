import { Item } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { itemsList } from "@/lib/items";
import { CheckIcon } from "lucide-react";



const ItemSelect = ({
  children,
  className,
  value,
  onChange,
  asChild = false,
}: {
  children: ReactNode;
  className?: string;
  value?: Item;
  onChange?: (item: Item)=>void;
  asChild?: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);


  return (
    <Popover open={open} onOpenChange={(v)=>{
      setOpen(v);
    }}>
      <PopoverTrigger asChild={asChild} className={cn(className)}>
        {children}
      </PopoverTrigger>

      <PopoverContent className="p-0 w-56">
        <Command>
          <CommandInput placeholder="Search item..." />
          <CommandList>
            <div className="text-destructive text-center text-sm">CLOTHING AND MAGS MIGHT NOT WORK</div>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {/* Empty item */}
              <CommandItem className=""
                value=""
                onSelect={()=>{
                  if (onChange) {
                    onChange({
                      DataType: "ItemData",
                      DataVersion: 0,
                      GameVersion: "1.2.31",
                      ID: "",
                      Quantity: 0,
                    })
                  }
                  setOpen(false);
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    "" === value?.ID ? "opacity-100" : "opacity-0"
                  )}
                />
                EMPTY
              </CommandItem>

              {itemsList.map((item)=>{
                if (item.PRICE == "") return;
                return (
                  <CommandItem
                    key={item.ITEMID}
                    value={item.ITEMID}
                    onSelect={()=>{
                      if (onChange) {
                        onChange({
                          DataType: "ItemData",
                          DataVersion: 0,
                          GameVersion: "1.2.31",
                          ID: item.ITEMID,
                          Quantity: 1,
                        })
                      }
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        item.ITEMID === value?.ID ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.NAME}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      
      </PopoverContent>      
    </Popover>
  )
}

export default ItemSelect;