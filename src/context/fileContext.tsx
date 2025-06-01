"use client"
import { loadZipFile } from "@/lib/fileManagment/loadZipFile";
import JSZip from "jszip";
import React, { createContext, useContext, useState } from "react";

type FileContextType = {
  file: JSZip | null;
  setFile: (file: JSZip | null) => void;
  loadZip: (file: File) => Promise<void>;
  changes: Change[];
  setChanges: (newChanges: Change[]) => void;
  addChange: (file: string, path: Path, value: unknown, name: string) => Promise<void>;
  getChange: (file: string, path: Path) => unknown | null;
  deleteChange: (file: string, path: Path) => void;
};

const FileContext = createContext<FileContextType | undefined>(undefined);

export interface Change {
  file: string;
  path: Path;
  value: unknown;
  name: string | null;
}

type Path = (string | number | (() => (string | number)))[];


export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [file, setFile] = useState<JSZip | null>(null);
  const [changes, setChanges] = useState<Change[]>([]);

  async function loadZip(file: File) {
    setFile(await loadZipFile(file))
  }

  
  async function addChange(file: string, path: Path, value: unknown, name:string|null = null): Promise<void> {

    // Check if item item already exists in change list
    const existingIndex = changes.findIndex(
      (change) =>
        change.file === file &&
        JSON.stringify(change.path) === JSON.stringify(path)
    );

    if (existingIndex !== -1) {
      // if it does update
      const updatedChanges = [...changes];
      updatedChanges[existingIndex].value = value;
      setChanges(updatedChanges)
    } else {
      // Add a new change
      setChanges([...changes, { file, path, value, name }]);
    }
    return;
  }

  // * this function can be a little unreliable
  function getChange(file: string, path: Path): unknown | null {
    const change = changes.find(
      (change) =>
        change.file === file &&
        JSON.stringify(change.path) === JSON.stringify(path)
    );
    return change ? change.value : null;
  }

  function deleteChange(file: string, path: Path) {
    const change = changes.find(
      (change) =>
        change.file === file &&
        JSON.stringify(change.path) === JSON.stringify(path)
    );
    if (change) {
      const updatedChanges = changes.filter(
        (c) => c.file !== file || JSON.stringify(c.path) !== JSON.stringify(path)
      );
      setChanges(updatedChanges);
    }
  }


  return (
    <FileContext.Provider value={{ file, setFile, loadZip, changes, setChanges, addChange, getChange, deleteChange}}>
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
};