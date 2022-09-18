import flairImage from "../img/undraw_travelers_re_y25a.svg";
import TravelButtonItem from "./travelButton/TravelButtonItem";
import CreateNewTravel from "./CreateNewTravel";
import {
  iTravel,
  iTravelButtonPropsPackage,
  iUsersStatePropsPackage,
} from "../Interface";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LangContext } from "../AppComponent/LangContextProvider";
export default function PresentationPage(props: {
  travelButtonPropsPackage: iTravelButtonPropsPackage;
  usersStatePropsPackage: iUsersStatePropsPackage;
}) {
  const [isRenderReady, setIsRenderReady] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<number | undefined>()
  const [isFetchingTakingTooLong, setIsFetchingTakingTooLong] =
    useState<boolean>(false);
  const lang = useContext(LangContext);
  const WAITING_TIME_ERROR_MESSAGE: number = 9000;

  const travelButtonsList = props.usersStatePropsPackage.data.travelList.map(
    (currentData?: iTravel, i?: number) => {
      return (
        <TravelButtonItem
          key={i}
          travelButtonPropsPackage={props.travelButtonPropsPackage}
          usersStatePropsPackage={props.usersStatePropsPackage}
          data={currentData}
          isClicked = {isClicked} setIsClicked={setIsClicked}
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
              <div className=" text-[2rem] animate-pulse font-[homeworld-norm]">
                {lang.presentationPage.loading}
              </div>
              {isFetchingTakingTooLong && (
                <div className="font-[helvetica] animation-none m-5 justify-center items-center text-center ">
                  {lang.presentationPage.fetchingDelayMessage}
                </div>
              )}
            </div>
          </>
        )}
        {isRenderReady && (
          //the components are loaded
          <>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex -mt-5 -mb-3 justify-center items-center font-[homeworld-norm] select-none">
                {lang.presentationPage.flairText1}
              </div>
              <div className="flex z-20 flex-col w-[1/4] p-2 ">
                <div>{travelButtonsList}</div>
              </div>
            </motion.div>
            <CreateNewTravel
              usersStatePropsPackage={props.usersStatePropsPackage}
            />
          </>
        )}

        <div
          //flair text
          className=" absolute z-0 bottom-7 left-2  font-[phonk] leading-none select-none"
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
          className="absolute z-0 h-[100px] hidden sm:flex md:h-[200px] bottom-10 right-5 md:right-10 "
        />
      </div>
    </>
  );
}