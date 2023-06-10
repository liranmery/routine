import { useEffect, useState } from "react";

export function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const syncDate = () => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  };

  useEffect(syncDate, []);

  return {
    currentDate,
  };
}
