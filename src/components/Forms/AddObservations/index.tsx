import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, doc, setDoc } from "../../../services/firebase";

import { clearForm } from "../../../helpers/clearForm";
import { useAdmin } from "../../../hooks/useAdmin";
import { useAdminAuth } from "../../../hooks/useAdminAuth";

export function AddObservations() {
  const { id } = useParams();
  const { user } = useAdminAuth();
  const { adminUser } = useAdmin();
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

          clearForm("observation-form");
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
  );
}
