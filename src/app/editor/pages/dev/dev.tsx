import { Textarea } from "@/components/ui/textarea";
import { parseEmbeddedJson } from "@/lib/utils";
import { useState } from "react";


const DevPage = () => {
  const [data, setData] = useState<string>("")
  
  return (
    <div className="p-4">
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
  )
}


export default DevPage;


