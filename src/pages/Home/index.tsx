import { Header } from "../../components/Header";
import { Students } from "../../components/Students";
import { useAuth } from "../../hooks/useAuth";

export function Home() {
  const { user } = useAuth();

  if(!user) return <h3>Loading...</h3>

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="content">
            <Students userName={user.name} userPhone={user.phone} />
          </div>
        </div>
      </main>
    </>
  );
}
