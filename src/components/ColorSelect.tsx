"use client"
import { create } from "zustand";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { colors } from "@/lib/utils";
import { Button } from "./ui/button";


interface ColorSelectControllerState {
  open: boolean;
  setOpen: (newState: boolean) => void;
  callback: null | ((newColor: number)=>void)
}


const colorSelectController = create<ColorSelectControllerState>((set)=>({
  open: false,
  setOpen: (newState: boolean) => set({open: newState}),
  callback: null,
}))


// Put in root of project
export const ColorSelect = () => {
  const open = colorSelectController((state) => state.open);
  const setOpen = colorSelectController((state) => state.setOpen);
  const callback = colorSelectController((state) => state.callback);
  
  
  const handleColorSelection = (color: number) => {
    if (callback) {
      callback(color);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o)=>{
      setOpen(o);
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Color</DialogTitle>
          <DialogDescription>
            Select a color from the palette below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-8 gap-2">
          {colors.map((color, i)=>{
            return (
              <div onClick={()=>{
                handleColorSelection(i)
              }} key={i} className="w-full aspect-square rounded-lg cursor-pointer" style={{backgroundColor: `rgb(${color.join(",")})`}}></div>
            )
          })}
        </div>
        <DialogFooter>
          <Button
            className=""
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
  )  
}

export async function selectColor(): Promise<(number | null)> {
  return new Promise((resolve) => {
    colorSelectController.setState({
      open: true,
      callback: (newColor) => {
        resolve(newColor);
      },
    });
  });
}