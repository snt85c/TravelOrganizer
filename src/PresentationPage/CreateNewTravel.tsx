import { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../LoginComponents/firebase";
import { iTravel } from "../Interface";

export default function CreateNewTravel(props: {
  travelList: [iTravel?];
  setTravelList: React.Dispatch<React.SetStateAction<[iTravel?]>>;
}) {
  const [newTravel, setNewTravel] = useState<string>("");

  const handleClick = async () => {
    const tempTravelList: any = props.travelList.slice(); //pass by value, not reference by slice function that returns a new array
    const newTravelObject: iTravel = { name: newTravel, id: Date.now() };
    tempTravelList.push(newTravelObject);
    props.setTravelList(tempTravelList);
    // console.log(tempTravelList === props.travelList,  "equality add")
    //add to cloud firestore
    try {
      await updateDoc(doc(db, "travels", "NTyNtjKvHwnEcbaOI73f"), {
        travel: arrayUnion(newTravelObject),
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
        <div onClick={handleClick}>
          {!newTravel ? "new travel" : "add " + newTravel}
        </div>
      </div>
    </>
  );
}
