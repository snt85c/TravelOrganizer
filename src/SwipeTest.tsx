import { useEffect, useState } from "react";
import { useSwipeable, SwipeEventData } from "react-swipeable";
import { GiCancel, GiConfirmed } from "react-icons/gi";

export function TestSwipeDiv() {
  const [deltaX, setDeltaX] = useState<number>(0);


  const swipeTest = useSwipeable({
    onSwiping: (e:SwipeEventData) => {
      setDeltaX(e.deltaX);
      // console.log(deltaX)
    },
    onSwiped: () => {
      if (deltaX && (deltaX < 150 || deltaX > -150)) setDeltaX(0);
    },
  });
  return (
    <>
      <div
        {...swipeTest}
        className="flex flex-col m-1 justify-center items-center text-center text-white bg-amber-600 border border-amber-500 h-10 mx-3 duration-300"
        style={{
          transform: `translateX(${deltaX}px)`,
          backgroundColor:
            deltaX && (deltaX >= 150 || deltaX <= -150) ? "red" : "",
        }}
      >
        <div>{deltaX.toFixed(0)}</div>
        <div className="text-[0.8rem] -mt-2">swipe test 1</div>
      </div>
    </>
  );
}

export function TestSwipeDiv2() {
  /*
    -deltaX is the difference between the start point and the current point on the x axis
    -opacityLx keeps tracks of the opacity of the left element, same for opacityRx. 
    -messageRx is the value of the text in the div, which will change when the component is swipe over a certain amount
    -swipeColor is the color of the background when swiping. right turns the background red to indicate deletion when swipe ends, left makes it purple to indicate highlight. in case of right, it returns to default color, for left it will change to purple only after a certain amoutn of swiping, otherwise default color.  can be red or purple or undefined as default state.
     -highlight keeps only track of the bg color when i swipe all the way to highlight the component can be purple or undefined
    */
  const [deltaX, setDeltaX] = useState<number>(0);
  const [opacityLx, setOpacityLx] = useState<number>(0);
  const [opacityRx, setOpacityRx] = useState<number>(0);
  const [messageRx, setMessageRx] = useState<string>("highlight");
  const [swipeColor, setSwipeColor] = useState<"red" | "purple" | "">("");
  const [highlight, setHighlight] = useState<"purple" | "" | "red">("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(()=>{console.log(isDeleting)},[isDeleting])

  const swipeTest = useSwipeable({
    onSwiping: (e:SwipeEventData) => {
      //sets a limit to how much the component can be moved on screen on x axis, as it stops setting the state after a certain amount, keeping it at 200/-200 while swiping
      if (Math.abs(e.deltaX) < 200) {
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
      if (deltaX && deltaX < -150) {
        //if i detect a swipe left more than 150, set the bg color to purple/remove the color and change the message
        highlight === "" ? setHighlight("purple") : setHighlight("");
        messageRx === "highlight"
          ? setMessageRx("remove highlight")
          : setMessageRx("highlight");
        setIsDeleting(false);
        setIsDeleted(false);
      }
      if (deltaX && deltaX > 150) {
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

  return (
    <>
      <div
        {...swipeTest}
        className="flex m-1 px-2 justify-between items-center text-center text-white border rounded border-amber-500 h-10 mx-3 duration-300"
        style={{
          transform: `translateX(${deltaX}px)`,
          backgroundColor:
            //if the value of deltaX is below a certain amount, use the color of the swipe direction (red or purple), if i go over the limit, set the color to the bgColor(highlighted in purple when swiping left)
            deltaX && (deltaX >= 150 || deltaX <= -150)
              ? swipeColor
              : highlight,
        }}
      >
        {/* one div on the left with delete, one centered with absolute values so that it wont change position when the right message changes, and a left div with a custom message */}
        <div style={{ opacity: opacityLx }}>delete</div>
        <div className="absolute left-[50%] right-[50%] top-auto flex flex-col justify-center items-center ">
          {!isDeleting && (
            <div className="flex flex-col justify-center items-center text-[0.8rem] w-1/2">
              {isDeleted ? "DELETED" : "swipe test 2"}
            </div>
          )}
          {isDeleting && (
            <div className="absolute left-[50%] right-[50%] top-auto flex flex-row gap-4 justify-center items-center text-[0.8rem] w-1/2">
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
        <div style={{ opacity: opacityRx }}>{messageRx}</div>
      </div>
    </>
  );
}
