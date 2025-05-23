import { Textarea } from "@/components/ui/textarea";
import { parseEmbeddedJson } from "@/lib/utils";
import { useState } from "react";


const DevPage = () => {
  const [data, setData] = useState<string>("")
  
  return (
    <div className="p-4">
      <Textarea className="w-96" onChange={(e)=>{
        try {
          setData(JSON.stringify(parseEmbeddedJson(e.target?.value, false), null, 3));
        
        
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          console.log("Parse error");
        }
      }}/>

      <pre>
        {data}
      </pre>

      
    </div>
  )
}


export default DevPage;


