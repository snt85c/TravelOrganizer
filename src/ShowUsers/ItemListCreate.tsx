import { useState } from "react";
import { iGear, iUser } from "../Main";

export default function ItemListCreate(props: {
  user: iUser;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
  isAddClicked: boolean;
  setIsAddClicked: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}) {
  const [tempItem, setTempItem] = useState<iGear>({
    name: "",
    description: "",
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
        break
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
    temp.name = e.target.value !== "" ? e.target.value : "empty";
    setTempItem(temp);
  };

  const changeDescr = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let temp: iGear = { ...tempItem };
    temp.description = e.target.value !== "" ? e.target.value : "empty";
    setTempItem(temp);
  };
  return (
    <>
      <div className="flex p-2 gap-2">
        <input
          className="text-black"
          placeholder="name"
          value={tempItem.name}
          onChange={(e) => {
            changeName(e);
          }}
        ></input>
        <input
          className="text-black"
          placeholder="descr"
          onChange={(e) => changeDescr(e)}
          value={tempItem.description}
        ></input>
        <div
          className="min-h-[5px] min-w-[25px] rounded-full"
          style={{ backgroundColor: tempItem.available ? "green" : "red" }}
          onClick={ToggleAvailable}
        ></div>
        <div
          className="min-h-[5px] min-w-[25px] rounded-full"
          style={{ backgroundColor: tempItem.ready ? "green" : "red" }}
          onClick={ToggleReady}
        ></div>
        <button onClick={() => createButton(props.type)}>create</button>
      </div>
    </>
  );
}
