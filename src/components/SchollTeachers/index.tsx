import { useSchollTeachers } from "../../hooks/useSchollTeachers";
import "../../styles/scholl-teachers.scss";

export function SchollTeachers() {
  const { schollTeachers } = useSchollTeachers();

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
          </header>
          {schollTeachers.map((key: any) => (
            <div key={key.name} className="teacher">
              <span className="name">{key.name}</span>
              <span className="email">{key.email}</span>
              <span className="phone">{key.phone}</span>
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
