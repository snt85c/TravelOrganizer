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

export default function Main() {
  const { user } = useUserAuth();
  const [usersList, setUsersList] = useState<Array<DocumentData>>();
  const [loggedUser, setLoggedUser] = useState<DocumentData>();

  useEffect(() => {
    async function setData() {
      //first time a new user logs in, tries to create a new document given the uid
      if (user) {
        try {
          await setDoc(
            doc(db, "users", user.uid),
          {
              displayName: user.displayName.split(" ")[0],
              photoURL: user.photoURL,
              uid: user.uid,
              headgear: [
                {
                  name: "name",
                  description: "descr",
                  available: true,
                  ready: true,
                },
                {
                  name: "name2",
                  description: "descr2",
                  available: true,
                  ready: true,
                },
              ],
            },
            { merge: true }
          );
        } catch (err) {
          console.log(err, "in setData()");
        }
      }
    }
    setData();
  }, [user]);

  useEffect(() => {
    async function setData() {
      //when current user is modified, push to firestore
      if (user) {
        try {
          await updateDoc(doc(db, "users", user.uid), loggedUser);
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
      if (user) {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          let listTemp: Array<DocumentData> = [];
          let currentTemp: DocumentData = {};
          querySnapshot.forEach((doc) => {
            let tempdata = doc.data() ;
            if (tempdata.uid !== user.uid) {
              listTemp.push(tempdata);
            } else {
              currentTemp = tempdata;
            }
          });
          setUsersList(listTemp);
          setLoggedUser(currentTemp);
        } catch (err) {
          console.log(err, "in getData()");
        }
      }
    }
    getData();
  }, [user]);

  useEffect(() => {
    console.log(usersList, loggedUser);
  }, [usersList, loggedUser]);



  return (
    <>
      <div className="bg-gray-700 pt-[60px] min-h-full text-white">
       <ShowUsers user={loggedUser} users={usersList}/>
      </div>
    </>
  );
}
