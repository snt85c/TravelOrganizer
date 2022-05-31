import { userInfo } from "os";
import { useEffect, useRef, useState } from "react";
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
    case "extra":
      currentArray = temp.extra;
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
    if (!currentArray[props.index].available) {
      currentArray[props.index].ready = false;
    }
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
      <div className="flex flex-row justify-between p-2 gap-2 odd:bg-gray-800 bg-gray-900">
        <div className="flex flex-row gap-2">
          <div
            className="flex flex-row"
            onClick={() => setIsEditName(!isEditName)}
          >
            <div className="text-gray-600">nome:</div>
            <div className="text-white ">
              {props.item?.name ? props.item?.name : "empty"}
            </div>
          </div>
          {isEditName && (
            <>
              <div className="absolute top-auto left-auto z-20 flex m-4 p-2 rounded bg-amber-500">
                <input
                  className="text-white rounded bg-gray-600"
                  value={change}
                  onChange={(e) => setChange(e.target.value)}
                  key="editor1"
                ></input>
                <div className="">
                  <button onClick={setNameChange}>set</button>
                  <button onClick={() => setIsEditName(!isEditName)}>X</button>
                </div>
              </div>
            </>
          )}
          <div
            className="flex flex-row"
            onClick={() => setIsEditDescr(!isEditDescr)}
          >
            <div className="text-gray-600">descrizione:</div>
            <div className="text-white">
              {props.item?.description ? props.item?.description : "empty"}
            </div>
          </div>
          {isEditDescr && (
            <>
              <div className="absolute top-auto left-auto z-20 flex m-4 p-2 rounded bg-gradient-to-r from-amber-500 to-amber-700">
                <input
                  className="text-white rounded bg-gray-600"
                  value={change}
                  onChange={(e) => setChange(e.target.value)}
                ></input>
                <div className="flex gap-2">
                  <button onClick={setDescrChange}>set</button>
                  <button onClick={() => setIsEditDescr(!isEditDescr)}>
                    X
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-row gap-1">
          <div
            className="min-h-[5px] min-w-[25px] rounded-full cursor-pointer"
            style={{ backgroundColor: props.item?.available ? "green" : "red" }}
            onClick={changeAvailable}
          ></div>
          <div
            className="min-h-[5px] min-w-[25px] rounded-full cursor-pointer"
            style={{ backgroundColor: props.item?.ready ? "green" : "red" }}
            onClick={changeReady}
          ></div>
          <button onClick={handleDelete}>X</button>
        </div>
      </div>
    </>
  );
}
