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

  function telegramAlertCreateTravel(newTravelObject:iTravel){
    const data = `new travel: ${
      newTravelObject.name ? newTravelObject.name : "noName"
    } created by: ${props.loggedUser.displayName.split(" ")[0]}`;
    fetch(
      `https://api.telegram.org/bot${telegramBotKey}/sendMessage?chat_id=${chat_id}&text=${data} `
    ).then((res) => {
      // console.log("Request complete! response:", res);
    });
  }

  const handleClick = async () => {
    const tempTravelList: any = [...props.travelList] //pass by value, not reference, otherwise setTraveliList wont happen, as it will do a shallow equivalence check with the current state and the previous state and find out that the values are the same (as w were working on the reference values of travelList, effectively modifying the values without settign the state), at the moment of settign the state, it woudl find that there is no difference between the current and past state, so it woulndt work. this way, being a copy, there wil be a difference and it will work
    const newTravelObject: iTravel = {
      name: newTravel != ""?newTravel: "no name",
      id: Date.now(),
      createdBy: props.loggedUser.uid,
    };
    tempTravelList.push(newTravelObject);
    props.setTravelList(tempTravelList);
    try {
      await updateDoc(doc(db, "travels", "NTyNtjKvHwnEcbaOI73f"), {
        travel: arrayUnion(newTravelObject),
      });
      telegramAlertCreateTravel(newTravelObject)
      setNewTravel("")
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
    <div
      className="flex mt-10 flex-col relative m-1 mx-10 md:mx-60 justify-center items-center text-black rounded   duration-300 shadow-2xl bg-amber-500"
    >
      <div className="flex flex-col justify-center items-center m-1 ">
        <form>
        <input
          className="rounded border-2 mt-1 select-none shadow-md text-black text-center"
          value={newTravel}
          onChange={(e) => setNewTravel(e.target.value)}
          onKeyDown={(e)=>{if(e.key === "Enter")handleClick()}}
        />
        <div
          className=" cursor-pointer mt-2 hover:text-black duration-300 text-white"
          onClick={handleClick}
        >
          {!newTravel ? "new travel" : "add " + newTravel}
        </div>
        </form>
      </div>
    </div>
    </>
  );
}
