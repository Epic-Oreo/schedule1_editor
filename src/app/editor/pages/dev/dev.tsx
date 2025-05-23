import { Textarea } from "@/components/ui/textarea";
import { parseEmbeddedJson } from "@/lib/utils";
import { useState } from "react";


const DevPage = () => {
  const [data, setData] = useState<string>("")
  
  return (
    <div className="p-4">
      <Textarea className="w-64" onChange={(e)=>{
        setData(JSON.stringify(parseEmbeddedJson(e.target?.value), null, 3));
      }}/>

      <pre>
        {data}
      </pre>

      
    </div>
  )
}


export default DevPage;