import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iTravelData, iUser } from "../Interface";
export default function DeleteUserButton(props: {
  user: iTravelData;
  travelId: number;
  setUser: React.Dispatch<React.SetStateAction<iUser>>;
  handleDeleteUser: Function | undefined;
}) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleClick = () => {
    props.handleDeleteUser && props.handleDeleteUser(props.travelId);
    navigate("/");
  };

  return (
    <>
      <div
        className="flex flex-col justify-center items-center bg-red-700 rounded-xl m-5 mb-5 mt-0 drop-shadow-2xl select-none cursor-pointer duration-300 leading-none"
        style={{
          height: !isDeleting ? "35px" : "50px",
          justifyContent: isDeleting ? "space-evenly" : "center",
        }}
        onClick={() => setIsDeleting(!isDeleting)}
      >
        <div>DELETE</div>
        {isDeleting && (
          <div className="text-black font-bold" onClick={handleClick}>
            are you sure?
          </div>
        )}
      </div>
    </>
  );
}
