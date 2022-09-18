import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  iTravelData,
  iTravelButtonPropsPackage,
  iUsersStatePropsPackage,
  iReducerState,
  iReducerAction,
} from "../Interface";
import { useEffect, useReducer, useState } from "react";
import { db } from "../LoginComponents/firebase";
import { useUserAuth } from "../LoginComponents/UserAuth";
import { Routes, Route, useNavigate } from "react-router-dom";
import ShowUser from "../ShowUsersComponent/ShowUser(01)";
import Navbar from "./Navbar";
import Footer from "./Footer";
import UserButton from "../PresentationPageComponent/UsersButtons";
import { lang, LangContext } from "./LangContextProvider";
import PresentationPage from "../PresentationPageComponent/PresentationPage";

export const telegramBotKey = "5531898247:AAG8rxOFIKmlwS6PYBVTuXdTGMqIaSpl5eE";
export let chat_id = 231233238;

export default function Main() {
  const navigate = useNavigate();

  const { user: loggedUser } = useUserAuth();
  //info from the googleLoginComponent

  const init = {
    user: {},
    otherUser: {},
    usersList: [],
    travelList: [],
    selectedTravel: {},
    firebaseUsers: [],
  };

  const reducer = (
    state: iReducerState,
    action: iReducerAction
  ) => {
    switch (action.type) {
      case "ADD-FIREBASE-TRAVELS":
        return { ...state, travelList: action.payload };
      case "ADD-FIREBASE-USERS":
        return { ...state, firebaseUsers: action.payload };
      case "ADD-USERS-LIST":
        return { ...state, usersList: action.payload };
      case "SET-LOGGED-USER":
        return { ...state, user: action.payload, otherUser: {} };
      case "MODIFY-USER":
        return { ...state, user: action.payload };
      case "SET-OFFLINE-USER":
        return { ...state, otherUser: action.payload, user: {} };
      case "DETERMINE-USER":
        if (loggedUser) {
          if (action.payload.uid !== loggedUser?.uid) {
            return { ...state, otherUser: action.payload.user, user: {} };
          } else {
            return { ...state, user: action.payload.user, otherUser: {} };
          }
        } else {
          return { ...state, otherUser: action.payload.user, user: {} };
        }
      case "SELECT-TRAVEL":
        return { ...state, selectedTravel: action.payload };
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, init);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (data.user && data.user.userInfo) {
      navigate("/user");
    } else {
      navigate("/other");
    }
  }, [data.user, data.otherUser]);

  const [language, setLanguage] = useState<string>("en");
  //select the language with the HandleLangToggle in the navbar

  const [isShowUserButton, setIsShowUserButton] = useState<boolean>(false);
  //toggle userButtons visualization

  const [isWatching, setIsWatching] = useState(false);
  //triggers watchTravel() when clicking on the travel button and generate a list of users in usersButton

  const [isJoining, setIsJoining] = useState(false);
  //triggers JoinTravel() when clicking on the join button

  const [trigger, setTrigger] = useState<number>(0);
  //trigger in useEffect to have the joinTravel or watchTravel function. works  by setting Date.now() as value so that it will trigger a re-render even if the user clicks on the same travelItemButton

  //object that will contain the props that needs to be passed down to other components.
  const travelButtonPropsPackage: iTravelButtonPropsPackage = {
    isShowUserButton,
    setIsShowUserButton,
    isWatching,
    setIsWatching,
    isJoining,
    setIsJoining,
    trigger,
    setTrigger,
  };

  //object that will contain the props that needs to be passed down to other components.
  const usersStatePropsPackage: iUsersStatePropsPackage = {
    loggedUser,
    data,
    dispatch,
  };

  //STARTING POINT
  useEffect(() => {
    navigate("/");
    try {
      const getTravelsAndUsersFromFirestore = async () => {
        const querySnapshotTravels = await getDoc(
          doc(db, "travels", "NTyNtjKvHwnEcbaOI73f")
        );
        let temp2: DocumentData | undefined = querySnapshotTravels.data();
        dispatch({ type: "ADD-FIREBASE-TRAVELS", payload: temp2?.travel });
        const querySnapshotUsers = await getDocs(collection(db, "users"));
        let tempdata: iTravelData = {} as iTravelData;
        let listTemp: iTravelData[] = [];
        querySnapshotUsers.forEach((doc) => {
          tempdata = doc.data() as iTravelData;
          listTemp.push(tempdata as unknown as iTravelData);
        });
        dispatch({ type: "ADD-FIREBASE-USERS", payload: listTemp });
      };
      getTravelsAndUsersFromFirestore();
    } catch (e) {
      console.log(e, "error in getTravelsAndUsers");
    }
  }, []);

  async function watchTravel() {
    let listTemp: iTravelData[] = [];
    data.firebaseUsers.forEach((userData: iTravelData) => {
      if (userData[data.selectedTravel.id]) {
        let newUserData = userTravelDataFactory("isWatching", userData);
        listTemp.push(newUserData as unknown as iTravelData);
      }
    });
    dispatch({ type: "ADD-USERS-LIST", payload: listTemp });
  }

  async function joinTravel() {
    data.firebaseUsers.forEach((userData: iTravelData) => {
      if (loggedUser && userData.userInfo.uid === loggedUser.uid) {
        if (!userData[data.selectedTravel.id]) {
          let newUserData = userTravelDataFactory("isJoining", userData);
          dispatch({ type: "SET-LOGGED-USER", payload: newUserData });
        }
      }
    });
    navigate("/user");
  }

  function userTravelDataFactory(
    //generates a new data object depending if the user is joining or if he's watching. if he's joining it will get the data from loggedUser and initialize the gear keys as empty arrays, otherwise it will get the data from the selected keys
    type: "isJoining" | "isWatching",
    tempdata?: iTravelData
  ) {
    return {
      userInfo: {
        displayName:
          type === "isWatching"
            ? tempdata && tempdata[data.selectedTravel.id].userInfo.displayName
            : loggedUser.displayName.split(" ")[0],
        photoURL:
          type === "isWatching"
            ? tempdata && tempdata[data.selectedTravel.id].userInfo.photoURL
            : loggedUser.photoURL,
        uid:
          type === "isWatching"
            ? tempdata && tempdata[data.selectedTravel.id].userInfo.uid
            : loggedUser.uid,
      },
      [data.selectedTravel.id]: {
        id: data.selectedTravel.id,
        name: data.selectedTravel.name,
        headgear:
          type === "isJoining"
            ? []
            : tempdata && tempdata[data.selectedTravel.id]?.headgear,
        topgear:
          type === "isJoining"
            ? []
            : tempdata && tempdata[data.selectedTravel.id]?.topgear,
        bottomgear:
          type === "isJoining"
            ? []
            : tempdata && tempdata[data.selectedTravel.id]?.bottomgear,
        footgear:
          type === "isJoining"
            ? []
            : tempdata && tempdata[data.selectedTravel.id]?.footgear,
        extra:
          type === "isJoining"
            ? []
            : tempdata && tempdata[data.selectedTravel.id]?.extra,
        userInfo: {
          displayName:
            type === "isWatching"
              ? tempdata &&
                tempdata[data.selectedTravel.id].userInfo.displayName
              : loggedUser.displayName.split(" ")[0],
          photoURL:
            type === "isWatching"
              ? tempdata && tempdata[data.selectedTravel.id].userInfo.photoURL
              : loggedUser.photoURL,
          uid:
            type === "isWatching"
              ? tempdata && tempdata[data.selectedTravel.id].userInfo.uid
              : loggedUser.uid,
        },
      },
    };
  }

  useEffect(() => {
    //this allows for the userButtons to be updated correctly, otherwise they lag behind with the dom and wont show the correct travel selected (it will always show the one before if the function watch travel or join travel are simply called inside travelButtonItem, as the dom is not refreshed). travelButtonItems will set the state of the selectedTravel and isWatching, so the hook checks what function to fire when this is changed. trigger is populated with Date.now() in conjunction with isWatching and isjoining  when the user click somewhere that should set him on this pathway. this allows for re-render of the component if the user clicks on the item twice, otherwise the userButton would just close and it will need to cick on another travel and then click back to make it work. this solves it.
    function openUserButtonListOnScreen() {
      if (isWatching) {
        watchTravel();
      } else if (isJoining) {
        joinTravel();
      }
    }
    openUserButtonListOnScreen();
  }, [trigger]); //trigger

  useEffect(() => {
    //when logged in, this useEffect will take care to create a new record or update any existent record with the user information. sets a new object with the uid as name, and then creates a key with displayName, photoURL and uid.
    async function setUserDataInFirestore() {
      if (loggedUser) {
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
      //it will listen to any change of the logged user state, and if there is any change this is sent to firestore to be stored
      if (loggedUser) {
        try {
          await updateDoc(
            doc(db, "users", loggedUser.uid),
            data.user as DocumentData
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
    updateUserDataInFirestore();
  }, [data.user]);

  const HandleLang = () => {
    //for LangContext.Provider sets the reference path on the language object which is split in two branch (it and eng), so that if language state is set to "en", the switch will return the reference pathway in the object as lang.eng to the context provider.
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

  const handleDeleteUserTravel = async (id: number) => {
    //passed to ShowUser in the /user path. it will get a copy of the data for the uid from firestore, then cancel the key related to that travel. after doing so it will set it back to firestore (as it's not user from the user state, since it's data is elaborated further when collected, so it's not compatible, so that's why i need to download it again.) ends by setting the travel to an empty state, to avoid render issues
    const docRef = doc(db, "users", loggedUser.uid);
    try {
      const doc = await getDoc(docRef);
      let user = doc.data();
      if (user && user[id]) {
        delete user[id];
      }
      await setDoc(docRef, user);
      dispatch({ type: "SELECT-TRAVEL", payload: {} });
    } catch (e) {
      console.log(e);
    }
  };

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

  return (
    <>
      <div className="bg-gray-800 relative pt-[60px] pb-5 min-h-full text-white">
        <Navbar
          toggle={HandleLangToggle}
          selectedTravel={data.selectedTravel}
        />
        <LangContext.Provider value={HandleLang()}>
          <UserButton
            travelButtonPropsPackage={travelButtonPropsPackage}
            usersStatePropsPackage={usersStatePropsPackage}
          />
          <Routes>
            <Route
              path="/"
              element={
                <PresentationPage
                  travelButtonPropsPackage={travelButtonPropsPackage}
                  usersStatePropsPackage={usersStatePropsPackage}
                />
              }
            />

            <Route
              path="/user"
              element={
                <ShowUser
                  user={data.user}
                  travelId={data.selectedTravel.id}
                  dispatch={dispatch}
                  // setUser={setUser}
                  handleDeleteUser={handleDeleteUserTravel}
                />
              }
            />
            <Route
              path="/other"
              element={
                <ShowUser
                  travelId={data.selectedTravel.id}
                  user={data.otherUser}
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
