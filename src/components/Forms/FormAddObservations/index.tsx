import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, doc, setDoc } from "../../../services/firebase";

import { clearInputs } from "../../../helpers/formUpdateFunctions";
import { useAdmin } from "../../../hooks/useAdmin";
import { useAuth } from "../../../hooks/useAuth";

export function FormAddObservations() {
  const { user } = useAuth();
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
      const { name, schoolSubject } = adminUser;

      setTeacherName(name);
      setSchoolSubject(schoolSubject!);
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
      teacherId: user?.uid,
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
          maxLength={50}
          required
        />

        {subject.length === 50 && (
          <span className="warning">Máximo 50 caractéres</span>
        )}

        <textarea
          id="observation-aluno"
          name="observation-aluno"
          placeholder="Digite uma observação sobre o aluno (max 300 caractéres)"
          onChange={(event) => setObservation(event.target.value)}
          value={observation}
          maxLength={300}
          required
        />

        {observation.length === 300 && (
          <span className="warning">Máximo 300 caractéres</span>
        )}

        <button
          disabled={subject.length === 0 || observation.length === 0}
          type="submit"
          className="btn"
        >
          Adicionar
        </button>
      </form>
    </main>
  );
}
