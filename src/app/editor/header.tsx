import { Button } from "@/components/ui/button";


const EditorHeader = ({setPage}: {
  setPage: (arg0: string)=>void
}) => {
  return (
    <div className="w-full p-3">
      <div className="w-full rounded-lg border p-2 items-center flex">
          <Button className="h-full" variant={"ghost"} onClick={()=>{
            setPage("home")
          }}>General</Button>

          <Button className="h-full" variant={"ghost"} onClick={()=>{
            setPage("home")
          }}>Players</Button>

          <Button className="h-full" variant={"ghost"} onClick={()=>{
            setPage("npcs")
          }}>NPCs</Button>

          <Button className="h-full" variant={"ghost"} onClick={()=>{
            setPage("quests")
          }}>Quests</Button>

          <Button className="h-full" variant={"ghost"} onClick={()=>{
            setPage("dev")
          }}>Dev</Button>
      </div>
    </div>
  )
}

export default EditorHeader;