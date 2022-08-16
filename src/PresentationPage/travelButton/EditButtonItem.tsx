import { HandleClickOutsideComponent } from "../../HandleClickOutsideComponent";
import { iEditingPackage } from "../../Interface";

export default function EditButtonItem(props: {
  isAuthor: Function;
  handleEdit: Function;
  handleDelete: Function;
  handleRename: Function;
  editingPackage:iEditingPackage
}) {
  const { ref } = HandleClickOutsideComponent(props.editingPackage.setIsEditing);

  return (
    <>
      {props.isAuthor() && (
        <div
          //edit, rename, delete buttons, if the user is also the author
          className="flex justify-center items w-1/3"
        >
          {!props.editingPackage.isEditing && (
            <div
              className="text-[0.8rem] font-[homeworld-norm] cursor-pointer text-amber-500 duration-300 select-none "
              onClick={(e) => props.handleEdit(e)}
            >
              MODIFY
            </div>
          )}
          {props.editingPackage.isEditing && (
            <div ref={ref}>
              <div className="flex flex-col justify-evenly items-center ">
                <div className="flex flex-col p-1 m-1 gap-1">
                  <div
                    className="mx-2 text-[0.7rem]  font-[homeworld-norm] cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
                    onClick={() => {
                        props.editingPackage.setIsDeleting(!props.editingPackage.isDeleting);
                        props.editingPackage.setIsRenaming(false);
                    }}
                  >
                    DELETE
                  </div>
                  <div
                    className="mx-2  text-[0.7rem]  font-[homeworld-norm]  cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
                    onClick={() => {
                        props.editingPackage.setIsRenaming(!props.editingPackage.isRenaming);
                        props.editingPackage.setIsDeleting(false);
                    }}
                  >
                    RENAME
                  </div>
                </div>
                {props.editingPackage.isRenaming && (
                  <div
                  className="flex flex-row"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && props.editingPackage.isRenaming) props.handleRename();
                    }}
                  >
                    <input
                      className="rounded-xl border-2 border-amber-500 mx-2 px-2 text-center w-[80%] text-black"
                      onChange={(e) => props.editingPackage.setNewName(e.target.value)}
                      defaultValue={props.editingPackage.defaultName}
                    />
                    <button onClick={()=>props.handleRename()}>ok</button>
                  </div>
                )}
                {props.editingPackage.isDeleting && (
                  <div
                    className=" flex flex-col justify-center items-center mx-2  text-sm cursor-pointer text-gray-800 hover:text-red-600 duration-300 select-none"
                    onClick={()=>props.handleDelete()}
                  >
                    <div className="text-center font-bold">press to delete</div>
                    <div className="text-center leading-none text-[0.5rem]">
                      this will cancel your data permanently
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
