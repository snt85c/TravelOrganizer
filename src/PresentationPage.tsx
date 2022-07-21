import flairImage from "./img/undraw_explore_re_8l4v.svg";
import flairImage2 from "./img/undraw_journey_re_ec5q.svg";
import flairImage3 from "./img/undraw_travelers_re_y25a.svg";

export default function PresentationPage() {
  return (
    <div className="flex flex-col justify-between h-[80%]">
      <div className="flex justify-center items-center">travel organizer</div>
      <img
        src={flairImage}
        style={{
          backgroundImage: "radial-gradient(ellipse, rgb(100 116 139), transparent 70%)",
        }}
        className="absolute h-[200px] bottom-10 right-10 "
      />
    </div>
  );
}
