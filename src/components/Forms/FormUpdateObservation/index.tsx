import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../services/firebase";
import { doc, setDoc } from "firebase/firestore";

import { clearInputs } from "../../../helpers/formUpdateFunctions";
import { useAdmin } from "../../../hooks/useAdmin";

export function FormUpdateObservation() {
  const { adminUser } = useAdmin();
  const { id } = useParams();
  const [observation, setObservation] = useState("");
  const [schoolSubject, setSchoolSubject] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [subject, setSubject] = useState("");
  const [dateSeconds, setDateSeconds] = useState(0);

  useEffect(() => {
    getTeacherInfos();
    getDateSeconds();
  }, [adminUser]);

  const getTeacherInfos = () => {
    if (adminUser) {
      setSchoolSubject(adminUser.schoolSubject!);
      setTeacherName(adminUser.name);
    }
  };

  const getDateSeconds = () => {
    const date = new Date();

    const dateInSeconds = date.getTime() / 1000;

    setDateSeconds(dateInSeconds);
  };

  const addObservation = (e: FormEvent) => {
    e.preventDefault();

    if (id) {
      addObservationDoc(id)
        .then(() => {
          alert("Observação inserida com sucesso!");

          const inputTargets = document.querySelectorAll(
            "#observation-form input"
          ) as NodeListOf<HTMLInputElement>;
          const textAreaTargets = document.querySelectorAll(
            "#observation-form textarea"
          ) as NodeListOf<HTMLInputElement>;

          clearInputs(inputTargets);
          clearInputs(textAreaTargets);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addObservationDoc = async (id: string) => {
    const randomId = Math.floor(Date.now() * Math.random()).toString(36);

    await setDoc(doc(db, "observations", randomId), {
      id: randomId,
      studentId: id,
      observation: observation,
      observationDate: {
        seconds: dateSeconds,
      },
      subject: subject,
      schoolSubject: schoolSubject,
      teacherName: teacherName,
    });
  };

  return (
    <main className="main">
      <form id="update-observation-form" onSubmit={addObservation}>
        <label htmlFor="subject-observation">Qual o assunto?</label>
        <input
          type="text"
          id="subject-observation"
          name="subject-observation"
          onChange={(event) => setSubject(event.target.value)}
          value={subject}
          required
        />

        <textarea
          id="observation-aluno"
          name="observation-aluno"
          placeholder="Digite uma observação sobre o aluno (max 300 caractéres)"
          onChange={(event) => setObservation(event.target.value)}
          value={observation}
          maxLength={300}
          required
        />

        <button type="submit" className="btn">
          Adicionar
        </button>
      </form>
    </main>
  );
}
