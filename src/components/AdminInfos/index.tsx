import "../../styles/admin-infos.scss";

interface AdminInfosProps {
  adminUserName: string;
  adminUserPhone: string;
  schoolSubject?: string;
}

export function AdminInfos({
  adminUserName,
  adminUserPhone,
  schoolSubject,
}: AdminInfosProps) {
  return (
    <section className="admin-infos" aria-label="Seção informações do usuário">
      <div className="name" aria-label="Nome do usuário">
        <h1>{adminUserName}</h1>
      </div>
      <div className="phone" aria-label="Telefone do usuário">
        <b>Telefone: </b>
        <span>{adminUserPhone}</span>
      </div>
      {schoolSubject && (
        <div className="subject" aria-label="Matéria do usuário">
          <b>Matéria: </b>
          <span>{schoolSubject}</span>
        </div>
      )}
    </section>
  );
}
