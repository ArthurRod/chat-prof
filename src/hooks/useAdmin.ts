import { useEffect, useState } from "react";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
} from "@firebase/firestore";
import { db } from "../services/firebase";

import { AdminUser } from "../types/AdminUser";
import { useAdminType } from "./useAdminType";
import { useAdminAuth } from "./useAdminAuth";

export function useAdmin() {
  const { user } = useAdminAuth();
  const { adminType } = useAdminType();
  const [adminUser, setAdminUser] = useState<AdminUser>();
  const [loadingAdminUser, setLoadingAdminUser] = useState(false);

  useEffect(() => {
    getAdminData();
  }, [user, adminType]);

  const getAdminData = () => {
    if (user && adminType) {
      setLoadingAdminUser(true);

      try {
        const { uid } = user;

        if (adminType === "teacher") {
          const docRef = doc(db, "teachers", uid);
          createTeacherAdminUser(docRef);
        } else {
          const docRef = doc(db, "schools", uid);
          createSchoolAdminUser(uid, docRef);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingAdminUser(false);
      }
    }
  };

  const createTeacherAdminUser = async (
    docRef: DocumentReference<DocumentData>
  ) => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const { name, phone, email, schoolId, schoolSubject } = userData;

      setAdminUser({
        name: name,
        phone: phone,
        email: email,
        schoolId: schoolId,
        schoolSubject: schoolSubject,
      });
    } else {
      console.log("Os dados do professor não foram encontrados!");
    }
  };

  const createSchoolAdminUser = async (
    uid: string,
    docRef: DocumentReference<DocumentData>
  ) => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const { name, phone, email } = userData;

      setAdminUser({
        uid: uid,
        name: name,
        phone: phone,
        email: email,
      });
    } else {
      console.log("Os dados da escola não foram encontrados!");
    }
  };

  return { loadingAdminUser, adminUser };
}
