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

    if (!result) return;

    const listenersWithoutComma = result.replace(/,/g, " ");

    setMonthlyListeners(listenersWithoutComma);
  };

  useEffect(() => {
    setMonthlyListeners("");
    getMonthlyListeners(artistId);
  }, [artistId]);

  // LOADING PART

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
      {monthlyListeners ? (
        <span className="text-span">{monthlyListeners}</span>
      ) : (
        <span className="text-span">{slotMachineNumber.toLocaleString()}</span>
      )}
    </div>
  );
};

export default MonthlyListeners;
