import logo from './logo.svg';
import './App.scss';
import CheatItem from './components/CheatItem';
import Loading from './components/UI/Loading';
import { useData } from './hooks/useData';
import CheatForm from './components/CheatForm';

function App() {
  const {items, error,loading} = useData();
  return (
    <div className="App">
      {loading && <Loading />}
      {error && <p>Error: {error}</p>}
      <CheatForm />
      {items?.map((cheatItem:any)=><CheatItem key={cheatItem.id} item={cheatItem} />)}
    </div>
  );
}

export default App;
