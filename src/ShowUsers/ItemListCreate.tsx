import { useEffect, useState } from "react";
import { iGear, iUser } from "../Main";
import {
  FaTimesCircle,
  FaPlusCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export default function ItemListCreate(props: {
  user: iUser;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
  isAddClicked: boolean;
  setIsAddClicked: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}) {
  const [tempItem, setTempItem] = useState<iGear>({
    name: "",
    available: false,
    ready: false,
  });

  const createButton = (array: string) => {
    let temp: iUser = { ...props.user };

    switch (array) {
      case "headgear":
        temp.headgear?.push(tempItem);
        break;
      case "topgear":
        temp.topgear?.push(tempItem);
        break;
      case "bottomgear":
        temp.bottomgear?.push(tempItem);
        break;
      case "footgear":
        temp.footgear?.push(tempItem);
        break;
      case "extra":
        temp.extra?.push(tempItem);
        break;
    }
    props.setUser(temp);
    props.setIsAddClicked(!props.isAddClicked);
  };

  const ToggleReady = () => {
    let temp: iGear = { ...tempItem };
    temp.ready = !tempItem.ready;
    setTempItem(temp);
  };

  const ToggleAvailable = () => {
    let temp: iGear = { ...tempItem };
    temp.available = !tempItem.available;
    setTempItem(temp);
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let temp: iGear = { ...tempItem };
    temp.name = e.target.value;
    setTempItem(temp);
  };

  return (
    <>
      <div className="flex flex-row p-2 gap-2 justify-between items-center">
        <div className="flex flex-row gap-1 items-center">
          <input
            className="text-black min-w-[50%] md:w-[1/4]"
            placeholder="name"
            value={tempItem.name}
            onChange={(e) => {
              changeName(e);
            }}
          ></input>
          <div className="flex flex-row gap-1">
            <div
              style={{ color: tempItem.available ? "green" : "red" }}
              onClick={ToggleAvailable}
            >
              {tempItem.available ? (
                <FaCheckCircle className="w-7 h-7" />
              ) : (
                <FaExclamationCircle className="w-7 h-7" />
              )}
            </div>
            <div
              style={{ color: tempItem.ready ? "green" : "red" }}
              onClick={ToggleReady}
            >
              {tempItem.ready ? (
                <FaCheckCircle className="w-7 h-7" />
              ) : (
                <FaExclamationCircle className="w-7 h-7" />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <button onClick={() => createButton(props.type)}>
            <FaPlusCircle className="w-7 h-7" />
          </button>
          <button onClick={() => props.setIsAddClicked(!props.isAddClicked)}>
            <FaTimesCircle className="w-7 h-7" />
          </button>
        </div>
      </div>
    </>
  );
}
