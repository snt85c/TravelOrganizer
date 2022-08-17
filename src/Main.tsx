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
  iTravel,
  iTravelData,
  iTravelButtonPropsPackage,
  iUsersStatePropsPackage,
} from "./Interface";
import { useEffect, useState } from "react";
import { db } from "./LoginComponents/firebase";
import { useUserAuth } from "./LoginComponents/UserAuth";
import { Routes, Route, useNavigate } from "react-router-dom";
import ShowUser from "./ShowUsers/ShowUser(01)";
    //object that will contain the props that needs to be passed down to other components. 
import Navbar from "./Navbar";
import Footer from "./Footer";
import UserButton from "./ShowUsers/UsersButtons";
import { lang, LangContext } from "./LangContextProvider";
import PresentationPage from "./PresentationPage/PresentationPage";

export const telegramBotKey = "5531898247:AAG8rxOFIKmlwS6PYBVTuXdTGMqIaSpl5eE";
export let chat_id = 231233238;

export default function Main() {
  const { user: loggedUser } = useUserAuth();
  //info from the googleLoginComponent

  const [user, setUser] = useState<any>({});
  //usersButtons component will compare the user clicked from the list with the data from the loggedUser, if they share the same uid it will set it as the "user", then navigate to /user. Same is done in the JoinTravel Function, which will create a new set of data for the selected travel and user.  this allows to use the same component (ShowUser.tsx) bot for user and otherUser by passing or not passing setUser, making this page an editable page as it will  conditionally render what is needed to set new information

  const [otherUser, setOtherUser] = useState<any>();
  //usersButtons component will compare the user clicked from the list with the data from the loggedUser, if they DONT share the same uid it will set it as the "otherUser", then navigate to /other. this allows to use the same component (ShowUser.tsx) but WITHOUT passing setUser, making this page immutable as it wont conditionally render what is needed to set new information

  const [usersList, setUsersList] = useState<iTravelData[]>([]);
  //list of users who joined the seected travel

  const [travelList, setTravelList] = useState<[iTravel?]>([]);
  //list of travels. this list is populated by an useEffect that will run at first render of the page.

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

  const [selectedTravel, setSelectedTravel] = useState<iTravel>({
    name: "",
    id: 0,
    createdBy: "",
    userName: "",
  });
   //set the travel to watch when TravelButtonItem/JoinTravelButton is clicked via handleClickSetTravel Function

  const navigate = useNavigate();

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
    user: user.userInfo,
    usersList,
    loggedUser,
    travelList,
    travel: selectedTravel,
    setUser,
    setOtherUser,
    setTravel: setSelectedTravel,
    setTravelList,
    watchTravel,
    joinTravel,
  };

  //STARTING POINT:get list of  all the travels from firestore. this are sent to Presentation Page which is rendered at the start with the Navbar component and the usersButton component( which will not render at this stage since no travel has been selected). PresentationPage will render the travelList state under the TravelButtonItem.tsx. Depending on clicking area, this will fill the selectedTravel state and  run either watchTravel(), that will populate usersList with users who already joined the selectedTravel to be showed either as /user or /other or joinTravel that will send the user to ShowUser component under /user as well as making a list of others. the user state will be automatically update in the useEffect when the dependency user is modified.
  useEffect(() => {
    try {
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

 
  async function watchTravel() {
    //creates a list of all the users that have a selectedTravel.id key on them. this will be used on the usersButton to generate it on screen and determine the way they will be showed. if the clicked user in this list  shares the same uid as the logged user, then is sent to /user otherwise to /other
    setUsersList([]);
    const querySnapshot = await getDocs(collection(db, "users"));
    let listTemp: iTravelData[] = [];
    let tempdata: iTravelData = {} as iTravelData;
    querySnapshot.forEach((doc) => {
      tempdata = doc.data() as iTravelData;
      if (tempdata[selectedTravel.id]) {
        let newUserData = userTravelDataFactory("isWatching", tempdata);
        listTemp.push(newUserData as unknown as iTravelData);
      }
    });
    setUsersList(listTemp);
  }

  async function joinTravel() {
    //the join button is conditionally rendered, and it assumes that there is no key for that user. so it will simply create a new travelData with the travelDataFactoryFunction and set the user state (which is automatically updated by the useEffect with user as dependency) while . it will automatically navigate to /user
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      let listTemp: iTravelData[] = [];
      let tempdata: iTravelData = {} as iTravelData;
      querySnapshot.forEach((doc) => {
        tempdata = doc.data() as iTravelData;
        if (loggedUser && tempdata.userInfo.uid === loggedUser.uid) {
          if (!tempdata[selectedTravel.id]) {
            let newUserData = userTravelDataFactory("isJoining");
            setUser(newUserData);
            navigate("/user");
            listTemp.push(newUserData as unknown as iTravelData);
          }
        }
      });
      setUsersList(listTemp);
    } catch (e) {
      console.log(e);
    }
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
            ? tempdata && tempdata[selectedTravel.id].userInfo.displayName
            : loggedUser.displayName.split(" ")[0],
        photoURL:
          type === "isWatching"
            ? tempdata && tempdata[selectedTravel.id].userInfo.photoURL
            : loggedUser.photoURL,
        uid:
          type === "isWatching"
            ? tempdata && tempdata[selectedTravel.id].userInfo.uid
            : loggedUser.uid,
      },
      [selectedTravel.id]: {
        id: selectedTravel.id,
        name: selectedTravel.name,
        headgear:
          type === "isJoining"
            ? []
            : tempdata && tempdata[selectedTravel.id]?.headgear,
        topgear:
          type === "isJoining"
            ? []
            : tempdata && tempdata[selectedTravel.id]?.topgear,
        bottomgear:
          type === "isJoining"
            ? []
            : tempdata && tempdata[selectedTravel.id]?.bottomgear,
        footgear:
          type === "isJoining"
            ? []
            : tempdata && tempdata[selectedTravel.id]?.footgear,
        extra:
          type === "isJoining"
            ? []
            : tempdata && tempdata[selectedTravel.id]?.extra,
        userInfo: {
          displayName:
            type === "isWatching"
              ? tempdata && tempdata[selectedTravel.id].userInfo.displayName
              : loggedUser.displayName.split(" ")[0],
          photoURL:
            type === "isWatching"
              ? tempdata && tempdata[selectedTravel.id].userInfo.photoURL
              : loggedUser.photoURL,
          uid:
            type === "isWatching"
              ? tempdata && tempdata[selectedTravel.id].userInfo.uid
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
  }, [trigger]);

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
    // //to collect basic usage data from the telegrambot, not in use
    const getBotUpdates = () =>
      fetch(`https://api.telegram.org/bot${telegramBotKey}/getUpdates`).then(
        (response) => console.log(response.json())
      );
    // getBotUpdates(); //DISCONNECTED
  }, []);

  useEffect(() => {
    async function updateUserDataInFirestore() {
      //it will listen to any change of the logged user state, and if there is any change this is sent to firestore to be stored
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
      setSelectedTravel({
        name: "",
        id: 0,
        createdBy: "",
        userName: "",
      });
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
        <Navbar toggle={HandleLangToggle} selectedTravel={selectedTravel} />
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
                  user={user}
                  travelId={selectedTravel.id}
                  setUser={setUser}
                  handleDeleteUser={handleDeleteUserTravel}
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
