import "../../styles/admin-infos.scss";

interface AdminInfosProps {
  adminUserName: string;
  adminUserPhone: string;
  adminUserType: string;
}

export function AdminInfos({
  adminUserName,
  adminUserPhone,
  adminUserType,
}: AdminInfosProps) {
  return (
    <section className="admin-infos">
      <div className="name">
        <strong>{adminUserType === "school" ? <>Escola: </> : <>Professor: </>}</strong>
        <span>{adminUserName}</span>
      </div>
      <div className="phone">
        <strong>Telefone: </strong>
        <span>{adminUserPhone}</span>
      </div>
    </section>
  );
}
