import {
  collection,
  doc,
  DocumentData,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./LoginComponents/firebase";
import { useUserAuth } from "./LoginComponents/UserAuth";
import ShowUsers from "./ShowUsers/ShowUsers";

export interface iUser {
  displayName: string;
  photoURL: string;
  uid: string;
  headgear: iGear[];
  topgear: iGear[];
  bottomgear: iGear[];
  footgear: iGear[];
}

export interface iGear {
  name: string;
  description: string;
  available: boolean;
  ready: boolean;
}

export default function Main() {
  const { user: loggedUser } = useUserAuth();
  const [usersList, setUsersList] = useState<iUser[]>([]);
  const [user, setUser] = useState<iUser>({
    displayName: "",
    photoURL: "",
    uid: "",
    headgear: [],
    topgear: [],
    bottomgear: [],
    footgear: [],
  });

  useEffect(() => {
    async function setData() {
      //first time a new user logs in, tries to create a new document given the uid
      if (loggedUser) {
        try {
          await setDoc(
            doc(db, "users", loggedUser.uid),
            {
              displayName: loggedUser.displayName.split(" ")[0],
              photoURL: loggedUser.photoURL,
              uid: loggedUser.uid,
            },
            { merge: true }
          );
        } catch (err) {
          console.log(err, "in setData()");
        }
      }
    }
    setData();
  }, [loggedUser]);

  useEffect(() => {
    async function getData() {
      //when the user is logged in, get the users from firestore and sort them
      if (loggedUser) {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          let listTemp: iUser[] = [];
          let tempdata: iUser = {} as iUser;
          querySnapshot.forEach((doc) => {
            tempdata = doc.data() as iUser;
            console.log(tempdata);
            if (tempdata.uid !== loggedUser.uid) {
              listTemp.push(tempdata);
            } else {
              setUser(tempdata);
            }
          });
          setUsersList(listTemp);
        } catch (err) {
          console.log(err, "in getData()");
        }
      }
    }
    getData();
  }, [loggedUser]);

  useEffect(() => {
    async function updateData() {
      //when current user is modified, push to firestore
      if (loggedUser) {
        try {
          await updateDoc(
            doc(db, "users", loggedUser.uid),
            user as DocumentData
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
    updateData();
  }, [user]);

  useEffect(() => {
    console.log(user);
  }, [user, usersList]);

  return (
    <>
      <div className="bg-gray-700 pt-[60px] min-h-full text-white">
        {user && <ShowUsers user={user} setUser={setUser} users={usersList} />}
      </div>
    </>
  );
}
