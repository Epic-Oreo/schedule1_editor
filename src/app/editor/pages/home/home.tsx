"use client"

import { SDInputText } from "@/components/saveDataInputs/text";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RanksCard from "./ranks";


const EditorHome = () => {
  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Game Info</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* <div className="">
            <Label htmlFor="GameVersion" className="mb-1">Game Version</Label>
            <Input type="text" id="GameVersion" disabled value={(fileData["Game.json"] as Record<string, string>)?.GameVersion || ""}/>
          </div> */}
          <SDInputText readOnly title="Game Version" fileName="Game.json" path={["GameVersion"]}/>

          {/* <div className="">
            <Label htmlFor="OrganisationName" className="mb-1">Organisation Name</Label>
            <Input type="text" id="OrganisationName" disabled value={(fileData["Game.json"] as Record<string, string>)?.OrganisationName || ""}/>
          </div> */}
          <SDInputText title="Organisation Name" fileName="Game.json" path={["OrganisationName"]} />

          <SDInputText readOnly title="Seed" fileName="Game.json" path={["Seed"]} />
          
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Money</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          
        <SDInputText type="number" isInt title="Card Balance" fileName="Money.json" path={["OnlineBalance"]} />
        <SDInputText type="number" title="Current Weekly Deposit Sum" fileName="Money.json" path={["WeeklyDepositSum"]} />

        </CardContent>
      </Card>

      <RanksCard/>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Other Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">

          <Button disabled>Unlock all properties</Button>

          
        </CardContent>
      </Card>
      
    </div>
  )
}

export default EditorHome;