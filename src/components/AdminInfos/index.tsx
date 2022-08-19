import "../../styles/admin-infos.scss";

interface AdminInfosProps {
    adminUserName: string;
    adminUserPhone: string;
}

export function AdminInfos({ adminUserName, adminUserPhone }: AdminInfosProps) {
    return (
        <section className="admin-infos">
            <div className="name">
                <strong>Escola: </strong><span>{adminUserName}</span>
            </div>
            <div className="phone">
                <strong>Telefone: </strong><span>{adminUserPhone}</span>
            </div>
        </section>
    )
}