"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface MonthlyListenersProps {
  artistId: string;
}

const MonthlyListeners: React.FC<MonthlyListenersProps> = ({ artistId }) => {
  const getMonthlyListeners = async () => {
    const res = await fetch(`/api/monthlyListeners?artistId=${artistId}`);
    const { result } = await res.json();

    if (!result) return;

    const listenersWithoutComma = result.replace(/,/g, " ");

    return listenersWithoutComma;
  };

  const {
    isPending,
    error,
    data: monthlyListeners,
  } = useQuery({
    queryKey: ["getMonthlyListeners", artistId],
    queryFn: getMonthlyListeners,
  });

  const [slotMachineNumber, setSlotMachineNumber] = useState<number>(0);

  useEffect(() => {
    function generateRandomNumber(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function simulateSlotMachineAnimation() {
      function updateNumber() {
        setSlotMachineNumber(generateRandomNumber(100000, 99999999));
        setTimeout(updateNumber, 30);
      }

      function startAnimation() {
        updateNumber();
      }

      startAnimation();
    }

    simulateSlotMachineAnimation();
  }, []);

  return (
    <div className="w-fit">
      {isPending ? (
        <span className="text-span">{slotMachineNumber.toLocaleString()}</span>
      ) : (
        <span className="text-span">{monthlyListeners}</span>
      )}
    </div>
  );
};

export default MonthlyListeners;
