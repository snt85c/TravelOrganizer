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
  const [deltaLx, setDeltaLx] = useState<number>(0);
  const [deltaRx, setDeltaRx] = useState<number>(0);

  const [opacityLx, setOpacityLx] = useState<number>(0);
  const [opacityRx, setOpacityRx] = useState<number>(0);
  const [messageRx, setMessageRx] = useState<string>("highlight");
  const [swipeColor, setSwipeColor] = useState<"red" | "purple" | "">("");
  const [highlight, setHighlight] = useState<"purple" | "" | "red">("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const MAX_SWIPE_ALLOWED:number = 150
  const SWIPE_TRIGGER:number = 100


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

  const swipeActions = useSwipeable({
    onSwiping: (e: SwipeEventData) => {
      if (Math.abs(e.deltaX) < MAX_SWIPE_ALLOWED && props.setUser) {
        //we restrict the max amount of the swipe, and we allow to set the delta state only if setUser has been passed, meaning that we are in a logged user component and we can perform operations on it. without setting deltaX, other swipe functions wont start
        setDeltaX(e.deltaX);
      }
      if (e.dir === "Right") {
        setDeltaLx(deltaX);
        setOpacityLx(deltaX / 100);
        setSwipeColor("red");
      } else {
        setDeltaRx(Math.abs(deltaX));
        setOpacityRx(Math.abs(deltaX) / 100);
        setSwipeColor("purple");
      }
    },
    onSwiped: (e: SwipeEventData) => {
      if (deltaX && deltaX < -SWIPE_TRIGGER) {
        highlight === "" ? setHighlight("purple") : setHighlight("");
        messageRx === "highlight"
          ? setMessageRx("remove highlight")
          : setMessageRx("highlight");
        setIsDeleting(false);
      }
      if ( deltaX > SWIPE_TRIGGER) {
        //if i detect a swipe right, set isDeleting so that i can conditionally render a message with two buttons to confirm or deny the action directly on the component
        setIsDeleting(!isDeleting);
        !isDeleting ? setHighlight("red") : setHighlight("");
      }
      //when i detect that the swiping is finished, set everything to default value, so that the div comes back to his original position and opacity
      setDeltaX(0);
      setDeltaLx(0);
      setDeltaRx(0);
      setOpacityLx(0);
      setOpacityRx(0);
    },
  });

  const handleSwipeDeleteN = () => {
    setIsDeleting(false);
    setHighlight("");
  };

  const handleSwipeDeleteY = () => {
    handleDelete();
    setIsDeleting(false);
    setHighlight("");
  };

  const changeButtonReady = () => {
    let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].ready = !props.currentArray[props.index].ready;
    if (currentArray[props.index].ready) {
      currentArray[props.index].available = true;
    }
    props.setUser && props.setUser(temp);
  };

  const changeButtonAvailable = () => {
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
      <div className="flex">
        <div
          style={{ opacity: opacityLx, width: deltaLx, backgroundColor: "red" }}
          className="flex items-center justify-center rounded-l-xl"
        >
          delete
        </div>
        <div
          {...swipeActions}
          className="flex flex-row w-full justify-between p-1 px-2 gap-2 odd:bg-gray-800 bg-gray-900 duration-300"
          style={{
            transform: `translateX(${deltaX}px)`,
            backgroundColor:
              //if the value of deltaX is below a certain amount, use the color of the swipe direction (red or purple), if i go over the limit, set the color to the bgColor(highlighted in purple when swiping left)
              deltaX && (deltaX >= 80 || deltaX <= -80)
                ? swipeColor
                : highlight,
          }}
        >
          <div className="flex flex-row">
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
              onClick={changeButtonAvailable}
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
              onClick={changeButtonReady}
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
                <div onClick={handleSwipeDeleteY}>
                  <GiConfirmed />
                </div>
                <span>{lang.swipeComponent.delete}</span>
                <span onClick={handleSwipeDeleteN}>
                  <GiCancel />
                </span>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            opacity: opacityRx,
            width: deltaRx,
            backgroundColor: "purple",
          }}
          className="flex items-center justify-center rounded-r-xl"
        >
          highlight
        </div>
      </div>
    </>
  );
}
