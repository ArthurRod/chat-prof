import { GearSix } from "phosphor-react";

import { useAdminType } from "../../hooks/useAdminType";
import { Modal } from "../Modal";
import { UpdateAdminUser } from "../Forms/UpdateAdminUser";
import { UpdateUser } from "../Forms/UpdateUser";
import { SettingsContent } from "./SettingsContent";

import "../../styles/settings-modal.scss";

export function Settings() {
  const { adminType } = useAdminType();

  return (
    <Modal
      title="Configurações"
      className="settings-modal"
      triggerName="settings-button"
      trigger={<GearSix className="button-icon" size={32} color="#ffffff" />}
    >
      <SettingsContent>
        {adminType ? <UpdateAdminUser adminType={adminType} /> : <UpdateUser />}
      </SettingsContent>
    </Modal>
  );
}
