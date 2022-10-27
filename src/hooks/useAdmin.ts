import { doc, getDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { AdminUser } from '../types/AdminUser';
import { useAdminType } from './useAdminType';
import { useAuth } from './useAuth';

export function useAdmin() {
  const { user } = useAuth();
  const { adminType } = useAdminType();
  const [adminUser, setAdminUser] = useState<AdminUser>();

  useEffect(() => {

    if (user) {
      getAdminData();
    }

  }, [adminType]);

  const getAdminData = async () => {
    if (user && adminType) {

      let docRef = doc(db, "escolas", user.uid.toString());

      if (adminType.type === "teacher") {

        docRef = doc(db, "teachers", user.uid.toString());

      }

      let docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data();

        setAdminUser({
          name: userData.name,
          phone: userData.phone,
          email: userData.email,
          schollId: user.uid
        });

      } else {

        console.log("Dados não encontrados!");
        
      }
    }
  };

  return { adminUser, setAdminUser };
}