import { Button } from "@/components/ui/button";
import { useFile } from "@/context/fileContext";


const SaveChangesBar = () => {
  const {changes} = useFile()

  if (changes.length == 0) {
    return;
  }

  return (
    <div className="p-4 absolute bottom-0 left-0 w-full z-40 flex justify-end">
      <Button>Save</Button>
    </div>
  )
}

export default SaveChangesBar;