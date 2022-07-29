import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./LoginComponents/firebase";
import { useUserAuth } from "./LoginComponents/UserAuth";
import { Routes, Route, useNavigate } from "react-router-dom";
import ShowUser from "./ShowUsers/ShowUser(01)";
import Navbar from "./Navbar";
import Footer from "./Footer";
import UserButton from "./ShowUsers/UsersButtons";
import { lang, LangContext } from "./LangContextProvider";
import PresentationPage from "./PresentationPage/PresentationPage";
import { iTravel, iTravelData, iUser, iUserInfo } from "./Interface";

export default function Main() {
  const { user: loggedUser } = useUserAuth();
  const [otherUser, setOtherUser] = useState<any>();
  const [user, setUser] = useState<any>({});
  const [selectedTravel, setSelectedTravel] = useState<iTravel>({
    name: "",
    id: 0,
  });
  const [usersList, setUsersList] = useState<iUser[]>([]);
  const [travelList, setTravelList] = useState<[iTravel?]>([]);
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    console.log(user[selectedTravel.id], "in main");
    console.log(user, "in main, full user");
  }, [user]);

  useEffect(() => {
    try {
      //get list of travels
      const getTravelsFromFirestore = async () => {
        const querySnapshotTravels = await getDoc(
          doc(db, "travels", "NTyNtjKvHwnEcbaOI73f")
        );
        let temp2: DocumentData | undefined = querySnapshotTravels.data();
        setTravelList(temp2?.travel);
      };
      getTravelsFromFirestore();
    } catch (e) {
      console.log(e, "error in getTravels");
    }
  }, []);

  useEffect(() => {
    async function fetchUsersByTravelsInFirestore() {
      try {
        if (selectedTravel.id !== 0) {
          const querySnapshot = await getDocs(collection(db, "users"));
          let listTemp: iUser[] = [];
          let tempdata: iTravelData = {} as iTravelData;
          querySnapshot.forEach((doc) => {
            tempdata = doc.data() as iTravelData;
            if (tempdata[selectedTravel?.id] === undefined) {
              let newUserData = {
                userInfo: {
                  displayName: loggedUser.displayName.split(" ")[0],
                  photoURL: loggedUser.photoURL,
                  uid: loggedUser.uid,
                },
                [selectedTravel.id]: {
                  id: selectedTravel.id,
                  name: selectedTravel.name,
                  headgear: [],
                  topgear: [],
                  bottomgear: [],
                  footgear: [],
                  extra: [],
                  userInfo: {
                    displayName: loggedUser.displayName.split(" ")[0],
                    photoURL: loggedUser.photoURL,
                    uid: loggedUser.uid,
                  },
                },
              };
              setUser(newUserData);
            } else {
              let newUserData = {
                userInfo: {
                  displayName: loggedUser.displayName.split(" ")[0],
                  photoURL: loggedUser.photoURL,
                  uid: loggedUser.uid,
                },
                [selectedTravel.id]: {
                  id: selectedTravel.id,
                  name: selectedTravel.name,
                  headgear: tempdata[selectedTravel.id]?.headgear,
                  topgear: tempdata[selectedTravel.id]?.topgear,
                  bottomgear: tempdata[selectedTravel.id]?.bottomgear,
                  footgear: tempdata[selectedTravel.id]?.footgear,
                  extra: tempdata[selectedTravel.id]?.extra,
                  userInfo: {
                    displayName: loggedUser.displayName.split(" ")[0],
                    photoURL: loggedUser.photoURL,
                    uid: loggedUser.uid,
                  },
                },
              };
              setUser(newUserData);
            }
            listTemp.push(tempdata[selectedTravel.id] as unknown as iUser);
          });
          setUsersList(listTemp);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchUsersByTravelsInFirestore();
  }, [selectedTravel, loggedUser]);

  useEffect(() => {
    async function setUserDataInFirestore() {
      if (loggedUser) {
        //get the info of the logged user
        try {
          await setDoc(
            doc(db, "users", loggedUser.uid),
            {
              userInfo: {
                displayName: loggedUser.displayName.split(" ")[0],
                photoURL: loggedUser.photoURL,
                uid: loggedUser.uid,
              },
            },
            { merge: true }
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
    setUserDataInFirestore();
  }, [loggedUser]);

  useEffect(() => {
    async function updateUserDataInFirestore() {
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
    updateUserDataInFirestore();
  }, [user]);

  const HandleLang = () => {
    //for LangContext.Provider sets the value to return from the toggle in a way that can be interpreted by it
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
    setLanguage(language === "en" ? "it" : "en");
  };

  return (
    <>
      <div className="bg-gray-700 relative pt-[60px] pb-5 min-h-full text-white">
        <Navbar toggle={HandleLangToggle} selectedTravel={selectedTravel} />
        <LangContext.Provider value={HandleLang()}>
          {selectedTravel && (
            <UserButton
              travelId={user[selectedTravel.id]?.id}
              user={user}
              users={usersList}
              loggedUser={loggedUser}
              setOtherUser={setOtherUser}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <PresentationPage
                  travelList={travelList}
                  setTravel={setSelectedTravel}
                  setTravelList={setTravelList}
                />
              }
            />
            <Route
              path="/user"
              element={
                <ShowUser
                  user={user}
                  travelId={user[selectedTravel.id]?.id}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/other"
              element={
                <ShowUser
                  travelId={user[selectedTravel.id]?.id}
                  user={otherUser}
                />
              }
            />
          </Routes>
        </LangContext.Provider>
        <Footer />
      </div>
    </>
  );
}
