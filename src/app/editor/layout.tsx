import { ReactNode } from "react";
import FileCheck from "./fileCheck";
import { ColorSelect } from "@/components/ColorSelect";

const EditorLayout = ({children} : {
  children: ReactNode
}) => {



  return (
    <div className="">
      <FileCheck>
        <ColorSelect/>
        {children}
      </FileCheck>
    </div>
  )
}

export default EditorLayout;