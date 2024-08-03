import logo from "./logo.svg";
import "./App.scss";
import CheatItem from "./components/CheatItem";
import Loading from "./components/UI/Loading";
import { useData } from "./hooks/useData";
import CheatForm from "./components/CheatForm";
import MainLayout from "./layouts/MainLayout";
import Router from "./routes/Router";

function App() {
  const { error, loading } = useData();
  return (
    <>
      <Router />
    </>
  );
}

export default App;
