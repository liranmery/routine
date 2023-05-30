import { useEffect, useState } from "react";
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

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

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
        {list.map((item, index) => (
          <li
            key={item.name}
            onDoubleClick={() => handleItemClick(index)}
            className={styles.item}
          >
            <div>
              <h2>{item.name}</h2>
              <h4>{item.date}</h4>
            </div>
            <DaysIndicator date={item.date} max={item.maxDays} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
