import { useState } from "react";
import { iGear, iUser } from "../Main";
import ItemComponent from "./ItemComponent";
import ItemListCreate from "./ItemListCreate";
import ItemListHeader from "./ItemListHeader";

export default function ItemListArrayComponent(props: {
  user: iUser;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
  type: string;
}) {
  const [isAddClicked, setIsAddClicked] = useState<boolean>(false);
  let currentArray: iGear[] = [];
  switch (props.type) {
    case "headgear":
      currentArray = props.user.headgear;
      break;
    case "topgear":
      currentArray = props.user.topgear;
      break;
    case "bottomgear":
      currentArray = props.user.bottomgear;
      break;
    case "footgear":
      currentArray = props.user.footgear;
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
        {!isAddClicked && <button onClick={handleAddButton}>add</button>}
      </div>
    </>
  );
}
