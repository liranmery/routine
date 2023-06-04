import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { NewAgendaForm } from "./NewAgendaForm";
import { AgendasList } from "./AgendasList";
import { Item } from "./types";

function App() {
  const [list, setList] = useState<Item[]>(() =>
    JSON.parse(localStorage.getItem("list") ?? "[]")
  );
  const [errors, setErrors] = useState({ name: "", maxDays: "" });
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      maxDays: { value: string };
    };

    const name = target.name.value;
    const maxDays = +target.maxDays.value;

    if (!name || !maxDays) {
      setErrors({
        name: !name ? "Name is required" : "",
        maxDays: !maxDays ? "Max Days is required" : "",
      });
      return;
    }

    if (list.some((item) => item.name === name)) {
      setErrors({ name: "Name already exists", maxDays: "" });
      return;
    }

    setList([...list, { name, date: new Date().toLocaleString(), maxDays }]);
  };

  const handleItemClick = (name: string) => {
    const index = list.findIndex((item) => item.name === name);

    setList([
      ...list.slice(0, index),
      ...list.slice(index + 1),
      {
        ...list[index],
        date: new Date().toLocaleString(),
      },
    ]);
  };

  const syncDate = () => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  };

  const setLocalStorage = () => {
    localStorage.setItem("list", JSON.stringify(list));
  };

  useEffect(syncDate, []);
  useEffect(setLocalStorage, [list]);

  return (
    <div className={styles.root}>
      <NewAgendaForm onSubmit={handleSubmit} errors={errors} />
      <AgendasList
        list={list}
        currentDate={currentDate}
        onItemClick={handleItemClick}
      />
    </div>
  );
}

export default App;
