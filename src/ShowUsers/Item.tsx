import { useContext, useState } from "react";
import { iGear, iUser } from "../Main";
import {
  FaTimesCircle,
  FaPlusCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { LangContext } from "../LangContextProvider";
import { useSwipeable, SwipeEventData } from "react-swipeable";
import { GiCancel, GiConfirmed } from "react-icons/gi";

export default function Item(props: {
  index: number;
  type: string;
  currentArray: iGear[];
  item: iGear;
  user: iUser;
  setUser?: React.Dispatch<React.SetStateAction<iUser>> | undefined;
}) {
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [change, setChange] = useState<string>("");
  const lang = useContext(LangContext);

  const [deltaX, setDeltaX] = useState<number>(0);
  const [opacityLx, setOpacityLx] = useState<number>(0);
  const [opacityRx, setOpacityRx] = useState<number>(0);
  const [messageRx, setMessageRx] = useState<string>("highlight");
  const [swipeColor, setSwipeColor] = useState<"red" | "purple" | "">("");
  const [highlight, setHighlight] = useState<"purple" | "" | "red">("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

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

  const swipeTest = useSwipeable({
    onSwiping: (e:SwipeEventData) => {
      
      //sets a limit to how much the component can be moved on screen on x axis, as it stops setting the state after a certain amount, keeping it at 200/-200 while swiping
      if (Math.abs(e.deltaX) < 150) {
        setDeltaX(e.deltaX);
      }
      if (e.dir === "Right") {
        //if i detect a right swipe, set opacity of the diw with the message to delta/100 (so that it changes gradually, since opacity is a value between 0 and 1) as well as setting the color to red (this is conditionally rendered in the style), otherwise set color to purple
        setOpacityLx(deltaX / 100);
        setSwipeColor("red");
      } else {
        setOpacityRx(Math.abs(deltaX) / 100);
        setSwipeColor("purple");
      }
    },
    onSwiped: (e:SwipeEventData) => {
      console.log("swipe")
      if (deltaX && deltaX < -100) {
        //if i detect a swipe left more than 150, set the bg color to purple/remove the color and change the message
        highlight === "" ? setHighlight("purple") : setHighlight("");
        messageRx === "highlight"
          ? setMessageRx("remove highlight")
          : setMessageRx("highlight");
        setIsDeleting(false);
        setIsDeleted(false);
      }
      if (deltaX && deltaX > 100) {
        //if i detect a swipe right, set isDeleting so that i can conditionally render a message with two buttons to confirm or deny the action directly on the component
        setIsDeleting(!isDeleting);
        !isDeleting ? setHighlight("red") : setHighlight("");
      }
      //when i detect that the swiping is finished, set everything to default value, so that the div comes back to his original position and opacity
      setDeltaX(0);
      setOpacityLx(0);
      setOpacityRx(0);
    },
  });

  const handleDeleteN = () => {
    setIsDeleted(false);
    setIsDeleting(false);
    setHighlight("")
  };

  const handleDeleteY = () => {
    setIsDeleted(true);
    setIsDeleting(false);
    setHighlight("")
  };

  const changeReady = () => {
    let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].ready = !props.currentArray[props.index].ready;
    if (currentArray[props.index].ready) {
      currentArray[props.index].available = true;
    }
    props.setUser && props.setUser(temp);
  };

  const changeAvailable = () => {
    let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].available =
      !props.currentArray[props.index].available;
    if (!currentArray[props.index].available) {
      currentArray[props.index].ready = false;
    }
    props.setUser && props.setUser(temp);
  };

  const setNameChange = () => {
    let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].name = change;
    props.setUser && props.setUser(temp);
    setIsEditName(!isEditName);
  };

  const handleDelete = () => {
    let temp: iUser = { ...props.user };
    currentArray.splice(props.index, 1);
    props.setUser && props.setUser(temp);
  };

  return (
    <>
      <div  {...swipeTest} 
      className="flex flex-row justify-between p-1 px-2 gap-2 odd:bg-gray-800 bg-gray-900 duration-300"
      style={{
        transform: `translateX(${deltaX}px)`,
        backgroundColor:
          //if the value of deltaX is below a certain amount, use the color of the swipe direction (red or purple), if i go over the limit, set the color to the bgColor(highlighted in purple when swiping left)
          deltaX && (deltaX >= 80 || deltaX <= -80)
            ? swipeColor
            : highlight,
      }}
      >
        <div className="flex flex-row gap-2">
          <div
            className="flex flex-col"
            onClick={() => setIsEditName(!isEditName)}
          >
            <div className="text-gray-600 text-[0.7rem] -my-1">
              {lang.itemComponent.name}:
            </div>
            <div className="text-white ">
              {props.item?.name ? props.item?.name : "empty"}
            </div>
          </div>
          {isEditName && props.setUser && (
            <>
              <div className="absolute top-auto left-auto z-20 flex m-4 p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700">
                <input
                  className="text-white rounded-xl px-2 bg-gray-600"
                  defaultValue={props.item.name}
                  onChange={(e) => setChange(e.target.value)}
                ></input>
                <div className="flex px-2 gap-2">
                  <button onClick={() => setIsEditName(!isEditName)}>
                    <FaTimesCircle />
                  </button>
                  <button onClick={setNameChange}>
                    <FaPlusCircle className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-row items-center gap-1">
          <div
            className="cursor-pointer"
            style={{ color: props.item?.available ? "green" : "red" }}
            onClick={changeAvailable}
          >
            {props.item.available ? (
              <FaCheckCircle className="w-7 h-7" />
            ) : (
              <FaExclamationCircle className="w-7 h-7" />
            )}
          </div>
          <div
            className="cursor-pointer"
            style={{ color: props.item?.ready ? "green" : "red" }}
            onClick={changeReady}
          >
            {" "}
            {props.item.ready ? (
              <FaCheckCircle className="w-7 h-7" />
            ) : (
              <FaExclamationCircle className="w-7 h-7" />
            )}
          </div>
          {props.setUser && (
            <button onClick={handleDelete}>
              <FaTimesCircle className="w-7 h-7" />
            </button>
          )}
          {isDeleting && (
            <div className="absolute left-[50%] right-[50%] top-auto flex flex-row gap-4 justify-center items-center text-[0.8rem]">
              <div onClick={handleDeleteY}>
                <GiConfirmed />
              </div>
              <span>delete?</span>
              <span onClick={handleDeleteN}>
                <GiCancel />
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
