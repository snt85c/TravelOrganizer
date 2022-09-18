import { useState, useContext } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../LoginComponents/firebase";
import { iTravel, iUsersStatePropsPackage } from "../Interface";
import GoogleLoginButton from "../LoginComponents/GoogleLoginButton";
import { LangContext } from "../AppComponent/LangContextProvider";

export default function CreateNewTravel(props: {
  usersStatePropsPackage: iUsersStatePropsPackage;
}) {
  const [newTravelName, setNewTravelName] = useState<string>("");
  const lang = useContext(LangContext);

  const handleClickCreateNewTravel = async () => {
    const tempTravelList: any = [...props.usersStatePropsPackage.data.travelList]; //pass by value, not reference, otherwise setTraveliList wont happen, as it will do a shallow equivalence check with the current state and the previous state and find out that the values are the same (as w were working on the reference values of travelList, effectively modifying the values without settign the state), at the moment of settign the state, it woudl find that there is no difference between the current and past state, so it woulndt work. this way, being a copy, there wil be a difference and it will work
    const newTravelObject: iTravel = {
      name: newTravelName !== "" ? newTravelName : "no name",
      id: Date.now(),
      createdBy: props.usersStatePropsPackage.loggedUser.uid,
      userName:
        props.usersStatePropsPackage.loggedUser.displayName.split(" ")[0],
    };
    tempTravelList.push(newTravelObject);
    props.usersStatePropsPackage.dispatch({type:"ADD-FIREBASE-TRAVELS", payload:tempTravelList})
    // props.usersStatePropsPackage.setTravelList(tempTravelList);
    try {
      await updateDoc(doc(db, "travels", "NTyNtjKvHwnEcbaOI73f"), {
        travel: arrayUnion(newTravelObject),
      });
      setNewTravelName("");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {props.usersStatePropsPackage.loggedUser && (
        <div className="flex z-30 mt-10 flex-col relative m-1 mx-10 md:mx-60 justify-center items-center text-black rounded   duration-300 shadow-2xl bg-amber-500">
          <div className="flex mt-5 text-[3vw] sm:text-[1rem] justify-center items-center font-[homeworld-norm] select-none">
            {lang.createNewTravelComponent.createFlairText}
          </div>
          <div className="flex flex-col justify-center items-center m-1 ">
            <form>
              <input
                className="rounded border-2 mt-1 select-none shadow-md text-black text-center"
                value={newTravelName}
                onChange={(e) => setNewTravelName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleClickCreateNewTravel();
                }}
              />
              <div
                className=" cursor-pointer m-2 hover:text-black duration-300 text-white text-center select-none"
                onClick={handleClickCreateNewTravel}
              >
                {lang.createNewTravelComponent.add + newTravelName}
              </div>
            </form>
          </div>
        </div>
      )}
      {!props.usersStatePropsPackage.loggedUser && (
        <>
          <div className="flex z-30 mt-10 flex-col m-1 mx-10 md:mx-60 justify-center items-center text-black rounded   duration-300 shadow-2xl bg-amber-500">
            <div className="flex flex-col sm:flex-row  m-10 text-center justify-center items-center font-[homeworld-norm] select-none">
              <div className="flex select-none text-xl m-2 justify-center items-center cursor-pointer text-pink-700 font-[homeworld-bold] hover:text-black duration-300">
                <GoogleLoginButton buttonName="LOGIN" />
              </div>{" "}
              <div>
                TO <span className="text-white font-[1000]"> CREATE</span> AND{" "}
                <span className="text-white font-[1000]">JOIN</span> TRAVELS
              </div>
            </div>
            <div></div>
          </div>
        </>
      )}
    </>
  );
}
