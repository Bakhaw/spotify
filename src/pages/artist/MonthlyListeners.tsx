import { useEffect, useState } from "react";

interface MonthlyListenersProps {
  artistId: string;
}

const MonthlyListeners: React.FC<MonthlyListenersProps> = ({ artistId }) => {
  const [monthlyListeners, setMonthlyListeners] = useState<string | null>();

  const getMonthlyListeners = async (artistId: string) => {
    const res = await fetch(`/api/monthlyListeners?artistId=${artistId}`);
    const { result } = await res.json();

    setMonthlyListeners(result);
  };

  useEffect(() => {
    setMonthlyListeners(null);
    getMonthlyListeners(artistId);
  }, [artistId]);

  return <span>{monthlyListeners}</span>;
};

export default MonthlyListeners;
