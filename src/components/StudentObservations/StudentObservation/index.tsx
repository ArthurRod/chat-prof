import { useEffect, useState } from "react";
import { DeleteObservation } from "../../Modal/DeleteObservation";
import { UpdateObservation } from "../../Modal/UpdateObservation";

import "../../../styles/student-observation.scss";

interface StudentObservationProps {
  id: string;
  data: any;
  subject: string;
  observation: string;
  teacherName: string;
  schoolSubject: string;
}

export function StudentObservation({
  id,
  data,
  subject,
  observation,
  teacherName,
  schoolSubject,
}: StudentObservationProps) {
  const [isUpdateObservationOpen, setIsUpdateObservationOpen] = useState(false);

  useEffect(() => {
    handleOpenSettings();
  }, [isUpdateObservationOpen]);

  function convertTime(data: any) {
    const timeSeconds = data.observationDate.seconds;
    const date = new Date(timeSeconds * 1000);
    const dateFormatBr = date.toLocaleDateString("pt-BR");

    return dateFormatBr;
  }

  function handleOpenSettings() {
    let updateDataModal = document.querySelector(".update-modal");

    setTimeout(() => {
      if (updateDataModal) {
        updateDataModal.classList.add("open");
      }
    }, 1);
  }

  return (
    <>
      <div className="student-observation">
        <div
          className="observation"
          onClick={() => {
            setIsUpdateObservationOpen(true);
          }}
        >
          <span className="observation-subject">
            <strong>Assunto: </strong>
            {subject}
          </span>
          <span className="teacher-observation">
            <strong>Observação: </strong>
            {observation}
          </span>
          <span className="teacher-name">
            <strong>Professor: </strong>
            {teacherName}
          </span>
          <span className="scholl-subject">
            <strong>Matéria: </strong>
            {schoolSubject}
          </span>
          <span className="observation-date">
            <strong>Data: </strong>
            {convertTime(data)}
          </span>
        </div>
        
        <DeleteObservation observationId={id} />
      </div>

      {isUpdateObservationOpen && (
        <UpdateObservation
          setIsModalState={setIsUpdateObservationOpen}
          observationId={id}
          subject={subject}
          observation={observation}
        />
      )}
    </>
  );
}
