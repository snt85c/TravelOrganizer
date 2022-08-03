import {
  collection,
  doc,
  DocumentData,
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
    ).then((res) => {
      // console.log("Request complete! response:", res);
    });
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
    } catch (e) {
      console.log(e);
    }
  };

  async function handleDeleteOnFirestore(tempUser: any) {
    await setDoc(doc(db, "users", tempUser.userInfo.uid), tempUser, {
      merge: false,
    });
  }

  const handleRename = () => {
    // console.log(props.data?.id)
    //   let temp: iTravel | undefined = props.travelList.find(() => {
    //     return props.data?.id;
    //   });
    //   console.log(temp, "TEMP");
    //   const newItem = {...temp, name:"temp"}
    // console.log(newItem)
    // props.setTravelList([temp])
  };

  const handleClick = () => {
    const temp: iTravel = props.data?.name
      ? props.data
      : { name: "", id: 0, createdBy: "" };
    props.setTravel(temp);
  };

  return (
    <div className="flex flex-col relative w-[1/4] m-1 mx-10 md:mx-40 justify-center items-center text-black rounded bg-white border ">
      <div className="absolute top-0 left-1 text-[0.7rem]">{props.i}</div>
      <div
        onClick={handleClick}
        className="text-xl cursor-pointer text-gray-800 hover:text-amber-500 duration-300"
      >
        {props.data?.name}
      </div>
      <div className="text-[0.5rem] -mt-2">id:{props.data?.id}</div>
      {props.loggedUser?.uid === props.data?.createdBy && (
        <div className="flex -mt-1">
          <div
            className="mx-2  text-sm cursor-pointer text-gray-800 hover:text-amber-500 duration-300"
            onClick={handleDelete}
          >
            delete
          </div>
          <div
            className="mx-2 text-sm cursor-pointer text-gray-800 hover:text-amber-500 duration-300"
            onClick={handleRename}
          >
            rename
          </div>
        </div>
      )}
    </div>
  );
}
