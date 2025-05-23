"use client"
import { JSX, useMemo, useState } from "react";
import EditorHeader from "./header";
import EditorHome from "./pages/home/home";
import { Button } from "@/components/ui/button";
import { useFile } from "@/context/fileContext";
import SaveChangesBar from "./saveButton";
import QuestsPage from "./pages/quests/quests";
import DevPage from "./pages/dev/dev";
import NPCsPage from "./pages/npc/NPCs";


const pages: Record<string, ()=>JSX.Element> = {
  "home": EditorHome,
  "quests": QuestsPage,
  "dev": DevPage,
  "npcs": NPCsPage,
}


const EditorPage = () => {

  const [page, setPage] = useState('home');
  const {changes, setChanges} = useFile()

  const PageComponent = useMemo(()=>{
    if (pages[page]) {
      return pages[page]
    } else {
      // eslint-disable-next-line react/display-name
      return () => <p>None</p>
    }
  }, [page]);

  return (
    <div>
      <EditorHeader setPage={setPage}/>
      <PageComponent/>
      <SaveChangesBar/>


      <div className="fixed bottom-2 left-2 flex z-50 gap-1">
        <Button variant="destructive" onClick={()=>{
          console.log(changes);
        }}>Get Changes</Button>
        <Button variant="destructive" className="" onClick={()=>{
          setChanges([]);
        }}>Clear Changes</Button>
        <Button variant="destructive" className="" onClick={()=>{
          const current_page = page;
          setPage("")
          setTimeout(()=>setPage(current_page), 200);
        }}>Reload</Button>
      </div>
    </div>
  )
}

export default EditorPage;