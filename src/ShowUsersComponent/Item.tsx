import { useContext, useState } from "react";
import {
  FaTimesCircle,
  FaPlusCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { LangContext } from "../AppComponent/LangContextProvider";
import { useSwipeable, SwipeEventData } from "react-swipeable";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { iGear, iReducerAction, iTravelData, iUser } from "../Interface";
import { HandleClickOutsideComponent } from "../HandleClickOutsideComponent";
export default function Item(props: {
  index: number;
  type: string;
  travelId: number;
  currentArray: iGear[];
  item: iGear;
  user: iTravelData;
  // setUser?: React.Dispatch<React.SetStateAction<iUser>> | undefined;
  dispatch?: React.Dispatch<iReducerAction>;
}) {
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { ref } = HandleClickOutsideComponent(setIsEditName);

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
      if (
        Math.abs(e.deltaX) < MAX_SWIPE_ALLOWED &&
        Math.abs(e.deltaX) > MIN_SWIPE_ALLOWED &&
        props.dispatch
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

  const changeHighlight = () => {
    let currentTravel: iUser | undefined = { ...props.user[props.travelId] };
    currentGear[props.index].highlighted =
      !props.currentArray[props.index].highlighted;
    const currentUser: any = { ...props.user, [props.travelId]: currentTravel };
    // props.setUser && props.setUser(currentUser);
    props.dispatch &&
      props.dispatch({ type: "MODIFY-USER", payload: currentUser });
  };

  const setNameChange = () => {
    if (props.dispatch) {
      let currentTravel: iUser | undefined = { ...props.user[props.travelId] };
      currentGear[props.index].name = change
        ? change
        : currentGear[props.index].name;
      const currentUser: any = {
        ...props.user,
        [props.travelId]: currentTravel,
      };
      // props.setUser && props.setUser(currentUser);
      props.dispatch &&
        props.dispatch({ type: "MODIFY-USER", payload: currentUser });
      setIsEditName(!isEditName);
    }
  };

  const handleDelete = () => {
    let currentTravel: iUser = { ...props.user[props.travelId] };
    currentGear.splice(props.index, 1);
    const currentUser: any = { ...props.user, [props.travelId]: currentTravel };
    // props.setUser && props.setUser(currentUser);
    props.dispatch && props.dispatch({type:"MODIFY-USER", payload:currentUser})

  };

  const buttonToggle = () => {
    let currentTravel: iUser | undefined = { ...props.user[props.travelId] };
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
    // props.setUser && props.setUser(currentUser);
    props.dispatch && props.dispatch({type:"MODIFY-USER", payload:currentUser})

  };

  return (
    <div>
      {!isEditName && (
        <div
          className="flex justify-center items-center text-center rounded-l-md rounded-r-md "
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
            //lx delete div , shirinks and grow on swipe
            style={{
              opacity: opacityLx,
              width: deltaLx,
              display: deltaLx ? "block" : "none",
              textAlign: "center",
            }}
            className="absolute z-10 left-2 flex  duration-300 text-[0.8rem] font-[homeworld-bold]"
          >
            {lang.swipeComponent.deleteLx.toUpperCase()}
          </div>
          <div
            //central div container for item name and rx buttons
            {...swipeActions}
            onDoubleClick={changeHighlight}
            className="flex flex-row relative shrink-0 w-full justify-between p-1 px-2 gap-2 odd:bg-gray-800 bg-gray-900 duration-300"
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
            {isDeleting && (
              <div
                //DELETE OVERLAY, appears absolutely positioned in the center of center div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row gap-4 justify-center items-center px-4 text-[0.8rem] bg-amber-500 border text-black border-white rounded-md w-1/3"
              >
                <div className="cursor-pointer" onClick={handleSwipeDeleteY}>
                  <GiConfirmed />
                </div>
                <span>{lang.swipeComponent.delete}</span>
                <span className="cursor-pointer" onClick={handleSwipeDeleteN}>
                  <GiCancel />
                </span>
              </div>
            )}
            <div
              //item name div
              className="flex flex-row w-full justify-between items-center "
            >
              <div
                className="flex flex-col"
                onClick={() => {
                  if (props.dispatch) setIsEditName(!isEditName);
                }}
              >
                <div className="text-gray-600 text-[0.7rem] -my-1 flex justify-start select-none">
                  {lang.itemComponent.name}:
                </div>
                <div className="text-white select-none cursor-pointer flex justify-start">
                  {props.item?.name ? props.item?.name : "empty"}
                </div>
              </div>
              <div
                /* right buttons container */
                className="flex flex-row items-center gap-2"
              >
                <div
                  /* unavailable/available/ready toggle button DIV */
                  onClick={buttonToggle}
                  className="flex flex-col cursor-pointer select-none w-12"
                >
                  {props.currentArray[props.index].status === "unavailable" && (
                    <div className="flex flex-col justify-center items-center text-red-600">
                      {" "}
                      <FaExclamationCircle className="w-7 h-7" />
                      <div className="text-[0.7rem] select-none flex justify-center items-center">
                        {lang.itemListArrayComponent.unavailable}
                      </div>
                    </div>
                  )}
                  {props.currentArray[props.index].status === "available" && (
                    <div className="flex flex-col justify-center items-center  text-amber-700">
                      {" "}
                      <FaExclamationCircle className="w-7 h-7" />
                      <div className="text-[0.7rem] select-none flex justify-center items-center">
                        {lang.itemListArrayComponent.available}
                      </div>
                    </div>
                  )}
                  {props.currentArray[props.index].status === "ready" && (
                    <div className="flex flex-col justify-center items-center  text-green-600">
                      {" "}
                      <FaCheckCircle className="w-7 h-7 " />
                      <div className="text-[0.7rem] select-none flex justify-center items-center">
                        {lang.itemListArrayComponent.ready}
                      </div>
                    </div>
                  )}
                  {/* <div className="text-[0.7rem] select-none flex justify-center items-center">
                    {props.currentArray[props.index].status}
                  </div> */}
                </div>
                {props.dispatch && (
                  <div
                    //rx remove button when breakpoint md
                    className="flex flex-col justify-center items-center"
                  >
                    <button onClick={handleDelete}>
                      <FaTimesCircle className="w-7 h-7 hidden md:block" />
                    </button>
                    <div className="text-[0.7rem] select-none hidden md:block">
                      {lang.itemComponent.remove}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            //highlight div, shirinks and grow on swipe
            style={{
              opacity: opacityRx,
              width: deltaRx + MAX_SWIPE_ALLOWED + 25,
              display: deltaRx ? "block" : "none",
              textAlign: "center",
            }}
            className="absolute flex  z-10 right-2 py-3  duration-300 text-[0.8rem] font-[homeworld-bold]"
          >
            {lang.swipeComponent.highlight.toUpperCase()}
          </div>
        </div>
      )}
      {isEditName && props.dispatch && (
        // EDIT appears in place of the normal div
        <div
          ref={ref}
          className=" flex justify-between p-1 px-2 bg-gradient-to-r from-amber-500 to-amber-700 duration-300" //bg-gradient-to-r from-amber-500 to-amber-700
        >
          <div className="flex flex-col">
            <div className="text-[0.7rem] flex justify-left text-black">
              {lang.itemComponent.modify}:
            </div>
            <input
              className="text-white rounded-xl px-2 bg-gray-600"
              defaultValue={props.item.name}
              onChange={(e) => setChange(e.target.value)}
            />
          </div>
          <div className="flex px-2 md:px-0 gap-2">
            {/* <button onClick={() => setIsEditName(!isEditName)}>
              <FaTimesCircle />
            </button> */}
            <div className="flex flex-col justify-center items-center">
              <button onClick={setNameChange}>
                <FaPlusCircle className="w-7 h-7" />
              </button>
              <div className="text-[0.7rem]"> {lang.itemComponent.confirm}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
