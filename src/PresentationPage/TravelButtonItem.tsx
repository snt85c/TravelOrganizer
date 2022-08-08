import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ImEnter, ImEye } from "react-icons/im";
import { useEffect, useRef, useState } from "react";
import { iTravel, iTravelData } from "../Interface";
import { db } from "../LoginComponents/firebase";
import { telegramBotKey, chat_id } from "../Main";
import {  useNavigate } from "react-router-dom";

export default function TravelButtonItem(props: {
  i?: number;
  data?: iTravel;
  loggedUser: any;
  setTravel: React.Dispatch<React.SetStateAction<iTravel>>;
  travelList: [iTravel?];
  setTravelList: React.Dispatch<React.SetStateAction<[iTravel?]>>;
  setIsWatching:React.Dispatch<React.SetStateAction<boolean>>,
  watchTravel: Function;
  joinTravel: Function;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const { ref } = HandleClickOutsideComponent(setIsEditing);
  const navigate = useNavigate();


  function isAuthor() {
    return props.loggedUser?.uid === props.data?.createdBy;
  }

  function HandleClickOutsideComponent(
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setState(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    });

    return { ref };
  }

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

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setIsRenaming(false);
    setIsDeleting(false);
  };



  return (
    <div
      className="flex flex-col relative w-[1/4] m-1 p-1 mx-10 md:mx-40 justify-center items-center text-black rounded bg-white border duration-300 "
      style={{
        height: isEditing
          ? isRenaming || isDeleting
            ? "130px"
            : "100px"
          : "70px",
        justifyContent: isEditing ? "space-evenly" : "center",
      }}
    >
      <div className="flex justify-between w-full">
        <div
          onClick={() => {
            handleClickSetTravel();
            props.setIsWatching(true)
          }}
          className="m-2 flex flex-col items-center justify-center select-none cursor-pointer"
        >
          {
            <>
              <div>
                {" "}
                <ImEye size={20} />
              </div>
              <div className="-mt-2">View</div>{" "}
            </>
          }
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-[2.7vw] sm:text-[0.9rem] mt-1 text-gray-800  select-none font-[homeworld-norm]"
          >
            {props.data?.name.toUpperCase()}
          </div>
          <div className="text-[0.5rem] -my-1 select-none">
            created by:{" "}
            <span className="text-[0.7rem] text-pink-600 font-bold">
              {isAuthor() ? "You" : props.data?.userName}
            </span>{" "}
            id:
            <span className="text-[0.7rem] text-pink-600 font-bold">
              {props.data?.id}
            </span>
          </div>
        </div>
        <div
          onClick={() => {
            handleClickSetTravel();
            props.setIsWatching(false)
            navigate("/user")
          }}
          className="m-2 flex flex-col items-center justify-center select-none cursor-pointer"
        >
          {props.loggedUser && 
            <>
              <div>
                {" "}
                <ImEnter size={20} />
              </div>
              <div className="-mt-2">Join</div>
            </>
          }
        </div>
      </div>
      {isAuthor() && (
        <div className="flex -mt-1">
          {!isEditing && (
            <div
              className="mx-2 mb-1 text-sm cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
              onClick={handleEdit}
            >
              Edit
            </div>
          )}
          {isEditing && (
            <div ref={ref}>
              <div className="flex flex-col justify-evenly items-center">
                <div className="flex flex-row p-1 m-1">
                  <div
                    className="mx-2  text-sm cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
                    onClick={() => {
                      setIsDeleting(!isDeleting);
                      setIsRenaming(false);
                    }}
                  >
                    Delete
                  </div>
                  <div
                    className="mx-2 text-sm cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
                    onClick={() => {
                      setIsRenaming(!isRenaming);
                      setIsDeleting(false);
                    }}
                  >
                    Rename
                  </div>
                </div>
                {isRenaming && (
                  <div
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && isRenaming) handleRename();
                    }}
                  >
                    <input
                      className="rounded-xl border-2 border-amber-500 mx-2 px-2 text-center"
                      onChange={(e) => setNewName(e.target.value)}
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
  );
}
