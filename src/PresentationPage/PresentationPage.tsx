import flairImage from "../img/undraw_travelers_re_y25a.svg";
import TravelButtonItem from "./travelButton/TravelButtonItem";
import CreateNewTravel from "./CreateNewTravel";
import { iTravel, iTravelData, iTriggers, iUserInfo } from "../Interface";
import { useEffect, useState } from "react";

export default function PresentationPage(props: {
  uiTriggers: iTriggers;
  user: iUserInfo;
  usersList: iTravelData[];
  loggedUser: any;
  travelList: [iTravel?];
  setTravel: React.Dispatch<React.SetStateAction<iTravel>>;
  setTravelList: React.Dispatch<React.SetStateAction<[iTravel?]>>;
  watchTravel: Function;
  joinTravel: Function;
}) {
  const [isRenderReady, setIsRenderReady] = useState<boolean>(false);
  const [isFetchingTakingTooLong, setIsFetchingTakingTooLong] =
    useState<boolean>(false);
  const WAITING_TIME_ERROR_MESSAGE: number = 5000;

  const travelButtonsList = props.travelList.map(
    (currentData?: iTravel, i?: number) => {
      return (
        <TravelButtonItem
          key={i}
          uiTriggers={props.uiTriggers}
          loggedUser={props.loggedUser}
          data={currentData}
          travelList={props.travelList}
          setTravel={props.setTravel}
          setTravelList={props.setTravelList}
        />
      );
    }
  );

  useEffect(() => {
    //check if the travelButtonList item is ready. change the state accordingly and approve the render of either the loading message or the webpage
    travelButtonsList.length > 0
      ? setIsRenderReady(true)
      : setIsRenderReady(false);
  }, [travelButtonsList]);

  useEffect(() => {
    //set the state to true if it reaches the waiting time
    setInterval(() => {
      setIsFetchingTakingTooLong(true);
    }, WAITING_TIME_ERROR_MESSAGE);
  }, []);

  return (
    <>
      <div className="flex flex-col my-5 justify-between h-[80%]">
        {!isRenderReady && (
          //if we are loading, and if it*s taking too long, show this
          <>
            <div className="flex flex-col justify-center items-center min-h-[50vh]">
              <div className=" text-[1.2rem] animate-pulse font-[homeworld-norm]">
                LOADING
              </div>
              {isFetchingTakingTooLong && (
                <div className="font-[helvetica] animation-none m-5 justify-center items-center text-center ">
                  the website is taking too long: consider refresing the page,
                  check your internet connection or try later
                </div>
              )}
            </div>
          </>
        )}
        {isRenderReady && (
          //the components are loaded
          <>
            <div className="flex justify-center items-center font-[homeworld-norm] select-none">
              AVAILABLE TRAVELS
            </div>
            <div className="flex z-20 flex-col w-[1/4] p-2 ">
              <div>{travelButtonsList}</div>
              <CreateNewTravel
                loggedUser={props.loggedUser}
                user={props.user}
                travelList={props.travelList}
                setTravelList={props.setTravelList}
              />
            </div>
          </>
        )}

        <div
          //flair text
          className=" absolute z-10 bottom-7 left-2  font-[phonk] leading-none select-none"
        >
          <div className="flex text-[20vw] sm:text-[8rem]">Travel</div>
          <div className="text-[10vw] sm:text-[4rem] -mt-[3vh]">
            organizer
            <span className="text-[3vw] sm:text-[1rem] -mt-[3vh]">by Snt</span>
          </div>
        </div>
        <img
          //flair image
          src={flairImage}
          style={{
            backgroundImage:
              "radial-gradient(ellipse, rgb(100 116 139), transparent 70%)",
          }}
          className="absolute h-[100px] hidden sm:flex md:h-[200px] bottom-10 right-5 md:right-10 "
        />
      </div>
    </>
  );
}
