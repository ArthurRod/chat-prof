import { doc, getDoc, setDoc } from "@firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import "../../styles/edit.scss"

import { Header } from "../../components/Header";
import { StudentGrades } from '../../components/StudentGrades/index';

export function StudentEdit() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [fathersPhone, setFathersPhone] = useState("");

  useEffect(() => {
    getStudentData();
  }, []);

  const getStudentData = async () => {
    if (id) {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        setName(userData.name)
        setFathersPhone(userData.fathersPhone)

      } else {

        console.log("Não foi possível encontrar os dados do aluno");
        
      }
    }
  };

  const updateStudent = async (e: FormEvent) => {
    e.preventDefault();

    let isEmpty = isEmptyInputs();
    let sucesso = document.querySelector("form .sucesso") as HTMLElement

    if(!isEmpty) {

      if (id) {
        await setDoc(doc(db, "students", id), {
          name: name,
          fathersPhone: fathersPhone,
        }, { merge: true });

        sucesso.style.display = "flex"

        setTimeout(() => {
          sucesso.style.display = "none"
        }, 2000);
      }

    }
  };

  const isEmptyInputs = () => {
    let inputs = document.querySelectorAll("form input") as NodeListOf<HTMLInputElement>
    let erro = document.querySelector("form .erro") as HTMLElement
    let isEmptyInputs = false;

    inputs.forEach(element => {
      if(element.value.length === 0) {

        element.style.backgroundColor = "#FF4040"

        erro.style.display = "flex"

        isEmptyInputs = true

        setTimeout(() => {
          erro.style.display = "none"
        }, 5000);
        
      } else {

        element.style.backgroundColor = "#fff"

      }
    })

    return isEmptyInputs;
  };

  const assignData = (event: any, alterarDado: (parametro: string) => void) => {

    if(event.target.value !== 0) {
      event.target.style.backgroundColor = "#fff"
      alterarDado(event.target.value)
    }
    
  };

  return (
    <>
      <Header />
      <main className="main edit">
        <div className="container">
          <div className="content">
            <div className="student-data">
              <h3 className="title">Editar aluno</h3>
              <form onSubmit={updateStudent}>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite um novo nome"
                  onChange={(event) => assignData(event, setName)}
                  value={name}
                />
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  placeholder="Digite um novo telefone"
                  onChange={(event) => assignData(event, setFathersPhone)}
                  value={fathersPhone}
                />

                <span className="erro" style={{display : 'none'}}>Preencha corretamente os dados</span>

                <span className="sucesso" style={{display : 'none'}}>Os dados do aluno foram alterados com sucesso</span>

                <footer>
                  <button type="submit" className="btn">Alterar</button>
                  <a href="/admin-home" className="btn back">Voltar</a>
                </footer>
                
              </form>
            </div>
            <StudentGrades />
          </div>
        </div>
      </main>
    </>
  );
}
