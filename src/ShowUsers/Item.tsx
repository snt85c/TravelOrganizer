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
  const [swipeColor, setSwipeColor] = useState<"red" | "rgb(245 158 11)" | "">(
    ""
  );
  const [highlight, setHighlight] = useState<"rgb(245 158 11)" | "" | "red">(
    ""
  );
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const MAX_SWIPE_ALLOWED: number = 150;
  const MIN_SWIPE_ALLOWED: number = 10;
  const SWIPE_TRIGGER: number = 100;
  const SWIPE_CHANGE_COLOR: number = 50;
  const OPACITY_SPREAD: number = 100;

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
      if (
        Math.abs(e.deltaX) < MAX_SWIPE_ALLOWED &&
        Math.abs(e.deltaX) > MIN_SWIPE_ALLOWED &&
        props.setUser
      ) {
        //we restrict the max amount of the swipe, and we allow to set the delta state only if setUser has been passed, meaning that we are in a logged user component and we can perform operations on it. without setting deltaX, other swipe functions wont start
        setDeltaX(e.deltaX);
      }
      if (e.dir === "Right") {
        setDeltaLx(deltaX);
        setOpacityLx(deltaX / OPACITY_SPREAD);
        setSwipeColor("red");
      } else {
        setDeltaRx(Math.abs(deltaX));
        setOpacityRx(Math.abs(deltaX) / OPACITY_SPREAD);
        setSwipeColor("rgb(245 158 11)");
      }
    },
    onSwiped: (e: SwipeEventData) => {
      if (deltaX && deltaX < -SWIPE_TRIGGER) {
        changeHighlight();
        highlight === "" ? setHighlight("rgb(245 158 11)") : setHighlight("");
        messageRx === "highlight"
          ? setMessageRx("remove highlight")
          : setMessageRx("highlight");
        setIsDeleting(false);
      }
      if (deltaX > SWIPE_TRIGGER) {
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

  const changeHighlight = () => {
    let temp: iUser | undefined = props.user;
    temp = { ...props.user };
    currentArray[props.index].highlighted =
      !props.currentArray[props.index].highlighted;
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
    currentArray[props.index].name = change
      ? change
      : currentArray[props.index].name;
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
      {isEditName && props.setUser && (
        // edit overlay
        <>
          <div className="absolute top-auto left-auto z-50 flex m-4 p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700">
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
      <div className="flex rounded-l-md rounded-r-md" style={{ backgroundColor:
              //if the value of deltaX is below a certain amount, use the color of the swipe direction (red or purple), if i go over the limit, set the color to the bgColor(highlighted in purple when swiping left)
              deltaX &&
              (deltaX >= SWIPE_CHANGE_COLOR || deltaX <= -SWIPE_CHANGE_COLOR)
                ? swipeColor
                : props.currentArray[props.index].highlighted
                ? "rgb(245 158 11)"
                : "",}}>
        <div
          //delete div
          style={{
            opacity: opacityLx,
            width: deltaLx,
            // backgroundColor: "red",
            display: deltaLx ? "block" : "none",
            textAlign:"right"
          }}
          className="absolute z-10 left-2 flex py-2 items-center justify-center  duration-300"
        >
          {lang.swipeComponent.deleteLx}
        </div>
        <div
          //main div
          {...swipeActions}
          className="flex flex-row shrink-0 w-full justify-between p-1 px-2 gap-2 odd:bg-gray-800 bg-gray-900 duration-300"
          style={{
            transform: `translateX(${deltaX}px)`,
            backgroundColor:
              //if the value of deltaX is below a certain amount, use the color of the swipe direction (red or purple), if i go over the limit, set the color to the bgColor(highlighted in purple when swiping left)
              deltaX &&
              (deltaX >= SWIPE_CHANGE_COLOR || deltaX <= -SWIPE_CHANGE_COLOR)
                ? swipeColor
                : props.currentArray[props.index].highlighted
                ? "rgb(245 158 11)"
                : "",
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
          </div>

          <div
            /* right buttons overlay */ className="flex flex-row items-center gap-1"
          >
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
          </div>
          {isDeleting && (
            //DELETE OVERLAY
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row gap-4 justify-center items-center px-4 text-[0.8rem] bg-amber-500 border border-white rounded-md w-1/4">
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
        <div
          //highlight div
          style={{
            opacity: opacityRx,
            width: deltaRx,
            // backgroundColor: "rgb(245 158 11 )",
            display: deltaRx ? "block" : "none",
          }}
          className="absolute z-10 right-2 py-2 flex items-center justify-center duration-300"
        >
          {lang.swipeComponent.highlight}
        </div>
      </div>
    </>
  );
}
