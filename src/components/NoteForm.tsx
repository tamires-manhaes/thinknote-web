import { MoveLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

export function FormNote({
  editMode,
  handleAction,
}: {
  editMode: boolean;
  handleAction: () => Promise<void>;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-start items-start p-4 mt-4 max-w-md mx-auto">
      <div className="mb-4 w-full flex flex-row justify-between items-center">
        <button
          className="btn btn-ghost btn-primary btn-sm"
          onClick={() => navigate("/")}
        >
          <MoveLeft className="mr-2 size-4 transition-all" />
          Back to notes
        </button>
        {editMode && (
          <button
            className="btn btn-outlin  btn-sm"
            onClick={() => navigate("/")}
          >
            <Trash2 className="bg-transparent text-red-400 size-4 mr-2" />
            Delete Note
          </button>
        )}
      </div>
      <div className="card w-full max-w-md">
        <form className="bg-primary-content  p-6 rounded-md">
          <h2 className="font-bold text-xl">Create a new Note</h2>
          <div>
            <label className="label font-semibold text-sm">Title</label>
            <input
              type="text"
              placeholder="Note title"
              className="input input-bordered w-full text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="label font-semibold">Description</label>
            <textarea
              className="textarea textarea-bordered w-full "
              placeholder="Bio"
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="btn btn-primary btn-wide" onClick={handleAction}>
              {editMode ? "Save changes" : "Create note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
