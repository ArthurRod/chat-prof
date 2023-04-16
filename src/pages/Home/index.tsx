import { useAuth } from "../../hooks/useAuth";
import { Header } from "../../components/Header";
import { Students } from "../../components/Students";

export function Home() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
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
      ) : null}
    </>
  );
}
