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
import { iTravel, iTravelData, iUser } from "./Interface";

export const telegramBotKey = "5531898247:AAG8rxOFIKmlwS6PYBVTuXdTGMqIaSpl5eE";
export let chat_id = 231233238;

export default function Main() {
  const { user: loggedUser } = useUserAuth();
  const [otherUser, setOtherUser] = useState<any>();
  const [user, setUser] = useState<any>({});
  const [usersList, setUsersList] = useState<iTravelData[]>([]);
  const [travelList, setTravelList] = useState<[iTravel?]>([]);
  const [language, setLanguage] = useState<string>("en");
  const [isWatching, setIsWatching] = useState<boolean>(false);
  const [selectedTravel, setSelectedTravel] = useState<iTravel>({
    name: "",
    id: 0,
    createdBy: "",
    userName: "",
  });
  const navigate = useNavigate();

  const handleDeleteUser = async (id: number) => {
    const docRef = doc(db, "users", loggedUser.uid);
    try {
      const doc = await getDoc(docRef);
      let userCopyByValue = doc.data();
      if (userCopyByValue && userCopyByValue[id]) {
        delete userCopyByValue[id];
      }
      await setDoc(docRef, userCopyByValue);
      setSelectedTravel({
        name: "",
        id: 0,
        createdBy: "",
        userName: "",
      })
      // watchTravel();
    } catch (e) {
      console.log(e);
    }
  };

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

  async function watchTravel() {
    setUsersList([]);

    // setUser({});
    const querySnapshot = await getDocs(collection(db, "users"));
    let listTemp: iTravelData[] = [];
    let tempdata: iTravelData = {} as iTravelData;
    querySnapshot.forEach((doc) => {
      tempdata = doc.data() as iTravelData;
      if (tempdata[selectedTravel.id]) {
        let newUserData = userTravelDataFactory("collatedOtherUsers", tempdata);
        listTemp.push(newUserData as unknown as iTravelData);
      }
    });
    setUsersList(listTemp);
  }

   async function joinTravel() {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      let listTemp: iTravelData[] = [];
      let tempdata: iTravelData = {} as iTravelData;
      querySnapshot.forEach((doc) => {
        tempdata = doc.data() as iTravelData;
        if (loggedUser) {
          if (tempdata.userInfo.uid === loggedUser.uid) {
            if (!tempdata[selectedTravel.id]) {
              let newUserData = userTravelDataFactory("newEmpty");
              setUser(newUserData);
              // setUsersList([
              //   ...usersList,
              //   newUserData as unknown as iTravelData,
              // ]);
              navigate("/user");
              listTemp.push(newUserData as unknown as iTravelData);
            } else {
              let newUserData = userTravelDataFactory(
                "collatedLoggedUser",
                tempdata
              );
              setUser(newUserData);
              // setUsersList([...usersList, newUserData as unknown as iTravelData])
              navigate("/user");
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
        }
      });
      setUsersList(listTemp);
    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    //this allows for the userButtons to be updated correclty, otherwise they lag behind with the dom nd wont show the correct travel selected (it will always show the one before if the function watch travel or join travel are simply called inside travelButtonItem, as the dom is not refreshed). travelButtonItems will set the state of the selectedTravel and isWatching, so the hook checks what function to fire when this is changed
    function selectViewModeOrJoin() {
      if (isWatching) {
        watchTravel();
      } else if (selectedTravel.id !== 0) {
        joinTravel();
      }
    }
    selectViewModeOrJoin();
  }, [selectedTravel, isWatching]);

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
          <UserButton
            travel={selectedTravel}
            user={user}
            users={usersList}
            loggedUser={loggedUser}
            isWatching={isWatching}
            setUser={setUser}
            setOtherUser={setOtherUser}
          />
          <Routes>
            <Route
              path="/"
              element={
                <PresentationPage
                  user={user.userInfo}
                  usersList={usersList}
                  loggedUser={loggedUser}
                  travelList={travelList}
                  setIsWatching={setIsWatching}
                  setTravel={setSelectedTravel}
                  setTravelList={setTravelList}
                  watchTravel={watchTravel}
                  joinTravel={joinTravel}
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
                  handleDeleteUser={handleDeleteUser}
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
