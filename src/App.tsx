import { useState } from "react";

function App() {
  const [list, setList] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
    };

    const name = target.name.value;

    setList([...list, name]);
  };

  return (
    <div>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
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
