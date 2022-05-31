import { userInfo } from "os";
import { useState } from "react";
import { iGear, iUser } from "../Main";

export default function ItemComponent(props: {
  index: number;
  type: string;
  currentArray: iGear[];
  item: iGear;
  user: iUser;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
}) {
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isEditDescr, setIsEditDescr] = useState<boolean>(false);
  const [change, setChange] = useState<string>("");

  let currentArray: iGear[];
  let temp: iUser | undefined = props.user;

  switch (props.type) {

    case "headgear":
      currentArray = temp.headgear;
      break;
    case "topgear":
      currentArray = temp.topgear;
      break;
      case "bottomgear":
      currentArray = temp.bottomgear;
      break;
      case "footgear":
      currentArray = temp.footgear;
      break;
  }

  const changeReady = () => {
  let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].ready = !props.currentArray[props.index].ready;
    if (currentArray[props.index].ready) {
      currentArray[props.index].available = true;
    }
    props.setUser(temp);
  };

  const changeAvailable = () => {
    let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].available =
      !props.currentArray[props.index].available;
    props.setUser(temp);
  };

  const setNameChange = () => {
    let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].name = change;
    props.setUser(temp);
    setIsEditName(!isEditName);
  };

  const setDescrChange = () => {
    let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].description = change;
    props.setUser(temp);
    setIsEditDescr(!isEditDescr);
  };

  const handleDelete = () => {
    let temp: iUser = { ...props.user };
    currentArray.splice(props.index, 1);
    props.setUser(temp);
  };

  return (
    <>
      <div className="flex p-2 gap-2 odd:bg-gray-800 bg-gray-900">
        {!isEditName && (
          <div onClick={() => setIsEditName(!isEditName)}>
            {props.item?.name}
          </div>
        )}
        {isEditName && (
          <>
            <input
              className="text-black"
              value={change}
              onChange={(e) => setChange(e.target.value)}
            ></input>
            <button onClick={setNameChange}>set</button>
          </>
        )}
        {!isEditDescr && (
          <div onClick={() => setIsEditDescr(!isEditDescr)}>
            {props.item?.description}
          </div>
        )}
        {isEditDescr && (
          <>
            <input
              className="text-black"
              value={change}
              onChange={(e) => setChange(e.target.value)}
            ></input>
            <button onClick={setDescrChange}>set</button>
          </>
        )}
        <div
          className="min-h-[5px] min-w-[25px] rounded-full"
          style={{ backgroundColor: props.item?.available ? "green" : "red" }}
          onClick={changeAvailable}
        ></div>
        <div
          className="min-h-[5px] min-w-[25px] rounded-full"
          style={{ backgroundColor: props.item?.ready ? "green" : "red" }}
          onClick={changeReady}
        ></div>
        <button onClick={handleDelete}>delete</button>
      </div>
    </>
  );
}
