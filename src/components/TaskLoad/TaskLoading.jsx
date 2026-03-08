// src/components/TaskLoad/TaskLoading.jsx
import { useEffect, useState } from "react";

export function TaskLoading() {
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoad(false);
      console.log("Данные загружены!");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoad) {
    return <p>Идет загрузка...</p>;
  }

  return <p>успешно!</p>;
}
