import styles from "./App.module.css";
import { NewAgendaForm } from "./NewAgendaForm";
import { AgendasList } from "./AgendasList";
import { useList } from "./hooks/useList";

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
