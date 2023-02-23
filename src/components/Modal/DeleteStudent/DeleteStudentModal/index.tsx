import { db, doc, deleteDoc } from "../../../../services/firebase";

import { useGrades } from "../../../../hooks/useGrades";
import { useObservations } from "../../../../hooks/useObservations";
import { Grade } from "../../../../types/Grade";
import { Observation } from "../../../../types/Observation";

type DeleteStudentModalProps = {
  setIsModalState: (isModalState: boolean) => void;
  studentName: string;
  studentId: string;
};

export function DeleteStudentModal({
  setIsModalState,
  studentName,
  studentId,
}: DeleteStudentModalProps) {
  const { grades } = useGrades(studentId);
  const { observations } = useObservations(studentId);

  function handleDeleteStudent() {
    deleteStudent()
      .then(async () => {
        handleCloseSettings();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteStudent() {
    if (studentId) {
      await deleteDoc(doc(db, "students", studentId));

      deleteStudentGrades(studentId);
      deleteStudentObservations(studentId);

      alert(`Os dados do aluno ${studentName} foram removidos com sucesso`);
    }
  }

  function deleteStudentGrades(studentId: string) {
    if (studentId && grades) {
      grades.map(async (grade: Grade) => {
        if (grade.studentId === studentId) {
          await deleteDoc(doc(db, "grades", grade.id));
        }
      });
    }
  }

  function deleteStudentObservations(studentId: string) {
    if (studentId && observations) {
      observations.map(async (observation: Observation) => {
        if (observation.studentId === studentId) {
          await deleteDoc(doc(db, "observations", observation.id));
        }
      });
    }
  }

  function handleCloseSettings() {
    setIsModalState(false);

    const modal = document.querySelector(".delete-modal.student");

    if (modal) {
      if (modal.classList.contains("open")) modal.classList.remove("open");
    }
  }

  return (
    <div className="delete-modal student">
      <div className="content">
        <p className="warning">
          Ao realizar esta ação os dados do aluno {studentName} serão excluídos,
          deseja proseguir?
        </p>
        <footer>
          <button onClick={handleDeleteStudent} className="btn delete-user">
            Sim
          </button>
          <button onClick={handleCloseSettings} className="btn back">
            Voltar
          </button>
        </footer>
      </div>
    </div>
  );
}
