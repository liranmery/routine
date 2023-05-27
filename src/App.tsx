import { useEffect, useState } from "react";
import styles from "./app.module.css";

interface Item {
  name: string;
  date: string;
}

function App() {
  const [list, setList] = useState<Item[]>(() =>
    JSON.parse(localStorage.getItem("list") ?? "[]")
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
    };

    const name = target.name.value;

    setList([...list, { name, date: new Date().toLocaleString() }]);
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
      <ul className={styles.list}>
        {list.map((item, index) => (
          <li
            key={item.name}
            onDoubleClick={() => handleItemClick(index)}
            className={styles.item}
          >
            <h2>{item.name}</h2>
            <h4>{item.date}</h4>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default App;
