import { useContext, useEffect, useState } from "react";
import {
  FaTimesCircle,
  FaPlusCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { LangContext } from "../LangContextProvider";
import { useSwipeable, SwipeEventData } from "react-swipeable";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { iGear, iTravelData, iUser } from "../Interface";

export default function Item(props: {
  index: number;
  type: string;
  travelId: number;
  currentArray: iGear[];
  item: iGear;
  user: iTravelData;
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
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  const MAX_SWIPE_ALLOWED: number = 150;
  const MIN_SWIPE_ALLOWED: number = 10;
  const SWIPE_TRIGGER: number = 100;
  const SWIPE_CHANGE_COLOR: number = 50;
  const OPACITY_SPREAD: number = 100;
  let currentTravel: iUser = props.user[props.travelId];
  let currentGear: iGear[];

  switch (props.type) {
    case "headgear":
      currentGear = currentTravel.headgear;
      break;
    case "topgear":
      currentGear = currentTravel.topgear;
      break;
    case "bottomgear":
      currentGear = currentTravel.bottomgear;
      break;
    case "footgear":
      currentGear = currentTravel.footgear;
      break;
    case "extra":
      currentGear = currentTravel.extra;
      break;
  }

  const swipeActions = useSwipeable({
    onSwiping: (e: SwipeEventData) => {
      setIsSwiping(true);
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
      setIsSwiping(false);
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

  const changeHighlight = () => {
    let currentTravel: iUser | undefined = { ...props.user[props.travelId] };
    currentGear[props.index].highlighted =
      !props.currentArray[props.index].highlighted;
    const currentUser: any = { ...props.user, [props.travelId]: currentTravel };
    props.setUser && props.setUser(currentUser);
  };

  const setNameChange = () => {
    let currentTravel: iUser | undefined = { ...props.user[props.travelId] };
    currentGear[props.index].name = change
      ? change
      : currentGear[props.index].name;
    const currentUser: any = { ...props.user, [props.travelId]: currentTravel };
    props.setUser && props.setUser(currentUser);
    setIsEditName(!isEditName);
  };

  const handleDelete = () => {
    let currentTravel: iUser = { ...props.user[props.travelId] };
    currentGear.splice(props.index, 1);
    const currentUser: any = { ...props.user, [props.travelId]: currentTravel };
    props.setUser && props.setUser(currentUser);
  };

  // function ToggleButton() {
  const buttonToggle = () => {
    let currentTravel: iUser | undefined = { ...props.user[props.travelId] };
    // if (!isSwiping) {
    if (currentGear[props.index].status === "unavailable") {
      currentGear[props.index].status = "available";
    } else if (currentGear[props.index].status === "available") {
      currentGear[props.index].status = "ready";
    } else if (currentGear[props.index].status === "ready") {
      currentGear[props.index].status = "unavailable";
    }
    const currentUser: any = {
      ...props.user,
      [props.travelId]: currentTravel,
    };
    props.setUser && props.setUser(currentUser);
    // }
    // };
    return (
      <>
        <div
          onClick={buttonToggle}
          className="flex flex-col cursor-pointer select-none w-12"
        >
          {props.currentArray[props.index].status === "unavailable" && (
            <div className="flex justify-center items-center text-red-600">
              {" "}
              <FaExclamationCircle className="w-7 h-7" />
            </div>
          )}
          {props.currentArray[props.index].status === "available" && (
            <div className="flex justify-center items-center  text-amber-700">
              {" "}
              <FaExclamationCircle className="w-7 h-7" />
            </div>
          )}
          {props.currentArray[props.index].status === "ready" && (
            <div className="flex justify-center items-center  text-green-600">
              {" "}
              <FaCheckCircle className="w-7 h-7 " />
            </div>
          )}
          <div className="text-[0.7rem] select-none flex justify-center items-center">
            {props.currentArray[props.index].status}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className="flex rounded-l-md rounded-r-md"
        style={{
          backgroundColor:
            //main container
            deltaX &&
            (deltaX >= SWIPE_CHANGE_COLOR || deltaX <= -SWIPE_CHANGE_COLOR)
              ? swipeColor
              : props.currentArray[props.index].highlighted
              ? "rgb(245 158 11)"
              : "",
        }}
      >
        <div
          //delete div, , shirinks and grow on swipe
          style={{
            opacity: opacityLx,
            width: deltaLx,
            display: deltaLx ? "block" : "none",
            textAlign: "center",
          }}
          className="absolute z-10 left-2 flex py-3 duration-300"
        >
          {lang.swipeComponent.deleteLx}
        </div>
        <div
          //central div container for item name and rx buttons
          {...swipeActions}
          onDoubleClick={changeHighlight}
          className="flex flex-row shrink-0 w-full justify-between p-1 px-2 gap-2 odd:bg-gray-800 bg-gray-900 duration-300"
          style={{
            transform: `translateX(${deltaX}px)`,
            backgroundColor:
              deltaX &&
              (deltaX >= SWIPE_CHANGE_COLOR || deltaX <= -SWIPE_CHANGE_COLOR)
                ? swipeColor
                : props.currentArray[props.index].highlighted
                ? "rgb(245 158 11)"
                : "",
          }}
        >
          <div
            //item name div
            className="flex flex-row"
          >
            <div
              className="flex flex-col"
              onClick={() => setIsEditName(!isEditName)}
            >
              <div className="text-gray-600 text-[0.7rem] -my-1">
                {lang.itemComponent.name}:
              </div>
              <div className="text-white select-none cursor-pointer">
                {props.item?.name ? props.item?.name : "empty"}
              </div>
            </div>
          </div>
          <div
            /* right buttons container */
            className="flex flex-row items-center gap-1"
          >
            <div
              /* unavailable/available/ready toggle button DIV */
              onClick={buttonToggle}
              className="flex flex-col cursor-pointer select-none w-12"
            >
              {props.currentArray[props.index].status === "unavailable" && (
                <div className="flex justify-center items-center text-red-600">
                  {" "}
                  <FaExclamationCircle className="w-7 h-7" />
                </div>
              )}
              {props.currentArray[props.index].status === "available" && (
                <div className="flex justify-center items-center  text-amber-700">
                  {" "}
                  <FaExclamationCircle className="w-7 h-7" />
                </div>
              )}
              {props.currentArray[props.index].status === "ready" && (
                <div className="flex justify-center items-center  text-green-600">
                  {" "}
                  <FaCheckCircle className="w-7 h-7 " />
                </div>
              )}
              <div className="text-[0.7rem] select-none flex justify-center items-center">
                {props.currentArray[props.index].status}
              </div>
            </div>
            {props.setUser && (
              <div
                //remove button
                className="flex flex-col justify-center items-center"
              >
                <button onClick={handleDelete}>
                  <FaTimesCircle className="w-7 h-7 hidden md:block" />
                </button>
                <div className="text-[0.7rem] select-none hidden md:block">
                  remove
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          //highlight div, shirinks and grow on swipe
          style={{
            opacity: opacityRx,
            width: deltaRx + 120,
            display: deltaRx ? "block" : "none",
            textAlign: "center",
          }}
          className="absolute z-10 right-2 py-3 flex  duration-300"
        >
          {lang.swipeComponent.highlight}
        </div>
      </div>
      {isEditName && props.setUser && (
        // EDIT OVERLAY, appears absiolutely positioned
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
      {isDeleting && (
        <div
          //DELETE OVERLAY, appears absolutely positioned in the center of center div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row gap-4 justify-center items-center px-4 text-[0.8rem] bg-amber-500 border border-white rounded-md w-1/4"
        >
          <div onClick={handleSwipeDeleteY}>
            <GiConfirmed />
          </div>
          <span>{lang.swipeComponent.delete}</span>
          <span onClick={handleSwipeDeleteN}>
            <GiCancel />
          </span>
        </div>
      )}
    </>
  );
}
