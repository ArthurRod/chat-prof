import { Link } from "react-router-dom";
import "../../styles/scholl-teachers.scss";
import { useTeacherStudents } from "../../hooks/useTeacherStudents";

export function TeacherStudents() {
  const { teacherStudents, setIsModified } = useTeacherStudents();

  return (
    <>
      {teacherStudents.length > 0 ? (
        <section className="scholl-teachers">
          <header className="table-header">
            <span className="name">
              <b>Nome</b>
            </span>
            <span className="fathers-phone">
              <b>Telefone dos pais</b>
            </span>
            <span className="delete"></span>
          </header>
          {teacherStudents.map((key: any) => (
            <div key={key.id} className="student">
              <Link
                className="student-link"
                target="_self"
                to={`./edit/${key.id}`}
              >
                <span className="name">{key.name}</span>
                <span className="fathers-phone">{key.fathersPhone}</span>
              </Link>
            </div>
          ))}
        </section>
      ) : (
        <section className="teacher-no-students">
          <p>
            Não existem alunos cadastrados... Para cadastrar novos alunos clique
            no botão adicionar abaixo
          </p>
        </section>
      )}
    </>
  );
}
