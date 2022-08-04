import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { iTravel, iTravelData } from "../Interface";
import { db } from "../LoginComponents/firebase";
import { telegramBotKey, chat_id } from "../Main";

export default function TravelButtonItem(props: {
  i?: number;
  data?: iTravel;
  loggedUser: any;
  setTravel: React.Dispatch<React.SetStateAction<iTravel>>;
  travelList: [iTravel?];
  setTravelList: React.Dispatch<React.SetStateAction<[iTravel?]>>;
}) {
  function telegramAlertDeleteTravel() {
    const data = `travel: ${props.data?.name} has been deleted by: ${
      props.loggedUser.displayName.split(" ")[0]
    }`;

    fetch(
      `https://api.telegram.org/bot${telegramBotKey}/sendMessage?chat_id=${chat_id}&text=${data} `
    );
  }

  const handleDelete = async () => {
    try {
      let travelIdToDelete: number = props.data?.id ? props.data?.id : 0;
      let filteredTravelList: any = props.travelList?.filter((item) => {
        return item?.id !== props.data?.id;
        //create a new list and filter out the item we are deleting, set the state and update firestore
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
      props.setTravel({ name: "", id: 0, createdBy: "" })
    } catch (e) {
      console.log(e);
    }
  };

  async function handleDeleteOnFirestore(userToUpdate: iTravelData) {
    await setDoc(doc(db, "users", userToUpdate.userInfo.uid), userToUpdate, {
      merge: false,
    });
  }

  const handleRename = async () => {
    let travelIdToRename: number = props.data?.id ? props.data?.id : 0;
    let newNameForSelectedTravel: string = "success";
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
    let temp2 = querySnapshotTravels.data();
    temp2?.travel.forEach((temp: { id: number; name: string }) => {
      if (temp.id === travelIdToRename) {
        temp.name = newNameForSelectedTravel;
      }
    });
    await updateDoc(doc(db, "travels", "NTyNtjKvHwnEcbaOI73f"), {
      travel: temp2,
    });

    //GET AND MODIFY TRAVELLIST STATE
    let tempArray: [(iTravel | undefined)?] = [...props.travelList];
    tempArray.forEach((item) => {
      if (item?.id === travelIdToRename) {
        item.name = newNameForSelectedTravel;
      }
    });
    props.setTravelList(tempArray);
  };

  const handleClickSetTravel = () => {
    const temp: iTravel = props.data?.name
      ? props.data
      : { name: "", id: 0, createdBy: "" };
    props.setTravel(temp);
  };

  return (
    <div className="flex flex-col relative w-[1/4] m-1 mx-10 md:mx-40 justify-center items-center text-black rounded bg-white border ">
      <div className="absolute top-0 left-1 text-[0.7rem]">{props.i}</div>
      <div
        onClick={handleClickSetTravel}
        className="text-xl cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
      >
        {props.data?.name}
      </div>
      <div className="text-[0.5rem] -mt-2">id:{props.data?.id}</div>
      {props.loggedUser?.uid === props.data?.createdBy && (
        <div className="flex -mt-1">
          <div
            className="mx-2  text-sm cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
            onClick={handleDelete}
          >
            delete
          </div>
          <div
            className="mx-2 text-sm cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
            onClick={handleRename}
          >
            rename
          </div>
        </div>
      )}
    </div>
  );
}
