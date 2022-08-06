import { useContext, useState } from "react";
import { iGear, iTravelData, iUser } from "../Interface";
import Item from "./Item";
import ItemCreate from "./ItemCreate";
import ItemListHeader from "./ItemListHeader";
import { FaPlusCircle } from "react-icons/fa";
import { LangContext } from "../LangContextProvider";

export default function UserItemsList(props: {
  user: iTravelData;
  travelId:number;
  setUser?: React.Dispatch<React.SetStateAction<iUser>> | undefined;
  type: string;
}) {
  const [isAddClicked, setIsAddClicked] = useState<boolean>(false);
  const lang = useContext(LangContext);

  let currentArray: iGear[] = [] ;
  switch (props.type) {
    case "headgear":
      // if (!props.user.headgear) {
      //   props.user.headgear = [];
      // }
      currentArray =  props.user && props.user[props.travelId]?.headgear;
      break;
    case "topgear":
      // if (!props.user.topgear) {
      //   props.user.topgear = [];
      // }
      currentArray = props.user && props.user[props.travelId]?.topgear;
      break;
    case "bottomgear":
      // if (!props.user.bottomgear) {
      //   props.user.bottomgear = [];
      // }
      currentArray =  props.user && props.user[props.travelId]?.bottomgear;
      break;
    case "footgear":
      // if (!props.user.footgear) {
      //   props.user.footgear = [];
      // }
      currentArray = props.user &&  props.user[props.travelId]?.footgear;
      break;
    case "extra":
      // if (!props.user.extra) {
      //   props.user.extra = [];
      // }
      currentArray = props.user && props.user[props.travelId]?.extra;
      break;
  }

  const handleAddButton = () => {
    setIsAddClicked(!isAddClicked);
  };

  // console.log(currentArray, " current array in UserItemList(03)")

  const list = currentArray?.map((item: iGear, i: number) => {
    return (
      <Item
      travelId={props.travelId}
        user={props.user}
        setUser={props.setUser && props.setUser}
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
        <div>{list}</div>
        {isAddClicked && (
          <>
            <ItemCreate
              isAddClicked={isAddClicked}
              travelId={props.travelId}
              setIsAddClicked={setIsAddClicked}
              user={props.user}
              setUser={props.setUser}
              type={props.type}
            />
          </>
        )}
        {!isAddClicked && props.setUser && (
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
