import { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../LoginComponents/firebase";
import { iTravel, iUserInfo } from "../Interface";
import { telegramBotKey, chat_id } from "../Main";

export default function CreateNewTravel(props: {
  user: iUserInfo;
  loggedUser: any;
  travelList: [iTravel?];
  setTravelList: React.Dispatch<React.SetStateAction<[iTravel?]>>;
}) {
  const [newTravel, setNewTravel] = useState<string>("");

  const handleClick = async () => {
    console.log("click");
    const tempTravelList: any = props.travelList.slice(); //pass by value, not reference by slice function that returns a new array
    const newTravelObject: iTravel = {
      name: newTravel,
      id: Date.now(),
      createdBy: props.loggedUser.uid,
    };
    tempTravelList.push(newTravelObject);
    props.setTravelList(tempTravelList);
    try {
      await updateDoc(doc(db, "travels", "NTyNtjKvHwnEcbaOI73f"), {
        travel: arrayUnion(newTravelObject),
      });
      const data = `new travel: ${
        newTravelObject.name ? newTravelObject.name : "noName"
      } created by: ${props.loggedUser.displayName.split(" ")[0]}`;
      fetch(
        `https://api.telegram.org/bot${telegramBotKey}/sendMessage?chat_id=${chat_id}&text=${data} `
      ).then((res) => {
        console.log("Request complete! response:", res);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center m-5">
        <input
          className="rounded shadow-md text-black text-center"
          value={newTravel}
          onChange={(e) => setNewTravel(e.target.value)}
        />
        <div
          className=" cursor-pointer hover:text-amber-500 duration-300"
          onClick={handleClick}
        >
          {!newTravel ? "new travel" : "add " + newTravel}
        </div>
      </div>
    </>
  );
}
