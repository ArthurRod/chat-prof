import { db, doc, deleteDoc } from "../../../services/firebase";
import { PencilSimple, Trash } from "phosphor-react";

import { convertTime } from "../../../helpers/convertTime";
import { Modal } from "../../Modal";
import { Alert } from "../../Alert";
import { UpdateObservation } from "../../Forms/UpdateObservation";
import { useState } from "react";

interface StudentObservationProps {
  id: string;
  dateSeconds: number;
  subject: string;
  observation: string;
  teacherName: string;
  schoolSubject: string;
}

export function StudentObservation({
  id,
  dateSeconds,
  subject,
  observation,
  teacherName,
  schoolSubject,
}: StudentObservationProps) {
  const [alertMessage, setAlertMessage] = useState("");

  async function deleteObservation() {
    if (id) {
      deleteDoc(doc(db, "observations", id))
        .then(() => {
          setAlertMessage(`Observação removida com sucesso.`);

          setTimeout(() => {
            setAlertMessage("");
          }, 3000);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="student-observation">
      <div className="observation-subject">
        <span>
          <strong>Assunto: </strong>
          {subject}
        </span>
      </div>
      <div className="teacher-observation">
        <span>
          <strong>Observação: </strong>
          {observation}
        </span>
      </div>
      <div className="teacher-name">
        <span>
          <strong>Professor: </strong>
          {teacherName}
        </span>
      </div>
      <div className="scholl-subject">
        <span>
          <strong>Matéria: </strong>
          {schoolSubject}
        </span>
      </div>
      <div className="observation-date">
        <span>
          <strong>Data: </strong>
          {convertTime(dateSeconds)}
        </span>
      </div>

      <Modal
        title="Editar Observação"
        triggerName="edit-button"
        trigger={
          <PencilSimple
            className="edit-button-icon"
            size={32}
            color="#FFA500"
          />
        }
      >
        <UpdateObservation
          observationId={id}
          subject={subject}
          observation={observation}
        />
      </Modal>

      <Alert
        title="Confirmar exclusão"
        description=" Deseja remover a observação?"
        triggerName="delete-button"
        trigger={
          <Trash className="delete-button-icon" size={32} color="#ff4040" />
        }
        action={deleteObservation}
      />

      {alertMessage && (
        <Alert title="Aviso" description={alertMessage} defaultOpen={true} />
      )}
    </div>
  );
}
