import { useParams } from "react-router-dom";
import { useObservations } from "../../hooks/useObservations";
import { useState } from 'react';
import { Observation } from "../../types/Observation";
import { useEffect } from 'react';

export function StudentObservations() {
  const { id } = useParams();
  const { observations } = useObservations(id);
  const [ orderObservations, setOrderObservations ] = useState<Observation[]>([]);

  useEffect(()=>{

    handleOrderObservations();

  },[observations])

  function handleOrderObservations () {
    if(observations && observations.length > 0) {

      let orderedObservations = observations.sort((x: Observation, y: Observation) => {
        return y.observationDate.seconds - x.observationDate.seconds
      })

      setOrderObservations(orderedObservations)
    }
  }

  function convertTime(key: any) {
    const timeSeconds = key.observationDate.seconds 
    const date = new Date(timeSeconds * 1000)
    const dateFormatBr = date.toLocaleDateString("pt-BR")
    
    return dateFormatBr;
  }

  return (
    <section className="student-observations">
        {orderObservations && orderObservations.length > 0 ? 
            orderObservations.map((key: any, index: any) => (
                <div key={index} className="observation">
                    <span className="observation-subject">Assunto: {key.subject}</span>
                    <span className="teacher-observation">Observação: {key.observation}</span>
                    <span className="teacher-name">Professor: {key.teacherName}</span>
                    <span className="scholl-subject">Matéria: {key.schoolSubject}</span>
                    <span className="observation-date">Data: {convertTime(key)}</span>
                </div>
            ))
        :
            <div className="no-observations">Não existem observações cadastradas para este aluno</div>
        }
    </section>
  )
}
