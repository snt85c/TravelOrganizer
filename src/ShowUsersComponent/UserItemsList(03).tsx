import { useContext, useEffect, useState } from "react";
import { iGear, iReducerAction, iTravelData, iUser } from "../Interface";
import Item from "./Item";
import ItemCreate from "./ItemCreate";
import ItemListHeader from "./ItemListHeader";
import { FaPlusCircle } from "react-icons/fa";
import { LangContext } from "../AppComponent/LangContextProvider";
import { motion } from "framer-motion";

export default function UserItemsList(props: {
  user: iTravelData;
  travelId: number;
  // setUser?: React.Dispatch<React.SetStateAction<iUser>> | undefined;
  dispatch?: React.Dispatch<iReducerAction>;
  type: string;
}) {
  const [isAddClicked, setIsAddClicked] = useState<boolean>(false);
  const lang = useContext(LangContext);
  let list: JSX.Element[] = [];

  let currentArray: iGear[] = [];
  switch (props.type) {
    case "headgear":
      currentArray = props.user && props.user[props.travelId]?.headgear;
      break;
    case "topgear":
      currentArray = props.user && props.user[props.travelId]?.topgear;
      break;
    case "bottomgear":
      currentArray = props.user && props.user[props.travelId]?.bottomgear;
      break;
    case "footgear":
      currentArray = props.user && props.user[props.travelId]?.footgear;
      break;
    case "extra":
      currentArray = props.user && props.user[props.travelId]?.extra;
      break;
  }

  const handleAddButton = () => {
    setIsAddClicked(!isAddClicked);
  };
  if (currentArray?.length === 0) {
    list = [
      <div key={0} className="flex justify-center items-center  bg-gray-900 h-[52.8px]">
        empty
      </div>
    ];
  } else {
    list = currentArray?.map((item: iGear, i: number) => {
      return (
        <Item
          travelId={props.travelId}
          user={props.user}
          dispatch={props.dispatch}
          // setUser={props.setUser && props.setUser}
          key={i}
          index={i}
          item={item}
          currentArray={currentArray}
          type={props.type}
        />
      );
    });
  }
  const listHeight: number = list ? 52.8 * list.length : 0;

  return (
    <>
      <div>
        <ItemListHeader currentArray={currentArray} type={props.type} />
        <motion.div
          initial={{ height: "0px" }}
          animate={{ height: `${listHeight}px` }}
        >
          {list}
        </motion.div>
        {isAddClicked && (
          <>
            <ItemCreate
              isAddClicked={isAddClicked}
              travelId={props.travelId}
              setIsAddClicked={setIsAddClicked}
              user={props.user}
              // setUser={props.setUser}
              dispatch={props.dispatch}
              type={props.type}
            />
          </>
        )}
        {!isAddClicked && props.dispatch && (
          <button
            className="flex gap-1 justify-start items-center text-[0.7rem] px-2 mb-5 my-1  bg-gray-500 hover:bg-amber-500 rounded-2xl duration-300"
            onClick={handleAddButton}
          >
            <FaPlusCircle />
            {lang.itemListArrayComponent.add}
          </button>
        )}
      </div>
    </>
  );
}
