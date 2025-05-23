"use client"
import { useFile } from "@/context/fileContext";
import { ReactNode } from "react"


const FileCheck = ({children} : {
  children: ReactNode
}) => {
  const {file} = useFile();


  if (!file) {
    try {
      if (location != undefined) {location.href = "/";}
    } catch (e) {
      console.log(e);
    }
    return <></>;
  }

  return (
    <>{children}</>
  )
}

export default FileCheck;