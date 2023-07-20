import styles from "./App.module.css";
import { NewAgendaForm } from "../NewAgendaForm/NewAgendaForm.tsx";
import { AgendasList } from "../AgendasList/AgendasList.tsx";
import { useList } from "../../hooks/useList.ts";

function App() {
  const { updateListItem, list, addListItem } = useList();

  return (
    <div className={styles.root}>
      <NewAgendaForm list={list} addListItem={addListItem} />
      <AgendasList list={list} onListItemClick={updateListItem} />
    </div>
  );
}

export default App;
