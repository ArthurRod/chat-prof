import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { Students } from "../../components/Students";
import { useAuth } from "../../hooks/useAuth";

export function Home() {
  const { loadingUser, user } = useAuth();

  if (!user || loadingUser) return <Loading />;

  const { name, phone } = user;

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="content">
            <Students userName={name} userPhone={phone} />
          </div>
        </div>
      </main>
    </>
  );
}
