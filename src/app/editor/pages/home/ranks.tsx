import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFile } from "@/context/fileContext";
import { relativePath } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Rank = "Street Rat" | "Hoodlum" | "Peddler" | "Hustler" | "Bagman" | "Enforcer" | "Shot Caller" | "Block Boss" | "Underlord" | "Baron" | "Kingpin";
type Tier = "I" | "II" | "III" | "IV" | "V";

const ranks = {
  "Street Rat": 200,
  "Hoodlum": 400,
  "Peddler": 625,
  "Hustler": 825,
  "Bagman": 1025,
  "Enforcer": 1250,
  "Shot Caller": 1450,
  "Block Boss": 1675,
  "Underlord": 1875,
  "Baron": 2075,
  "Kingpin": 2300,
}

const tiers = [
  "I",
  "II",
  "III",
  "IV",
  "V",
]



const RanksCard = () => {
  const [rankValue, setRankValue] = useState<string | null>(null);
  const [tierValue, setTierValue] = useState<string | null>(null);
  const [totalXp, setTotalXp] = useState<string | null>(null);
  const [extraXp, setExtraXp] = useState<string | null>(null);
  const { file } = useFile();


  async function loadData() {
    if (!file) return;
    const rankFile = file.file(relativePath("Rank.json"))[0];
    const rankData = JSON.parse(await rankFile.async("text"));
    setRankValue(Object.keys(ranks)[rankData.Rank]);
    if (rankData.Rank != 10) {
      setTierValue(tiers[rankData.Tier]);
    } else {
      setTierValue(rankData.Tier);
    }
    setTotalXp(rankData.TotalXP);
    setExtraXp(rankData.XP);
  }

  useEffect(()=>{
    if (rankValue != null || rankValue != null) return;

    loadData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if (rankValue == null || tierValue == null) {
    return (<p>Loading</p>);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function addChanges(newRank: Rank, newTier: Tier | number, newTotalXp: number) {

  }

  function updateTotalXp(newRank: Rank, newTier: Tier | number) {
    let newTotal = 0;

    const t = Object.keys(ranks).findIndex((r)=>r === newRank);
    for (let i=0; i < t; i++) {
      newTotal += ranks[Object.keys(ranks)[i] as Rank] * 5
    }

    
    if (Number.isNaN(Number.parseInt(newTier.toString()))) {
      // is not number so not kingpin
      newTier = tiers.findIndex((t)=>t == newTier) + 1
    }

    newTotal += ranks[newRank] * Number(newTier)

    setTotalXp(newTotal.toString());  
  }

  function updateRankSelects(newTotalXp: number) {
    if (Number.isNaN(newTotalXp)) {
      return;
    }
    if (newTotalXp < 200) {
      return; // when changing total xp, it must be above 200
    }


    let remainingXp = newTotalXp - 200;
    let foundRank = null;
    let foundTier = null;
    let leftOver = null;

    for (const i in ranks) {
      let limit = 5
      if (i == "Kingpin") limit = 100000; // higher rank limit then normal for kingpin

      for (let i2 = 0; i2 < limit; i2++) {
        remainingXp -= ranks[i as Rank]
        if (remainingXp < 0) {
          foundRank = i;
          foundTier = i2;
          leftOver = remainingXp + ranks[i as Rank]
          break
        };
      } 
      if (remainingXp < 0) break;
    }

    if (foundTier == null || foundRank == null || leftOver == null) {
      toast.error("Rank not found", {
        "description":"The total xp value might be too high!",
      })
      return;
    }

    setRankValue(foundRank);
    if (foundRank == "Kingpin") {
      setTierValue(foundTier?.toString());
    } else {
      setTierValue(tiers[foundTier]);
    }
    setExtraXp(leftOver.toString());
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rank</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <Label htmlFor="rankSelect" className="mb-1">Rank</Label>
          <Select
            value={rankValue}
            onValueChange={(value) => {
                setRankValue(value);
                setExtraXp("0");
                if (value != "Kingpin") {
                  setTierValue("I");
                  updateTotalXp(value as Rank, "I")
                } else {
                  setTierValue("1");
                  updateTotalXp(value, 1)
                }
            }}
          >
            <SelectTrigger id={"rankSelect"} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(ranks).map((rankKey) => (
                <SelectItem key={rankKey} value={rankKey}>{rankKey}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="tierSelect" className="mb-1">Tier</Label>

          {
            rankValue == "Kingpin" ? (
              <Input type="number" required className="" value={tierValue} onChange={(e)=>{
                setTierValue(e.target.value);
                setExtraXp("0");
                if (Number.parseInt(e.target.value)) {
                  updateTotalXp(rankValue as Rank, Number.parseInt(e.target.value));
                }
              }}/>
            ) : (
              <Select
                value={tierValue}
                onValueChange={(value) => {
                    setTierValue(value);
                    setExtraXp("0");
                    updateTotalXp(rankValue as Rank, value as Tier);
                }}
              >
                <SelectTrigger id={"tierSelect"} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tiers.map((tier) => (
                    <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          }
        </div>
        
        
        <div>
          <Label htmlFor="extraXp" className="mb-1">Extra Xp</Label>
          {extraXp && (
            <Input type="number" disabled id="extraXp" value={extraXp}/>
          )}
        </div>

        <div>
          <Label htmlFor="totalXpInput" className="mb-1">Total Xp (min 200)</Label>
          {totalXp != null && (
            <Input type="number" id="totalXpInput" min={200} value={totalXp} onChange={(e)=>{
              setTotalXp(e.target.value);
              updateRankSelects(Number.parseInt(e.target.value));
            }}/>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

export default RanksCard;
