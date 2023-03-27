import { FormEvent, useEffect, useState } from "react";
import { db, doc, setDoc } from "../../../services/firebase";

interface UpdateObservationProps {
  observationId: string;
  subject: string;
  observation: string;
}

export function UpdateObservation({
  observationId,
  subject,
  observation,
}: UpdateObservationProps) {
  const [newSubject, setNewSubject] = useState("");
  const [newObservation, setNewObservation] = useState("");

  useEffect(() => {
    setNewSubject(subject);
    setNewObservation(observation);
  }, []);

  const updateObservation = (e: FormEvent) => {
    e.preventDefault();

    if (newSubject !== subject || newObservation !== observation) {
      updateObservationDoc(observationId)
        .then(() => {
          alert("Observação alterada com sucesso!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const updateObservationDoc = async (observationId: string) => {
    await setDoc(
      doc(db, "observations", observationId),
      {
        subject: newSubject,
        observation: newObservation,
      },
      { merge: true }
    );
  };

  return (
    <form id="update-observation-form" onSubmit={updateObservation}>
      <label htmlFor="subject-observation">Qual o assunto?</label>
      <input
        type="text"
        id="subject-observation"
        name="subject-observation"
        onChange={(event) => setNewSubject(event.target.value)}
        value={newSubject}
        maxLength={50}
        required
      />

      {newSubject.length === 50 && (
        <span className="warning">
          Não é possível adicionar mais carácteres (Máximo 50 caractéres
          atingido)
        </span>
      )}

      <textarea
        id="observation-aluno"
        name="observation-aluno"
        placeholder="Digite uma observação sobre o aluno (máx. 300 caractéres)"
        onChange={(event) => setNewObservation(event.target.value)}
        value={newObservation}
        maxLength={300}
        required
      />

      {newObservation.length === 300 && (
        <span className="warning">
          Não é possível adicionar mais carácteres (Máximo 300 caractéres
          atingido)
        </span>
      )}

      <button
        disabled={subject === newSubject && observation === newObservation}
        type="submit"
        className="btn"
      >
        Alterar
      </button>
    </form>
  );
}
