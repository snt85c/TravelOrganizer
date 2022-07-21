import flairImage from "./img/undraw_explore_re_8l4v.svg";
import flairImage2 from "./img/undraw_journey_re_ec5q.svg";
import flairImage3 from "./img/undraw_travelers_re_y25a.svg";
import TravelButtonItem from "./TravelButtons";

export default function PresentationPage(props: {
  travels: any;
  setTravel: React.Dispatch<React.SetStateAction<string>>;
}) {
  const travelButtonsList =
    props.travels &&
    props.travels[0].map((travel: string, i: number) => {
      return <TravelButtonItem key={i} data={travel} setTravel={props.setTravel}/>;
    });

  return (
    <div className="flex flex-col my-5 justify-between h-[80%]">
      <div className="flex my-5 justify-center items-center font-[homeworld-bold]">
        BACKPACK ORGANIZER
      </div>
      {/* <div className="flex flex-col w-[1/4] p-2">
        {props.travels && travelButtonsList}
      </div> */}
      <img
        src={flairImage3}
        style={{
          backgroundImage:
            "radial-gradient(ellipse, rgb(100 116 139), transparent 70%)",
        }}
        className="absolute h-[200px] bottom-10 right-10 "
      />
    </div>
  );
}
