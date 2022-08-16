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
          className="flex justify-start items"
        >
          {!props.editingPackage.isEditing && (
            <div
              className="text-[0.7rem] font-[homeworld-norm] cursor-pointer text-amber-500 duration-300 select-none "
              onClick={(e) => props.handleEdit(e)}
            >
              MODIFY
            </div>
          )}
          {props.editingPackage.isEditing && (
            <div ref={ref}>
              <div className="flex flex-col justify-evenly items-center">
                <div className="flex flex-row p-1 m-1">
                  <div
                    className="mx-2 text-[0.7rem] p-2 font-[homeworld-norm] cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
                    onClick={() => {
                        props.editingPackage.setIsDeleting(!props.editingPackage.isDeleting);
                        props.editingPackage.setIsRenaming(false);
                    }}
                  >
                    DELETE
                  </div>
                  <div
                    className="mx-2  text-[0.7rem] p-2 font-[homeworld-norm]  cursor-pointer text-gray-800 hover:text-amber-500 duration-300 select-none"
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
                    className=" flex flex-col justify-center items-center mx-2  text-sm cursor-pointer text-gray-800 hover:text-red-600 duration-300 hover:font-bold select-none"
                    onClick={()=>props.handleDelete()}
                  >
                    <div>press to delete</div>
                    <div className="text-[0.5rem] -mt-2">
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
