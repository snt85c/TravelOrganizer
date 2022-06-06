import {
  collection,
  doc,
  DocumentData,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {  useEffect, useState } from "react";
import { db } from "./LoginComponents/firebase";
import { useUserAuth } from "./LoginComponents/UserAuth";
import { Routes, Route, useNavigate } from "react-router-dom";
import ShowUser from "./ShowUsers/ShowUser";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NavButton from "./ShowUsers/NavButtons";
import { lang, LangContext } from "./LangContextProvider";

export interface iUser {
  displayName: string;
  photoURL: string;
  uid: string;
  headgear: iGear[];
  topgear: iGear[];
  bottomgear: iGear[];
  footgear: iGear[];
  extra: iGear[];
}

export interface iGear {
  name: string;
  available: boolean;
  ready: boolean;
}

export default function Main() {
  const { user: loggedUser } = useUserAuth();
  const [otherUser, setOtherUser] = useState<iUser>({
    displayName: "",
    photoURL: "",
    uid: "",
    headgear: [],
    topgear: [],
    bottomgear: [],
    footgear: [],
    extra: [],
  });
  const [usersList, setUsersList] = useState<iUser[]>([]);

  const [user, setUser] = useState<iUser>({
    displayName: "",
    photoURL: "",
    uid: "",
    headgear: [],
    topgear: [],
    bottomgear: [],
    footgear: [],
    extra: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function setAndFetchDataFromFirestore() {
      //immediately set an user with the data provided from the login, otherwise merge the data. afterthis it will get all the data from firestore, creating a list for all the users and settng the logged user
      if (loggedUser) {
        try {
          await setDoc(
            doc(db, "users", loggedUser.uid),
            {
              displayName: loggedUser.displayName.split(" ")[0],
              photoURL: loggedUser.photoURL,
              uid: loggedUser.uid,
            },
            { merge: true}
          );
        } catch (err) {
          console.log(err);
        }
      }
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let listTemp: iUser[] = [];
        let tempdata: iUser = {} as iUser;
        querySnapshot.forEach((doc) => {
          tempdata = doc.data() as iUser;
          if (tempdata.uid === loggedUser?.uid) {
            setUser(tempdata);
            navigate("/user");
          }
          listTemp.push(tempdata);
        });
        setUsersList(listTemp);
      } catch (err) {
        console.log(err);
      }
    }
    setAndFetchDataFromFirestore(); 
  }, [loggedUser]);

  useEffect(() => {
    async function updateDataInFirestore() {
      //when logged user is modified, push to firestore
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
    updateDataInFirestore();
  }, [user]);
  const [language, setLanguage] = useState<string>("en");

  const HandleLang = () => {
    let temp: any;
    switch (language) {
      case "en":
        temp = lang.en;
        break;
      case "it":
        temp = lang.it;
        break;
    }

    return temp;
  };

  const HandleLangToggle = () => {
    setLanguage(language === "en"? "it": "en")
  }

  return (
    <>
      <div className="bg-gray-700 relative pt-[60px] pb-5 min-h-full text-white">
        <Navbar toggle={HandleLangToggle}/>
        <LangContext.Provider value={HandleLang()}>
          <NavButton
            user={user}
            users={usersList}
            loggedUser={loggedUser}
            setOtherUser={setOtherUser}
          />
          <Routes>
            <Route path="/" />
            <Route
              path="/user"
              element={<ShowUser user={user} setUser={setUser} />}
            />
            <Route path="/other" element={<ShowUser user={otherUser} />} />
          </Routes>
        </LangContext.Provider>
        <Footer />
      </div>
    </>
  );
}
