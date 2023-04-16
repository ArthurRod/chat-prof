import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, doc, setDoc } from "../../../services/firebase";

import { useAdmin } from "../../../hooks/useAdmin";
import { useAdminAuth } from "../../../hooks/useAdminAuth";
import { clearForm } from "../../../helpers/clearForm";
import { Alert } from "../../Alert";

export function AddGrades() {
  const { id } = useParams();
  const { adminUserAuth } = useAdminAuth();
  const { adminUser } = useAdmin();
  const [schoolGrade, setSchoolGrade] = useState("");
  const [period, setPeriod] = useState("1º Bimestre");
  const [schoolSubject, setSchoolSubject] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    getTeacherInfos();
  }, [adminUser]);

  const getTeacherInfos = () => {
    if (adminUser) {
      const { name, schoolSubject } = adminUser;

      setTeacherName(name);
      setSchoolSubject(schoolSubject!);
    }
  };

  const addGrade = (e: FormEvent) => {
    e.preventDefault();

    if (id) {
      addGradeDoc(id)
        .then(() => {
          setAlertMessage("Nota cadastrada com sucesso.");

          clearForm("grades-form");

          setTimeout(() => {
            setAlertMessage("");
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addGradeDoc = async (id: string) => {
    const randomId = Math.floor(Date.now() * Math.random()).toString(36);

    await setDoc(doc(db, "grades", randomId), {
      id: randomId,
      studentId: id,
      period: period,
      schoolGrade: schoolGrade,
      schoolSubject: schoolSubject,
      teacherName: teacherName,
      teacherId: adminUserAuth?.uid,
    });
  };

  return (
    <>
      <form id="grades-form" onSubmit={addGrade}>
        <label htmlFor="period">Selecione o período</label>
        <select
          name="period"
          id="period"
          onChange={(event) => setPeriod(event.target.value)}
        >
          <option value="1º Bimestre">1º Bimestre</option>
          <option value="2º Bimestre">2º Bimestre</option>
          <option value="3º Bimestre">3º Bimestre</option>
          <option value="4º Bimestre">4º Bimestre</option>
        </select>

        <label htmlFor="nota-aluno">Nota do aluno</label>
        <input
          type="number"
          id="nota-aluno"
          name="nota-aluno"
          placeholder="Digite a nota do aluno"
          onChange={(event) => setSchoolGrade(event.target.value)}
          value={schoolGrade}
          required
        />

        <button
          disabled={period.length === 0 || schoolGrade.length === 0}
          type="submit"
          className="btn"
        >
          Adicionar
        </button>
      </form>

      {alertMessage && (
        <Alert title="Aviso" description={alertMessage} defaultOpen={true} />
      )}
    </>
  );
}
