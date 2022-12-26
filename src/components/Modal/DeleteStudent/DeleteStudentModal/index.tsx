import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../services/firebase";
import { useGrades } from "../../../../hooks/useGrades";
import { useObservations } from "../../../../hooks/useObservations";

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

      deleteStudentGrades(studentId)
      deleteStudentObservations(studentId)

      alert(`Os dados do aluno ${studentName} foram removidos com sucesso`);
    }
  }

  function deleteStudentGrades(studentId: string) {
    if (studentId && grades) {

      grades.map(async (key: any) => {

        if(key.studentId === studentId) {

          await deleteDoc(doc(db, "grades", key.id));

        }

      })
    }
  }

  function deleteStudentObservations(studentId: string) {
    if (studentId && observations) {

      observations.map(async (key: any) => {

        if(key.studentId === studentId) {

          await deleteDoc(doc(db, "observations", key.id));

        }

      })
    }
  }

  async function handleCloseSettings() {
    setIsModalState(false);

    let modal = document.querySelector(".delete-modal.student");

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
