import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { HandleClickOutsideComponent } from "../../HandleClickOutsideComponent";
import { iEditingPropsPackage } from "../../Interface";
import { LangContext } from "../../AppComponent/LangContextProvider";

export default function EditButtonItem(props: {
  isAuthor: Function;
  handleEdit: Function;
  handleDelete: Function;
  handleRename: Function;
  editingPropsPackage:iEditingPropsPackage
}) {
  const { ref } = HandleClickOutsideComponent(props.editingPropsPackage.setIsEditing);
  const lang = useContext(LangContext);


  return (
    <>
      {props.isAuthor() && (
        <div
          //edit, rename, delete buttons, if the user is also the author
          className="flex justify-center items-center"
        >
          {!props.editingPropsPackage.isEditing && (
            <div
              className="flex flex-col items-center justify-center m-2 cursor-pointer text-white duration-300 select-none "
              onClick={(e) => props.handleEdit(e)}
            >
              <FaEdit size={20}/>
              <span className="-mt-1">{lang.editButtonItem.name}</span>
            </div>
          )}
          {props.editingPropsPackage.isEditing && (
            <div ref={ref}>
              <div className="flex flex-col justify-evenly items-center ">
                <div className="flex flex-col p-1 m-1 gap-1">
                  <div
                    className="mx-2 text-[0.8rem]  font-[homeworld-norm] cursor-pointer text-white hover:text-amber-500 duration-300 select-none"
                    onClick={() => {
                        props.editingPropsPackage.setIsDeleting(!props.editingPropsPackage.isDeleting);
                        props.editingPropsPackage.setIsRenaming(false);
                    }}
                  >
                    {lang.editButtonItem.delete}
                  </div>
                  <div
                    className="mx-2  text-[0.8rem]  font-[homeworld-norm]  cursor-pointer text-white hover:text-amber-500 duration-300 select-none"
                    onClick={() => {
                        props.editingPropsPackage.setIsRenaming(!props.editingPropsPackage.isRenaming);
                        props.editingPropsPackage.setIsDeleting(false);
                    }}
                  >
                    {lang.editButtonItem.rename}
                  </div>
                </div>
                {props.editingPropsPackage.isRenaming && (
                  <div
                  className="flex flex-row"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && props.editingPropsPackage.isRenaming) props.handleRename();
                    }}
                  >
                    <input
                      className="rounded-xl border-2 border-amber-500 mx-2 px-2 text-center w-[80%] text-black"
                      onChange={(e) => props.editingPropsPackage.setNewName(e.target.value)}
                      defaultValue={props.editingPropsPackage.defaultName}
                    />
                    <button onClick={()=>props.handleRename()}>ok</button>
                  </div>
                )}
                {props.editingPropsPackage.isDeleting && (
                  <div
                    className=" flex flex-col justify-center items-center  hover:bg-white rounded-xl  p-1 mx-2  text-sm cursor-pointer text-white hover:text-red-600 duration-300 select-none"
                    onClick={()=>props.handleDelete()}
                  >
                    <div className="text-center font-bold leading-none">{lang.editButtonItem.delete1}</div>

                    <div className="text-center leading-none text-[0.5rem]">
                    {lang.editButtonItem.delete2}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
