import { useEffect } from "react";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { useStudent } from "../../hooks/useStudent";

export function Home() {
  const { user } = useAuth();
  const { studentsData } = useStudent(user?.phone);

  useEffect(() => {
    console.log(studentsData);
  }, [studentsData]);

  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="content"></div>
        </div>
      </main>
    </>
  );
}
