import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import styles from "./App.module.css";
import { DaysIndicator } from "./DaysIndicator";

interface Item {
  name: string;
  date: string;
  maxDays: number;
}

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

  const handleItemClick = (index: number) => {
    setList([
      ...list.slice(0, index),
      ...list.slice(index + 1),
      {
        ...list[index],
        date: new Date().toLocaleString(),
      },
    ]);
  };

  const compareDaysRatio = (itemA: Item, itemB: Item) => {
    const { date: dateA, maxDays: maxDaysA } = itemA;
    const { date: dateB, maxDays: maxDaysB } = itemB;

    const daysRatioA =
      differenceInCalendarDays(currentDate, new Date(dateA)) / maxDaysA;
    const daysRatioB =
      differenceInCalendarDays(currentDate, new Date(dateB)) / maxDaysB;

    if (daysRatioA < daysRatioB) {
      return 1;
    } else if (daysRatioA > daysRatioB) {
      return -1;
    } else {
      return 0;
    }
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>New agenda</legend>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input type="text" name="name" id="name" />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
          <label className={styles.label} htmlFor="maxDays">
            Max Days
          </label>
          <input type="number" name="maxDays" id="maxDays" />
          {errors.maxDays && <p className={styles.error}>{errors.maxDays}</p>}
        </fieldset>
        <button className={styles.button}>Add</button>
      </form>
      <ul className={styles.list}>
        {[...list].sort(compareDaysRatio).map((item, index) => (
          <li
            key={item.name}
            onDoubleClick={() => handleItemClick(index)}
            className={styles.item}
          >
            <div>
              <h1 className={styles.header}>{item.name}</h1>
              <h2 className={styles.lightColor}>{item.date}</h2>
            </div>
            <DaysIndicator
              date={item.date}
              maxDays={item.maxDays}
              currentDate={currentDate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
