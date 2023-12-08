"use client";

import { useEffect, useState } from "react";

interface MonthlyListenersProps {
  artistId: string;
}

const MonthlyListeners: React.FC<MonthlyListenersProps> = ({ artistId }) => {
  const [monthlyListeners, setMonthlyListeners] = useState<string>();

  const getMonthlyListeners = async (artistId: string) => {
    const res = await fetch(`/api/monthlyListeners?artistId=${artistId}`);
    const { result } = await res.json();
    const listenersWithoutComma = result.replace(/,/g, " ");

    setMonthlyListeners(listenersWithoutComma);
  };

  useEffect(() => {
    setMonthlyListeners("");
    getMonthlyListeners(artistId);
  }, [artistId]);

  return (
    <span className="w-full text-sm text-span tracking-tighter">
      {monthlyListeners}
    </span>
  );
};

export default MonthlyListeners;
