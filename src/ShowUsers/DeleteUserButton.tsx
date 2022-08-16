import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iTravelData, iUser } from "../Interface";
import { HandleClickOutsideComponent } from "../HandleClickOutsideComponent";
export default function DeleteUserButton(props: {
  user: iTravelData;
  travelId: number;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
  handleDeleteUser: Function | undefined;
}) {
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { ref } = HandleClickOutsideComponent(setIsDeleting);

  const handleClick = () => {
    props.handleDeleteUser && props.handleDeleteUser(props.travelId);
    navigate("/");
  };

  return (
    <>
      <div
        className="flex flex-col justify-center items-center bg-red-700 rounded-xl m-5 mt-0 drop-shadow-2xl select-none cursor-pointer duration-300 leading-none sm:mr-[7rem] font-[homeworld-bold]"
        style={{
          height: !isDeleting ? "35px" : "55px",
          justifyContent: isDeleting ? "space-evenly" : "center",
        }}
        onClick={() => setIsDeleting(!isDeleting)}
      >
        <div>DELETE</div>
        {isDeleting && (
          <div ref={ref} className=" font-bold font-[helvetica]" onClick={handleClick}>
            are you sure?
          </div>
        )}
      </div>
    </>
  );
}
