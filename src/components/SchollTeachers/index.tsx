import { useSchollTeachers } from "../../hooks/useSchollTeachers";
import { Link } from "react-router-dom";
import "../../styles/scholl-teachers.scss";
import { DeleteTeacher } from "../Modal/DeleteTeacher";
import { useEffect } from "react";

export function SchollTeachers() {
  const { schollTeachers, setSchollTeachers } = useSchollTeachers();

  useEffect(() => {
  }, [schollTeachers]);

  return (
    <>
      {schollTeachers.length > 0 ? (
        <section className="scholl-teachers">
          <header className="table-header">
            <span className="name">
              <b>Nome</b>
            </span>
            <span className="email">
              <b>E-mail</b>
            </span>
            <span className="phone">
              <b>Telefone</b>
            </span>
            <span className="delete"></span>
          </header>
          {schollTeachers.map((key: any) => (
            <div key={key.uid} className="teacher">
              <Link
                className="teacher-link"
                target="_self"
                to={`./edit/${key.uid}`}
              >
                <span className="name">{key.name}</span>
                <span className="email">{key.email}</span>
                <span className="phone">{key.phone}</span>
              </Link>
              <DeleteTeacher setSchollTeachers={setSchollTeachers} teacherId={key.uid} teacherName={key.name} />
            </div>
          ))}
        </section>
      ) : (
        <section className="scholl-no-teachers">
          <p>
            Não existem professores cadastrados nesta escola... Para cadastrar
            novos professores clique no botão adicionar abaixo
          </p>
        </section>
      )}
    </>
  );
}
