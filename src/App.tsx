import { useEffect, useState } from "react";

function App() {
  const [list, setList] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("list") ?? "[]")
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
    };

    const name = target.name.value;

    setList([...list, name]);
  };

  const handleItemClick = (index: number) => {
    setList([
      ...list.slice(0, index),
      ...list.slice(index + 1),
      ...list.slice(index, index + 1),
    ]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <li key={item} onDoubleClick={() => handleItemClick(index)}>
            {item}
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
