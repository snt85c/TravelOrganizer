import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  iEditingPropsPackage,
  iTravel,
  iTravelData,
  iTravelButtonPropsPackage,
  iUsersStatePropsPackage,
} from "../../Interface";
import { db } from "../../LoginComponents/firebase";
import { telegramBotKey, chat_id } from "../../Main";
import JoinTravelButton from "./JoinTravelButton";
import EditButtonItem from "./EditButtonItem";
import { motion } from "framer-motion";
import { LangContext } from "../../LangContextProvider";

export default function TravelButtonItem(props: {
  travelButtonPropsPackage: iTravelButtonPropsPackage;
  usersStatePropsPackage:iUsersStatePropsPackage;
  data?: iTravel;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isAlreadyJoined, setIsAlreadyJoined] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const lang = useContext(LangContext);

  const editingPropsPackage: iEditingPropsPackage = {
    isEditing,
    setIsEditing,
    isDeleting,
    setIsDeleting,
    isRenaming,
    setIsRenaming,
    newName,
    setNewName,
    defaultName: props.data?.name ? props.data?.name.toString() : "",
  };

  function isAuthor() {
    return props.usersStatePropsPackage.loggedUser?.uid === props.data?.createdBy;
  }


  useEffect(() => {
    async function enableOrDisableJoinButtonIfAlreadyJoined() {
      let travelId: number = props.data?.id ? props.data?.id : 0;
      const querySnapshot = await getDocs(collection(db, "users"));
      let tempdata: iTravelData = {} as iTravelData;
      querySnapshot.forEach((doc) => {
        tempdata = doc.data() as iTravelData;
        if (
          props.usersStatePropsPackage.loggedUser &&
          tempdata[travelId] &&
          tempdata.userInfo.uid === props.usersStatePropsPackage.loggedUser.uid
        ) {
          setIsAlreadyJoined(true);
        }
      });
    }
    enableOrDisableJoinButtonIfAlreadyJoined();
  });

  function telegramAlertDeleteTravel() {
    const data = `travel: ${props.data?.name} has been deleted by: ${
      props.usersStatePropsPackage.loggedUser.displayName.split(" ")[0]
    }`;

    fetch(
      `https://api.telegram.org/bot${telegramBotKey}/sendMessage?chat_id=${chat_id}&text=${data} `
    );
  }

  const handleDelete = async () => {
    setIsDeleting(false);
    async function handleDeleteOnFirestore(userToUpdate: iTravelData) {
      await setDoc(doc(db, "users", userToUpdate.userInfo.uid), userToUpdate, {
        merge: false,
      });
    }
    try {
      let travelIdToDelete: number = props.data?.id ? props.data?.id : 0;
      let filteredTravelList: any = props.usersStatePropsPackage.travelList?.filter((item) => {
        return item?.id !== props.data?.id;
      });

      props.usersStatePropsPackage.setTravelList(filteredTravelList);
      await updateDoc(doc(db, "travels", "NTyNtjKvHwnEcbaOI73f"), {
        travel: filteredTravelList,
      });

      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        //get each user and if there is a key with the travelIdToDelete, delete the key then update firestore
        let currentUser: iTravelData = doc.data() as iTravelData;
        if (currentUser[travelIdToDelete]) {
          delete currentUser[travelIdToDelete];
          handleDeleteOnFirestore(currentUser);
        }
      });
      telegramAlertDeleteTravel();
      props.usersStatePropsPackage.setTravel({ name: "", id: 0, createdBy: "", userName: "" });
    } catch (e) {
      console.log(e);
    }
  };

  const handleRename = async () => {
    setIsRenaming(false);
    setIsDeleting(false);
    setIsEditing(false);
    try {
      let travelIdToRename: number = props.data?.id ? props.data?.id : 0;
      let newNameForSelectedTravel: string = newName;
      const updateUserOnFirestore = async (uid: string, user: iTravelData) => {
        await setDoc(doc(db, "users", uid), user, { merge: true });
      };

      //GET AND MODIFY EACH USERS TO CHANGE THE TRAVEL NAME
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        let currentUser: iTravelData = doc.data() as iTravelData;
        if (currentUser[travelIdToRename]) {
          currentUser[travelIdToRename].name = newNameForSelectedTravel;
          updateUserOnFirestore(
            currentUser[travelIdToRename].userInfo.uid,
            currentUser
          );
        }
      });

      //GET AND MODIFY TRAVELS FROM FIRESTORE
      const querySnapshotTravels = await getDoc(
        doc(db, "travels", "NTyNtjKvHwnEcbaOI73f")
      );
      let travelsFromFirestore: DocumentData | { travel: [] } | undefined =
        querySnapshotTravels.data();
      travelsFromFirestore?.travel.forEach(
        (temp: { id: number; name: string }) => {
          if (temp.id === travelIdToRename) {
            temp.name = newNameForSelectedTravel;
          }
        }
      );
      await updateDoc(doc(db, "travels", "NTyNtjKvHwnEcbaOI73f"), {
        ...travelsFromFirestore,
      });

      //GET AND MODIFY TRAVELLIST STATE
      let tempArray: [(iTravel | undefined)?] = [...props.usersStatePropsPackage.travelList];
      tempArray.forEach((item) => {
        if (item?.id === travelIdToRename) {
          item.name = newNameForSelectedTravel;
        }
      });
      props.usersStatePropsPackage.setTravelList(tempArray);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickSetTravel = () => {
    const temp: iTravel = props.data?.name
      ? props.data
      : { name: "", id: 0, createdBy: "", userName: "" };
    props.usersStatePropsPackage.setTravel(temp);
  };

  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setIsRenaming(false);
    setIsDeleting(false);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.90 }}
      //container, has information to change size
      className="flex flex-row border-l-[8px]   relative w-[1/4] m-1 p-1 mx-10 md:mx-40 justify-center items-center text-white rounded bg-gradient-to-r from-cyan-900 to-cyan-700  duration-300 "
      style={{
        height: isEditing
          ? isRenaming || isDeleting
            ? "130px"
            : "100px"
          : `70px`,
        justifyContent: isEditing ? "space-evenly" : "center",
      }}
    >
      <div
        onClick={() => {
          props.travelButtonPropsPackage.setIsShowUserButton(true);
          props.travelButtonPropsPackage.setTrigger(Date.now());
          props.travelButtonPropsPackage.setIsJoining(false);
          props.travelButtonPropsPackage.setIsWatching(true);
          handleClickSetTravel();
        }}
        //2nd container, flex rules for the children
        className="flex justify-between w-full"
      >
        <div
          //travel information div, contains the edit button as well
          className="flex flex-col justify-evenly items-center"
        >
          <div className="ml-1 flex flex-col">
            <div className="text-[3.5vw] sm:text-[0.9rem] select-none font-extrabold font-[homeworld-norm]">
              {props.data?.name.toUpperCase()}
            </div>
            <div className="text-[0.8rem] -my-1 select-none">
              {lang.travelButtonItem.createdBy}
              <span className="text-[0.9rem] text-pink-400 font-bold">
                {isAuthor() ? "You" : props.data?.userName}
              </span>{" "}
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <EditButtonItem
        editingPropsPackage={editingPropsPackage}
        isAuthor={isAuthor}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleRename={handleRename}
      />
      <div
        style={{ width: !isAlreadyJoined?"3rem":0 }}
        //div to contain JoinTravelButton and keep the centered justification when is not rendered
      >
        {!isAlreadyJoined && props.usersStatePropsPackage.loggedUser && (
          <JoinTravelButton
            loggedUser={props.usersStatePropsPackage.loggedUser}
            handleClickSetTravel={handleClickSetTravel}
            travelButtonPropsPackage={props.travelButtonPropsPackage}
            isAlreadyJoined={isAlreadyJoined}
          />
        )}
      </div>
    </motion.div>
  );
}
