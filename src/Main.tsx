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
import { Routes, Route } from "react-router-dom";
import ShowUser from "./ShowUsers/ShowUser(01)";
import Navbar from "./Navbar";
import Footer from "./Footer";
import UserButton from "./ShowUsers/UsersButtons";
import { lang, LangContext } from "./LangContextProvider";
import PresentationPage from "./PresentationPage/PresentationPage";
import { iTravel, iTravelData } from "./Interface";
import { LargeNumberLike } from "crypto";

export const telegramBotKey = "5531898247:AAG8rxOFIKmlwS6PYBVTuXdTGMqIaSpl5eE";
export let chat_id = 231233238;

export default function Main() {
  const { user: loggedUser } = useUserAuth();
  const [otherUser, setOtherUser] = useState<any>();
  const [user, setUser] = useState<any>({});
  const [usersList, setUsersList] = useState<iTravelData[]>([]);
  const [travelList, setTravelList] = useState<[iTravel?]>([]);
  const [language, setLanguage] = useState<string>("en");
  const [selectedTravel, setSelectedTravel] = useState<iTravel>({
    name: "",
    id: 0,
    createdBy: "",
    userName: "",
  });

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

  function userTravelDataFactory(
    type: "newEmpty" | "collatedLoggedUser" | "collatedOtherUsers",
    tempdata?: iTravelData
  ) {
    return {
      userInfo: {
        displayName:
          type === "collatedOtherUsers"
            ? tempdata && tempdata[selectedTravel.id].userInfo.displayName
            : loggedUser.displayName.split(" ")[0],
        photoURL:
          type === "collatedOtherUsers"
            ? tempdata && tempdata[selectedTravel.id].userInfo.photoURL
            : loggedUser.photoURL,
        uid:
          type === "collatedOtherUsers"
            ? tempdata && tempdata[selectedTravel.id].userInfo.uid
            : loggedUser.uid,
      },
      [selectedTravel.id]: {
        id: selectedTravel.id,
        name: selectedTravel.name,
        headgear:
          type === "newEmpty"
            ? []
            : tempdata && tempdata[selectedTravel.id]?.headgear,
        topgear:
          type === "newEmpty"
            ? []
            : tempdata && tempdata[selectedTravel.id]?.topgear,
        bottomgear:
          type === "newEmpty"
            ? []
            : tempdata && tempdata[selectedTravel.id]?.bottomgear,
        footgear:
          type === "newEmpty"
            ? []
            : tempdata && tempdata[selectedTravel.id]?.footgear,
        extra:
          type === "newEmpty"
            ? []
            : tempdata && tempdata[selectedTravel.id]?.extra,
        userInfo: {
          displayName:
            type === "collatedOtherUsers"
              ? tempdata && tempdata[selectedTravel.id].userInfo.displayName
              : loggedUser.displayName.split(" ")[0],
          photoURL:
            type === "collatedOtherUsers"
              ? tempdata && tempdata[selectedTravel.id].userInfo.photoURL
              : loggedUser.photoURL,
          uid:
            type === "collatedOtherUsers"
              ? tempdata && tempdata[selectedTravel.id].userInfo.uid
              : loggedUser.uid,
        },
      },
    };
  }

  async function watchTravel(travelId:number, travelName:string) {
    const querySnapshot = await getDocs(collection(db, "users"));
    let listTemp: iTravelData[] = [];
    let tempdata: iTravelData = {} as iTravelData;
    querySnapshot.forEach((doc) => {
      tempdata = doc.data() as iTravelData;
      if (tempdata[travelId]) {
        let newUserData = {
          userInfo: {
            displayName:
                tempdata && tempdata[travelId].userInfo.displayName,
            photoURL:
                 tempdata && tempdata[travelId].userInfo.photoURL,
            uid:
                 tempdata && tempdata[travelId].userInfo.uid,
          },
          [selectedTravel.id]: {
            id: travelId,
            name: travelName,
            headgear:
                tempdata && tempdata[travelId]?.headgear,
            topgear:
               tempdata && tempdata[travelId]?.topgear,
            bottomgear:
                 tempdata && tempdata[travelId]?.bottomgear,
            footgear:
                tempdata && tempdata[travelId]?.footgear,
            extra:
                 tempdata && tempdata[travelId]?.extra,
              userInfo: {
                displayName:
                    tempdata && tempdata[travelId].userInfo.displayName,
                photoURL:
                     tempdata && tempdata[travelId].userInfo.photoURL,
                uid:
                     tempdata && tempdata[travelId].userInfo.uid,
              },
          },
        };
        listTemp.push(newUserData as unknown as iTravelData);
      }
    });
    setUsersList(listTemp);
  }

  useEffect(() => {
    async function fetchUsersByTravelsInFirestore() {
      try {
        if (selectedTravel.id) {
          const querySnapshot = await getDocs(collection(db, "users"));
          let listTemp: iTravelData[] = [];
          let tempdata: iTravelData = {} as iTravelData;
          querySnapshot.forEach((doc) => {
            tempdata = doc.data() as iTravelData;
            if (loggedUser) {
              if (tempdata.userInfo.uid === loggedUser.uid) {
                if (!tempdata[selectedTravel?.id]) {
                  let newUserData = userTravelDataFactory("newEmpty");
                  setUser(newUserData);
                  listTemp.push(newUserData as unknown as iTravelData);
                } else {
                  let newUserData = userTravelDataFactory(
                    "collatedLoggedUser",
                    tempdata
                  );
                  setUser(newUserData);
                  listTemp.push(newUserData as unknown as iTravelData);
                }
              } else {
                if (tempdata[selectedTravel.id]) {
                  let newUserData = userTravelDataFactory(
                    "collatedOtherUsers",
                    tempdata
                  );
                  listTemp.push(newUserData as unknown as iTravelData);
                }
              }
            } else {
              if (tempdata[selectedTravel.id]) {
                let newUserData = userTravelDataFactory(
                  "collatedOtherUsers",
                  tempdata
                );
                listTemp.push(newUserData as unknown as iTravelData);
              }
            }
          });
          setUsersList(listTemp);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchUsersByTravelsInFirestore();
  }, [selectedTravel.id, loggedUser]);

  useEffect(() => {
    function telegramAlert() {
      if (loggedUser && loggedUser.displayName) {
        fetch(
          `https://api.telegram.org/bot${telegramBotKey}/sendMessage?chat_id=${chat_id}&text=${loggedUser.displayName} has logged in Travel Organizer `
        );
      } else {
        fetch(
          `https://api.telegram.org/bot${telegramBotKey}/sendMessage?chat_id=${chat_id}&text="unknown user is visiting Travel Organizer" `
        );
      }
    }
    telegramAlert();
  }, [loggedUser]);

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
    //to collect basic usage data from the telegrambot, not in use
    const getBotUpdates = () =>
      fetch(`https://api.telegram.org/bot${telegramBotKey}/getUpdates`).then(
        (response) => console.log(response.json())
      );
    // getBotUpdates();
  }, []);

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
  }, [user]); //user

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
          {usersList.length !== 0 && (
            <UserButton
              travelId={selectedTravel.id}
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
                  user={user.userInfo}
                  loggedUser={loggedUser}
                  travelList={travelList}
                  setTravel={setSelectedTravel}
                  setTravelList={setTravelList}
                  watchTravel={watchTravel}
                />
              }
            />
            <Route
              path="/user"
              element={
                <ShowUser
                  user={user}
                  travelId={selectedTravel.id}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/other"
              element={
                <ShowUser travelId={selectedTravel.id} user={otherUser} />
              }
            />
          </Routes>
        </LangContext.Provider>
        <Footer />
      </div>
    </>
  );
}
