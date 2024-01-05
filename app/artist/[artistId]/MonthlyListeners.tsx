"use client";

import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";

interface MonthlyListenersProps {
  artistId: string;
}

const MonthlyListeners: React.FC<MonthlyListenersProps> = ({ artistId }) => {
  const [monthlyListeners, setMonthlyListeners] = useState<string>();

  const getMonthlyListeners = async (artistId: string) => {
    const res = await fetch(`/api/monthlyListeners?artistId=${artistId}`);
    const { result } = await res.json();

    if (!result) return;

    const listenersWithoutComma = result.replace(/,/g, " ");

    setMonthlyListeners(listenersWithoutComma);
  };

  useEffect(() => {
    setMonthlyListeners("");
    getMonthlyListeners(artistId);
  }, [artistId]);

  return (
    <div className="w-fit">
      {monthlyListeners ? (
        <div className="text-span">{monthlyListeners}</div>
      ) : (
        <Skeleton className="h-2 w-44 rounded-md bg-span" />
      )}
    </div>
  );
};

export default MonthlyListeners;
