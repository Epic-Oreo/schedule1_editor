import { ReactNode } from "react";
import FileCheck from "./fileCheck";

const EditorLayout = ({children} : {
  children: ReactNode
}) => {



  return (
    <div className="">
      <FileCheck>
        {children}
      </FileCheck>
    </div>
  )
}

export default EditorLayout;