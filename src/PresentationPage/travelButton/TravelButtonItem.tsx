import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { HandleClickOutsideComponent } from "../../HandleClickOutsideComponent";
import { useEffect, useState } from "react";
import { iTravel, iTravelData, iTriggers } from "../../Interface";
import { db } from "../../LoginComponents/firebase";
import { telegramBotKey, chat_id } from "../../Main";
import WatchTravelButton from "./WatchTravelButton";
import JoinTravelButton from "./JoinTravelButton";

export default function TravelButtonItem(props: {
  uiTriggers: iTriggers;
  data?: iTravel;
  loggedUser: any;
  travelList: [iTravel?];
  setTravel: React.Dispatch<React.SetStateAction<iTravel>>;
  setTravelList: React.Dispatch<React.SetStateAction<[iTravel?]>>;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isAlreadyJoined, setIsAlreadyJoined] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const { ref } = HandleClickOutsideComponent(setIsEditing);

  function isAuthor() {
    return props.loggedUser?.uid === props.data?.createdBy;
  }

  useEffect(() => {
    async function enableOrDisableJoinButtonIfAlreadyJoined() {
      let travelId: number = props.data?.id ? props.data?.id : 0;
      const querySnapshot = await getDocs(collection(db, "users"));
      let tempdata: iTravelData = {} as iTravelData;
      querySnapshot.forEach((doc) => {
        tempdata = doc.data() as iTravelData;
        if (props.loggedUser &&
          tempdata[travelId] &&
          tempdata.userInfo.uid === props.loggedUser.uid
        ) {
          setIsAlreadyJoined(true);
        }
      });
    }
    enableOrDisableJoinButtonIfAlreadyJoined();
  });

  function telegramAlertDeleteTravel() {
    const data = `travel: ${props.data?.name} has been deleted by: ${
      props.loggedUser.displayName.split(" ")[0]
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
      let filteredTravelList: any = props.travelList?.filter((item) => {
        return item?.id !== props.data?.id;
      });

      props.setTravelList(filteredTravelList);
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
      props.setTravel({ name: "", id: 0, createdBy: "", userName: "" });
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
      let tempArray: [(iTravel | undefined)?] = [...props.travelList];
      tempArray.forEach((item) => {
        if (item?.id === travelIdToRename) {
          item.name = newNameForSelectedTravel;
        }
      });
      props.setTravelList(tempArray);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickSetTravel = () => {
    const temp: iTravel = props.data?.name
      ? props.data
      : { name: "", id: 0, createdBy: "", userName: "" };
    props.setTravel(temp);
  };

  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setIsEditing(!isEditing);
    setIsRenaming(false);
    setIsDeleting(false);
  };

  return (
    <div
      //container, has information to change size
      className="flex flex-col relative w-[1/4] m-1 p-1 mx-10 md:mx-40 justify-center items-center text-white rounded bg-gradient-to-r from-cyan-900 to-cyan-700  duration-300 "
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
        //2nd container, flex rules for the children
        className="flex justify-between w-full"
      >
        <WatchTravelButton
          handleClickSetTravel={handleClickSetTravel}
          uiTriggers={props.uiTriggers}
        />
        <div
          //travel information div, contains the edit button as well
          className="flex flex-col justify-evenly items-center"
        >
          <div className="text-[2.7vw] sm:text-[0.9rem] select-none font-extrabold font-[homeworld-norm]">
            {props.data?.name.toUpperCase()}
          </div>
          <div className="text-[0.8rem] -my-1 select-none">
            created by:{" "}
            <span className="text-[0.9rem] text-pink-400 font-bold">
              {isAuthor() ? "You" : props.data?.userName}
            </span>{" "}
          </div>
          {isAuthor() && (
            <div
              //edit, rename, delete buttons, if the user is also the author
              className="flex"
            >
              {!isEditing && (
                <div
                  className=" text-[0.7rem] font-[homeworld-norm] cursor-pointer text-amber-500 duration-300 select-none"
                  onClick={handleEdit}
                >
                  CLICK TO MODIFY
                </div>
              )}
              {isEditing && (
                <div ref={ref}>
                  <div className="flex flex-col justify-evenly items-center">
                    <div className="flex flex-row p-1 m-1">
                      <div
                        className="mx-2 text-[0.7rem] p-2 font-[homeworld-norm] cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
                        onClick={() => {
                          setIsDeleting(!isDeleting);
                          setIsRenaming(false);
                        }}
                      >
                        DELETE
                      </div>
                      <div
                        className="mx-2  text-[0.7rem] p-2 font-[homeworld-norm]  cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
                        onClick={() => {
                          setIsRenaming(!isRenaming);
                          setIsDeleting(false);
                        }}
                      >
                        RENAME
                      </div>
                    </div>
                    {isRenaming && (
                      <div
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && isRenaming) handleRename();
                        }}
                      >
                        <input
                          className="rounded-xl border-2 border-amber-500 mx-2 px-2 text-center w-[80%]"
                          onChange={(e) => setNewName(e.target.value)}
                          defaultValue={props.data?.name.toString()}
                        />
                        <button onClick={handleRename}>ok</button>
                      </div>
                    )}
                    {isDeleting && (
                      <div
                        className=" flex flex-col justify-center items-center mx-2  text-sm cursor-pointer text-gray-800 hover:text-red-600 duration-300 hover:font-bold select-none"
                        onClick={handleDelete}
                      >
                        <div>press to delete</div>
                        <div className="text-[0.5rem] -mt-2">
                          this will cancel your data permanently
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div
        style={{width:"3rem"}}
        //div to contain JoinTravelButton and keep the centered justification when is not rendered
        >
          {!isAlreadyJoined && props.loggedUser && (
            <JoinTravelButton
              loggedUser={props.loggedUser}
              handleClickSetTravel={handleClickSetTravel}
              uiTriggers={props.uiTriggers}
              isAlreadyJoined={isAlreadyJoined}
            />
          )}
        </div>
      </div>
    </div>
  );
}
