import { CombinedPlayerData } from "./types";
import { useQuery } from "@tanstack/react-query";
import { fetchCashAmount, getSteamUserData } from "./utils";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useMemo } from "react";
import PlayerEditButton from "./PlayerEdit";

const PlayerCard = ({ player }: { player: CombinedPlayerData }) => {
  const { isPending, data, isError } = useQuery({
    queryKey: ["steamUser", player.Data.PlayerCode],
    queryFn: () => getSteamUserData(player.Data.PlayerCode),
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });

  const cashBalance = useMemo(
    () => Math.round(fetchCashAmount(player.Inventory) || -1),
    [player.Inventory]
  );

  return (
    <div className="p-4 bg-card rounded-lg flex relative">
      {isError && (
        <div className="w-2 h-2 bg-destructive absolute top-2 left-2 rounded-full"></div>
      )}
      <div className="w-20 h-20 flex-none">
        {isPending && <Skeleton className="w-full h-full rounded-full" />}
        {data && !isPending && (
          <Image
            className="w-full h-full rounded-full object-cover"
            alt="hello"
            width={50}
            height={50}
            src={data.avatarfull}
          />
        )}
        {isError && (
          <div className="w-full h-full flex justify-center items-center text-2xl">Error</div>
        )}
      </div>
      <div className="py-2 px-4 flex flex-col w-full">
        {isPending && <Skeleton className="w-full h-6" />}
        {data && (
          <h2 className="text-xl text-card-foreground">
            {data.personaname}
          </h2>
        )}
        <h3 className="text-card-foreground/70">{player.folderName}</h3>
        <h3 className="text-card-foreground/70">
          ${cashBalance >= 0 ? cashBalance : "invalid"}
        </h3>
      </div>
      <PlayerEditButton player={player} steamUser={data}/>
    </div>
  );
};

export default PlayerCard;
