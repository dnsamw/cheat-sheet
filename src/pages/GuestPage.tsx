import "../App.css";
import { useData } from "../hooks/useData";
import CheatItem from "../components/CheatItem";
import MainNavigatorLayout from "../layouts/MainNavigatorLayout";
import { useAuth } from "../contexts/authContext";

type Props = {};

function GuestPage({}: Props) {
  const { items, error, loading } = useData();
  const {state} = useAuth();
  return (
    <MainNavigatorLayout>
      <>
        <div style={{marginTop: '20px'}}></div>
        {items?.map((cheatItem: any) => (
          <CheatItem key={cheatItem.id} item={cheatItem} isLoggedIn={!!state?.user}/>
        ))}
      </>
    </MainNavigatorLayout>
  );
}

export default GuestPage;