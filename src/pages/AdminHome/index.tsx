import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { db } from "../../services/firebase";

export function AdminHome() {
  const { user } = useAdminAuth();

  useEffect(() => {
    getUserData()
  }, [])

  /*
  
    TODO: UseEffect para persistir os dados do usuário ao recarregar a página
  
  */

  async function getUserData() {
    const userId = user?.uid!;

    const docRef = doc(db, 'escolas', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }
  

  return <p>AdminHome</p>;
}
