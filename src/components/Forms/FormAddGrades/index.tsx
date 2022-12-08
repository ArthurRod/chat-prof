import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../services/firebase";
import { doc, setDoc } from "firebase/firestore";

import { clearInputs } from "../../../helpers/formUpdateFunctions";
import { useAdmin } from "../../../hooks/useAdmin";

export function FormAddGrades() {
  const { adminUser } = useAdmin();
  const { id } = useParams();
  const [schoolGrade, setSchoolGrade] = useState("");
  const [period, setPeriod] = useState("1º Bimestre");
  const [schoolSubject, setSchoolSubject] = useState("");
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    getTeacherInfos();
  }, [adminUser]);

  const getTeacherInfos = () => {
    if (adminUser) {
      setSchoolSubject(adminUser.schoolSubject!);
      setTeacherName(adminUser.name);
    }
  };

  const addGrade = (e: FormEvent) => {
    e.preventDefault();

    if (id) {
      addGradeDoc(id)
        .then(() => {
          alert("Nota cadastrada com sucesso!");

          clearInputs();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addGradeDoc = async (id: string) => {
    const randomId = Math.floor(Date.now() * Math.random()).toString(36);

    await setDoc(doc(db, "grades", randomId), {
      id: id,
      period: period,
      schoolGrade: schoolGrade,
      schoolSubject: schoolSubject,
      teacherName: teacherName,
    });
  };

  return (
    <main className="main">
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
        />

        <button type="submit" className="btn">
          Adicionar
        </button>
      </form>
    </main>
  );
}
