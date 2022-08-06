import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../LangContextProvider";
import { iTravelData, iUser } from "../Interface";

export default function UserButton(props: {
  travelId: number;
  user?: iTravelData;
  users?: iTravelData[];
  loggedUser: any;
  setOtherUser: React.Dispatch<React.SetStateAction<iTravelData>>;
}) {
  const [showOther, setShowOther] = useState<boolean>(false);
  const navigate = useNavigate();
  const lang = useContext(LangContext);
  const { ref } = HandleClickOutsideComponent(setShowOther);

  function HandleClickOutsideComponent(
    setShowOther: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowOther(false);
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

  const handleClickSelection = (user: iTravelData) => {
    if (props.loggedUser) {
      if (user.userInfo.uid !== props.loggedUser?.uid) {
        props.setOtherUser(user);
        navigate("/other");
      } else {
        navigate("/user");
      }
    } else {
      props.setOtherUser(user);
      navigate("/other");
    }
    setShowOther(false);
  };

  let usersList = props.users?.map((user, i) => {
    return (
      <div
        className="flex px-4 gap-2 w-[90%] m-1 justify-between bg-slate-400 hover:bg-amber-500 hover:text-black duration-300 items-center cursor-pointer"
        key={i}
        onClick={() => handleClickSelection(user)}
      >
        {user?.userInfo.displayName.toUpperCase()}
        <img src={user?.userInfo.photoURL} className="w-10 h-10 rounded-full" />
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-row justify-between mx-2 md:mx-20">
        <button
          className="flex z-20 rounded shadow-lg mt-2 px-1 py-0  border hover:border-amber-500 flex-row justify-center items-center gap-2 hover:text-amber-500 duration-300"
          onClick={() => {
            setShowOther(!showOther);
          }}
        >
          {lang.button.showOtherButton}
        </button>
        {props.travelId && <div className="mt-2 font-[phonk] text-[1.1rem] text-gray-800 "><span className="font-[homeworld-norm]">//</span> {props.travelId}XX</div>}
      </div>
      {
        <div
          ref={ref}
          className="absolute top-auto md:left-[4.5rem] z-20 flex flex-col flex-wrap items-center md:justify-start justify-center font-[homeworld-norm] w-2/3 md:w-1/3 "
          style={{ display: showOther ? "flex" : "none" }}
        >
          {usersList}
        </div>
      }
    </>
  );
}
