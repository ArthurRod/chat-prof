import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../services/firebase";
import { doc, setDoc } from "firebase/firestore";

import { clearInputs } from "../../../helpers/formUpdateFunctions";
import { useAdmin } from "../../../hooks/useAdmin";

export function FormAddObservations() {
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
    const date = new Date()

    const dateInSeconds = date.getTime() / 1000

    setDateSeconds(dateInSeconds)
  }

  const addObservation = (e: FormEvent) => {
    e.preventDefault();

    if (id) {
        addObservationDoc(id)
        .then(() => {
          alert("Observação inserida com sucesso!");

          clearInputs();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addObservationDoc = async (id: string) => {
    const randomId = Math.floor(Date.now() * Math.random()).toString(36);

    await setDoc(doc(db, "observations", randomId), {
      id: id,
      observation: observation,
      observationDate: {
        seconds: dateSeconds
      },
      subject: subject,
      schoolSubject: schoolSubject,
      teacherName: teacherName
    });
  };

  return (
    <main className="main">
      <form id="observation-form" onSubmit={addObservation}>
        <label htmlFor="subject-observation">Qual o assunto?</label>
        <input
          type="text"
          id="subject-observation"
          name="subject-observation"
          onChange={(event) => setSubject(event.target.value)}
          value={subject}
        />

        <label htmlFor="observation-aluno">Deixe uma observação</label>
        <textarea
          id="observation-aluno"
          name="observation-aluno"
          placeholder="Digite uma observação sobre o aluno"
          onChange={(event) => setObservation(event.target.value)}
          value={observation}
        />

        <button type="submit" className="btn">
          Adicionar
        </button>
      </form>
    </main>
  );
}
