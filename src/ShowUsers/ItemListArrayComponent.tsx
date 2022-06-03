import { useState } from "react";
import { iGear, iUser } from "../Main";
import ItemComponent from "./ItemComponent";
import ItemListCreate from "./ItemListCreate";
import ItemListHeader from "./ItemListHeader";
import { FaPlusCircle } from "react-icons/fa";

export default function ItemListArrayComponent(props: {
  user: iUser;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
  type: string;
}) {
  const [isAddClicked, setIsAddClicked] = useState<boolean>(false);
  let currentArray: iGear[] = [];
  switch (props.type) {
    case "headgear":
      if (!props.user.headgear) {
        props.user.headgear = [];
      }
      currentArray = props.user.headgear;
      break;
    case "topgear":
      if (!props.user.topgear) {
        props.user.topgear = [];
      }
      currentArray = props.user.topgear;
      break;
    case "bottomgear":
      if (!props.user.bottomgear) {
        props.user.bottomgear = [];
      }
      currentArray = props.user.bottomgear;
      break;
    case "footgear":
      if (!props.user.footgear) {
        props.user.footgear = [];
      }
      currentArray = props.user.footgear;
      break;
    case "extra":
      if (!props.user.extra) {
        props.user.extra = [];
      }
      currentArray = props.user.extra;
      break;
  }

  const handleAddButton = () => {
    setIsAddClicked(!isAddClicked);
  };

  const list = currentArray?.map((item: iGear, i: number) => {
    return (
      <ItemComponent
        user={props.user}
        setUser={props.setUser}
        key={i}
        index={i}
        item={item}
        currentArray={currentArray}
        type={props.type}
      />
    );
  });

  return (
    <>
      <div className="">
        <ItemListHeader currentArray={currentArray} type={props.type} />
        {list.length !== 0 && (
          <div className="flex justify-end px-2 text-gray-500 text-[0.60rem] bg-gradient-to-r from-slate-900 to-slade-700">
            disponibile | nello zaino | rimuovi{" "}
          </div>
        )}
        <div>{list}</div>
        {isAddClicked && (
          <>
            <ItemListCreate
              isAddClicked={isAddClicked}
              setIsAddClicked={setIsAddClicked}
              user={props.user}
              setUser={props.setUser}
              type={props.type}
            />
          </>
        )}
        {!isAddClicked && (
          <button className="flex gap-1 justify-start items-center text-[0.7rem] px-2 my-1 w-20 bg-gray-500 hover:bg-amber-500 rounded-2xl duration-300" onClick={handleAddButton}>
            <FaPlusCircle />aggiungi
          </button>
        )}
      </div>
    </>
  );
}
